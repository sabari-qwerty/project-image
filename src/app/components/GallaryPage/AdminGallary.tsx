"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

interface data {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
}

interface AdminGallary {
  role: string;
}

export const AdminGallary: FC<AdminGallary> = ({ role }) => {
  const [userList, setUserList] = useState([]);

  const getAllUser = async () => {
    await axios.get("/api/user/get/all").then((data) => {
      console.log(data.data.data);
      setUserList(data.data.data);
    });
  };

  useEffect(() => {
    getAllUser();

    return () => undefined;
  }, []);

  if (role === "admin") {
    return (
      <div className="flex space-x-8">
        {userList.map((data: data, key) => {
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
  }
};
