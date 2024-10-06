"use client";

import { Switch } from "@/components/ui/switch";
import React, { useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { UpdateEventTypeStatusAction } from "../actions";
import { toast } from "sonner";

const EventTypeSwitch = ({
  initialChecked,
  eventTypeId,
}: {
  initialChecked: boolean;
  eventTypeId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useFormState(UpdateEventTypeStatusAction, undefined);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      disabled={isPending}
      defaultChecked={initialChecked}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            eventTypeId,
            isChecked,
          });
        });
      }}
    />
  );
};

export default EventTypeSwitch;
