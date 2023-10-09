"use client";
import { FC, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

interface AdminPage {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
}

export const SettingPage: FC = () => {
  const { user, error, isLoading } = useUser();

  const [getUser, setGetUser] = useState<AdminPage>();

  const [User, setUser] = useState(String(user?.name).split("@")[0]);

  const [Email, setEmail] = useState(String(user?.email));

  const [role, setRole] = useState("user");

  const [Image, setImage] = useState("");

  const GetUser = async () => {
    if (user?.email) {
      const data = await axios
        .get(`/api/user/get/single?email=${user?.email}`)
        .then((data) => data?.data?.data);
      setUser(data?.name);
      setEmail(data?.email);
      setRole(data?.role);
      setImage(data?.picture);
    }
  };

  useEffect(() => {
    GetUser();

    return () => undefined;
  }, [user?.email]);

  return (
    <div className="w-4/5 mx-auto mt-10 flex flex-col space-y-8">
      <div className="flex justify-between">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={Image} alt="user" />
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
            value={User}
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
            value={Email}
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
            value={role}
            onChange={(e) => setUser(e.target.value)}
            className="input input-bordered input-info w-full "
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};
