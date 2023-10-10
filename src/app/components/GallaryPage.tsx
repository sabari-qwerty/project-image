"use client";
import { FC } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AdminGallary } from "./GallaryPage/AdminGallary";
import { UserGallary } from "./GallaryPage/UserGallary";
import { useQuery } from "@tanstack/react-query";

interface data {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
}
export const GallaryPage: FC = () => {
  const { user, error, isLoading } = useUser();
  const getRole = async (email: string) => {
    const data = await axios.get(`/api/user/get/single?email=${email}`);

    return data;
  };
  const useQueryGetRole = useQuery({
    queryKey: ["get role"],
    queryFn: () => getRole(String(user?.email)),
  });

  if (useQueryGetRole.isLoading) return <>Loading</>;

  if (useQueryGetRole.data?.data?.data?.role === "admin")
    return <AdminGallary role={useQueryGetRole.data?.data?.data?.role} />;

  return <UserGallary />;
};
