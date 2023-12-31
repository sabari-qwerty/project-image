export const dynamic = "force-dynamic";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GallaryPage } from "../components/GallaryPage";

export default withPageAuthRequired(
  async function Page() {
    return (
      <main>
        <GallaryPage />
      </main>
    );
  },
  { returnTo: "/gallery" }
);
