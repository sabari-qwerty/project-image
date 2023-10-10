export const dynamic = "auto";
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";

import { SettingPage } from "@/app/components/SettingPage";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

export default withPageAuthRequired(
  async function Page() {
    return (
      <main>
        <SettingPage />
      </main>
    );
  },
  {
    returnTo: "/setting/user",
  }
);
