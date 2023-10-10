"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface data {
  id: string;
  email: string;
  image_url: string;
}
export default function Page() {
  const router = usePathname();

  const id = router.split("/").splice(-1)[0];

  const getAllImage = async () => {
    return await axios.get(`/api/image/user/all?id=${id}`);
  };

  const useQueryGetAllImage = useQuery({
    queryKey: ["GetAllImage"],
    queryFn: () => getAllImage(),
  });

  if (useQueryGetAllImage.isLoading) return <>Loading</>;

  if (!useQueryGetAllImage.data?.data?.data) return <>no image</>;
  return (
    <main className="container">
      {useQueryGetAllImage.data?.data?.data.map((data: data, key: number) => (
        <img src={data.image_url} alt="img" key={key} />
      ))}
    </main>
  );
}
