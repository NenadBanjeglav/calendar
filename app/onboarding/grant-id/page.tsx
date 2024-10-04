import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import VideoGif from "@/public/work-is-almost-over-happy.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";

const OnboardingRouteTwo = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>You are almost Done!</CardTitle>
          <CardDescription>
            We have to now connect your calendar to your account.
          </CardDescription>
          <Image
            src={VideoGif}
            alt="Almost finished gif"
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="mr-2 size-4" />
              Connect Calendar to your Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingRouteTwo;
