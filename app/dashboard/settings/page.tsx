import SettingsForm from "@/app/components/SettingsForm";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hook";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

const SettingsPage = async () => {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return (
    <div>
      <SettingsForm
        email={data.email}
        fullName={data.name as string}
        profileImage={data.image as string}
      />
    </div>
  );
};

export default SettingsPage;
