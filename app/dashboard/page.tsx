import React from "react";
import prisma from "../lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../lib/hook";
import EmptyState from "../components/EmptyState";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

const DashboardPage = async () => {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button bellow"
          buttonText="Add Event Type"
          href="/dashboard/new"
        />
      ) : (
        <p>we have event types</p>
      )}
    </>
  );
};

export default DashboardPage;
