"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import GoogleLogo from "@/public/google.svg";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import GitHubLogo from "@/public/github.svg";

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GoogleLogo} alt="Google Logo" className="mr-2 size-4" />
          Sign in with Google
        </Button>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GitHubLogo} alt="GitHub Logo" className="mr-2 size-4" />
          Sign in with GitHub
        </Button>
      )}
    </>
  );
}
