/* eslint-disable @next/next/no-img-element */

import RenderCalendar from "@/app/components/bookingForm/RenderCalendar";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      user: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

const BookingFormPage = async ({
  params,
  searchParams,
}: {
  params: { username: string; eventUrl: string };
  searchParams: { date?: string };
}) => {
  const data = await getData(params.eventUrl, params.username);
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();

  const formatedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-[1000px]">
        <CardContent className="gap-4 p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
          <div>
            <img
              src={data.user?.image as string}
              alt="Profile Image of user"
              className="size-10 rounded-full"
            />
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {data.user?.name}
            </p>
            <h1 className="mt-2 text-xl font-semibold">{data.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">
              {data.description}
            </p>

            <div className="mt-5 flex flex-col gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="mr-2 size-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {formatedDate}
                </span>
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 size-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.duration} Minutes
                </span>
              </p>
              <p className="flex items-center">
                <VideoIcon className="mr-2 size-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.videoCallSoftware}
                </span>
              </p>
            </div>
          </div>

          <Separator orientation="vertical" className="h-full w-px" />

          <RenderCalendar availability={data.user?.availability as any} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingFormPage;
