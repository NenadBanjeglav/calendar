/* eslint-disable @next/next/no-img-element */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "@/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface settingsFormProps {
  fullName: string;
  email: string;
  profileImage: string;
}

const SettingsForm = ({ fullName, email, profileImage }: settingsFormProps) => {
  const [lastResult, action] = useFormState(SettingsAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings!</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              placeholder="John Doe"
              defaultValue={fullName}
              name={fields.fullName.name}
              key={fields.fullName.key}
            />
            <p className="text-sm text-red-500">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input placeholder="test@test.com" defaultValue={email} disabled />
          </div>

          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            <Input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className="relative size-16">
                <img
                  src={currentProfileImage}
                  alt="Profile Image"
                  className="size-16 rounded-lg"
                />
                <Button
                  className="absolute -top-3 left-10"
                  variant="destructive"
                  onClick={handleDeleteImage}
                  type="button"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success("Profile Image has been uploaded");
                }}
                onUploadError={(error) => {
                  console.log("Something went wrong!", error);
                  toast.success(error.message);
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-sm text-red-500">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
