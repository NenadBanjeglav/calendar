import React from "react";
import { requireUser } from "../lib/hook";

const DashboardPage = async () => {
  const session = await requireUser();
  return (
    <div>
      <h1>Hello from the dashboard</h1>
    </div>
  );
};

export default DashboardPage;
