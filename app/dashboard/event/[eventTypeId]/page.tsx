import EditEventTypeForm from "@/app/components/EditEventTypeForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      videoCallSoftware: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

const EditPage = async ({ params }: { params: { eventTypeId: string } }) => {
  const data = await getData(params.eventTypeId);
  return (
    <EditEventTypeForm
      callProvider={data.videoCallSoftware}
      description={data.description}
      duration={data.duration}
      id={data.id}
      title={data.title}
      url={data.url}
    />
  );
};

export default EditPage;
