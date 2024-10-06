import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-[400px]">
        <CardContent className="flex w-full flex-col items-center p-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <Check className="size-8 text-green-500" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold">
            This event is scheduled
          </h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            We emailed you a calendar invitation with all the details and the
            video call link!
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/">Close this page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessPage;
