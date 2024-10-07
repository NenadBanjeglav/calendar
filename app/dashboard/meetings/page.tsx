import { CancelMeetingAction } from "@/app/actions";
import EmptyState from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hook";
import { nylas } from "@/app/lib/nylas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";
import React from "react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return data;
}

const MeetingsPage = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming events which were booked with you and see event type
              link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form key={item.id} action={CancelMeetingAction}>
                {/* @ts-ignore */}
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 items-center justify-between">
                  <div className="mb-5">
                    <p className="text-sm text-muted-foreground">
                      {/* @ts-ignore */}
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {/* @ts-ignore */}
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")}-
                      {/* @ts-ignore */}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="mt-1 flex items-center">
                      <Video className="mr-2 size-4 text-primary" />
                      <a
                        className="text-xs text-primary underline underline-offset-4"
                        // @ts-ignore
                        href={item.conferencing.details.url}
                        target="_blank"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p>You and {item.participants[0].name}</p>
                  </div>
                  <SubmitButton
                    text="Cancel Event"
                    variant="destructive"
                    className="ml-auto flex w-fit"
                  />
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MeetingsPage;
