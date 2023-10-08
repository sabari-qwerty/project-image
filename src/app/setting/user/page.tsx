import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

export default withPageAuthRequired(
  async function Page() {
    return <main></main>;
  },
  {
    returnTo: "/setting/user",
  }
);
