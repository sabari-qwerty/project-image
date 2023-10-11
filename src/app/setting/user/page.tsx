export const dynamic = "force-dynamic";

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
