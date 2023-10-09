"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

interface data {
  id: string;
  email: string;
  image_url: string;
}
export default function Page() {
  const router = usePathname();

  const [allImage, setAllImage] = useState([]);

  const id = router.split("/").splice(-1)[0];

  const getAllImage = async () => {
    await axios
      .get(`/api/image/user/all?id=${id}`)
      .then((res) => setAllImage(res.data.data));
  };

  useEffect(() => {
    getAllImage();

    return () => undefined;
  }, [allImage]);

  if (!allImage.length) return <>no image</>;

  return (
    <main className="container">
      {allImage.map((data: data, key) => (
        <img src={data.image_url} alt="img" key={key} />
      ))}
    </main>
  );
}
