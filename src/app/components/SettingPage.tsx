"use client";
import { FC, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface AdminPage {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
}

export const SettingPage: FC = () => {
  const { user, error, isLoading } = useUser();

  // const [getUser, setGetUser] = useState<AdminPage>();

  const [User, setUser] = useState(String(user?.name).split("@")[0]);

  const [Email, setEmail] = useState(String(user?.email));

  const [role, setRole] = useState("user");

  const [Image, setImage] = useState("");

  const GetUser = async () => {
    const data = await axios.get(`/api/user/get/single?email=${user?.email}`);

    return data;
  };

  const useQuerGetUser = useQuery({
    queryKey: ["getsingleuser"],
    queryFn: () => GetUser(),
  });

  return (
    <div className="w-4/5 mx-auto mt-10 flex flex-col space-y-8">
      <div className="flex justify-between">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={useQuerGetUser.data?.data?.data?.picture} alt="user" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center my-auto w-4/5 space-y-4 ">
          <label htmlFor="name" className="w-full  text-lg">
            name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            value={useQuerGetUser.data?.data?.data?.name.split("@")[0]}
            onChange={(e) => setUser(e.target.value)}
            className="input input-bordered input-info w-full "
          />
        </div>
      </div>
      <div className="flex justify-between space-x-8 ">
        <div className="w-1/2">
          <label htmlFor="email" className="w-full  text-lg">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={useQuerGetUser.data?.data?.data?.email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered input-info w-full "
          />
        </div>
        <div className=" w-1/2">
          <label htmlFor="role" className="w-full  text-lg">
            Role
          </label>
          <input
            name="role"
            type="role"
            id="role"
            value={useQuerGetUser.data?.data?.data?.role}
            onChange={(e) => setUser(e.target.value)}
            className="input input-bordered input-info w-full "
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};
