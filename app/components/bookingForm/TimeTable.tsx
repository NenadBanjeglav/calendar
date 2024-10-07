import React from "react";
import {
  addMinutes,
  format,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import prisma from "@/app/lib/db";
import { Prisma } from "@prisma/client";
import { nylas } from "@/app/lib/nylas";
import { GetFreeBusyResponse, NylasResponse } from "nylas";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getData(userName: string, selectedDate: Date) {
  const currentDay = format(selectedDate, "EEEE");
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      User: {
        userName,
      },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      User: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });

  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.User?.grantId as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.User?.grantEmail as string],
    },
  });

  return { data, nylasCalendarData };
}

interface TimeTableProps {
  selectedDate: Date;
  userName: string;
  duration: number;
}

function calculateAvailableTimeSlots(
  date: string,
  dbAvailability: {
    fromTime: string | undefined;
    tillTime: string | undefined;
  },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  duration: number
) {
  const now = new Date();
  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  const availableTill = parse(
    `${date} ${dbAvailability.tillTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  // @ts-ignore
  const busySlots = nylasData.data[0].timeSlots.map((slot) => ({
    start: fromUnixTime(slot.startTime),
    end: fromUnixTime(slot.endTime),
  }));

  const allSlots = [];
  let currentSLot = availableFrom;
  while (isBefore(currentSLot, availableTill)) {
    allSlots.push(currentSLot);
    currentSLot = addMinutes(currentSLot, duration);
  }

  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);

    return (
      isAfter(slot, now) &&
      !busySlots.some(
        (busy: { start: any; end: any }) =>
          (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
          (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) ||
          (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
      )
    );
  });

  return freeSlots.map((slot) => format(slot, "HH:mm"));
}

const TimeTable = async ({
  selectedDate,
  userName,
  duration,
}: TimeTableProps) => {
  const { data, nylasCalendarData } = await getData(userName, selectedDate);

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const dbAvailability = {
    fromTime: data?.fromTime,
    tillTime: data?.tillTime,
  };

  const availableSlot = calculateAvailableTimeSlots(
    formattedDate,
    dbAvailability,
    nylasCalendarData,
    duration
  );

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
      <div className="mt-3 max-h-[350px] overflow-y-auto">
        {availableSlot.length > 0 ? (
          availableSlot.map((slot, i) => (
            <Link
              key={i}
              href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
            >
              <Button className="mb-2 w-full" variant="outline">
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>no time slots available</p>
        )}
      </div>
    </div>
  );
};
export default TimeTable;
