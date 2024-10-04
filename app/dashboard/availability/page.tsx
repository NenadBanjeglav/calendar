import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const AvailabilityPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          In this section you can manage your availability
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent></CardContent>
      </form>
    </Card>
  );
};

export default AvailabilityPage;
