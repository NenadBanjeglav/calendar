import React from "react";
import prisma from "../lib/db";
import { notFound } from "next/navigation";
import { requireUser } from "../lib/hook";
import EmptyState from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ExternalLink,
  Link2,
  Pen,
  Settings,
  Trash,
  Users2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <>
          <div className="flex items-center justify-between px-2">
            <div className="hidden gap-y-1 sm:grid">
              <h1 className="text-3xl font-semibold md:text-4xl">
                Event Types
              </h1>
              <p className="text-muted-foreground">
                Create and manage your event types right here
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/new">Create New Event</Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.eventType.map((el) => (
              <div
                className="relative overflow-hidden rounded-lg border shadow"
                key={el.id}
              >
                <div className="absolute right-2 top-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.userName}/${el.url}`}>
                            <ExternalLink className="mr-2 size-4" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link2 className="mr-2 size-4" />
                          Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pen className="mr-2 size-4" /> Edit
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href="/" className="flex items-center p-5">
                  <div className="shrink-0">
                    <Users2 className="size-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {el.duration} Minutes Meeting
                      </dt>
                      <dd className="text-lg font-medium">{el.title}</dd>
                    </dl>
                  </div>
                </Link>
                <div className="flex items-center justify-between bg-muted px-5 py-3">
                  <Switch />
                  <Button>Edit Event</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default DashboardPage;
