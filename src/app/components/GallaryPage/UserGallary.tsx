"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

interface data {
  id: string;
  email: string;
  image_url: string;
}
export const UserGallary: FC = () => {
  const { user, isLoading, error } = useUser();
  const [allImage, setAllImage] = useState([]);

  const getAllImage = async () => {
    const image = await axios
      .get("/api/image/user/email?email=" + user?.email)
      .then((res) => setAllImage(res.data.data));
  };

  useEffect(() => {
    getAllImage();
    return () => undefined;
  }, [user?.email]);

  if (!allImage) return <>no image</>;
  return (
    <main className="container">
      {allImage.map((data: data, key) => (
        <img src={data.image_url} alt="img" key={key} />
      ))}
    </main>
  );
};
