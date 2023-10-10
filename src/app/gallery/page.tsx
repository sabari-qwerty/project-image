export const dynamic = "auto";
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";

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
