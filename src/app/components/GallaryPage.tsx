"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface data {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
}
export const GallaryPage: FC = () => {
  const [user, setUser] = useState([]);

  const getAllUser = async () => {
    await axios
      .get("/api/user/get/all")
      .then((data) => setUser(data.data.data));
  };

  useEffect(() => {
    getAllUser();

    return () => undefined;
  }, []);
  return (
    <div className="flex space-x-8">
      {user.map((data: data, key) => {
        return (
          <Link
            href={`/gallery/${data.id}`}
            className="card w-96 bg-base-100 shadow-xl "
            key={key}
          >
            <figure>
              <img src={data.picture} alt="user" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data.name.split("@")[0]}!</h2>
              <p>{data.email}</p>
              <p>{data.role}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
