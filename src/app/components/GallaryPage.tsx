"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AdminGallary } from "./GallaryPage/AdminGallary";
import { UserGallary } from "./GallaryPage/UserGallary";

interface data {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
}
export const GallaryPage: FC = () => {
  const { user, error, isLoading } = useUser();
  const [role, setRole] = useState("user");
  const getRole = async (email: string) => {
    const data = await axios
      .get(`/api/user/get/single?email=${email}`)
      .then((data) => setRole(data?.data?.data?.role));
  };
  useEffect(() => {
    getRole(String(user?.email));

    return () => undefined;
  }, [role, user?.email]);

  if (role === "admin") return <AdminGallary role={role} />;

  return <UserGallary />;
};
