// "use client";
// import { useState, useEffect } from "react";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0";
// import axios from "axios";
// import { useUser } from "@auth0/nextjs-auth0/client";

// export default withPageAuthRequired(
//   async function page() {
//     // const [role, setRole] = useState("user");
//     // const { user, error, isLoading } = useUser();
//     // const getRole = async (email: string) => {
//     //   const data = await axios
//     //     .get(`/api/user/get/single?email=${email}`)
//     //     .then((data) => setRole(data?.data?.data?.role));
//     //   console.log("get user");
//     // };
//     // useEffect(() => {
//     //   getRole(String(user?.email));
//     //   return () => undefined;
//     // }, [role, user?.email]);
//     // const getAllUser = async () => {
//     //   await axios.get("/api/user/get/all").then((res) => console.log(res));
//     // };
//     // useEffect(() => {
//     //   getAllUser();
//     //   return () => undefined;
//     // });
//     // if (role === "user") return <main>Your not admin</main>;
//     return <main></main>;
//   },
//   { returnTo: "/admin" }

// );
export const dynamic = "auto";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import { AdminPage } from "../components/AdminPage";

export default withPageAuthRequired(async function page() {
  return (
    <main>
      <AdminPage />
    </main>
  );
});
// export default page;
