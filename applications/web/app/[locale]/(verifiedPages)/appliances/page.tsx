"use client";

import AppliancesClient from "../../../../src/components/Dashboard/Appliances/AppliancesClient";
import { UserAppliancesProvider } from "@/src/context/userAppliances";

export default function AppliancesPage() {
  return (
    <UserAppliancesProvider>
      <AppliancesClient />
    </UserAppliancesProvider>
  );
}
