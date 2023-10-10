export const dynamic = "auto";
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UploadImage } from "./components/UploadImage";
import { TestPage } from "./components/TestPage";

export default withPageAuthRequired(
  async function Page() {
    return (
      <main>
        <UploadImage />
      </main>
    );
  },
  { returnTo: "/" }
);
