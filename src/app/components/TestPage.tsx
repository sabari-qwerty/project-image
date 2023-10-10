"use client";
import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const TestPage: FC = () => {
  const { user, error, isLoading } = useUser();

  const createUser = async () => {
    const data = {
      name: user?.name,
      email: user?.email,
      picture: user?.picture,
    };

    const _data = await axios.post("/api/user/update", data);
    console.log("update user");
    return _data?.data;
  };

  const getRole = async (email: string) => {
    const data = await axios.get(`/api/user/get/single?email=${email}`);

    return data;
  };

  const useQueryCreateUser = useQuery({
    queryKey: ["create user"],
    queryFn: () => createUser(),
  });

  const useQueryGetRole = useQuery({
    queryKey: ["get role"],
    queryFn: () => getRole(String(user?.email)),
  });

  console.log();

  return (
    <div className="navbar bg-base-100 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          ImaGe Gallery
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            {!user ? (
              <a href="/api/auth/login">Login</a>
            ) : (
              <a href="/api/auth/logout">Logout</a>
            )}
          </li>
          <li>
            <details>
              <summary>
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-6">
                    <img src={`${user?.picture}`} alt="avather" />
                  </div>
                </div>{" "}
              </summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <Link
                    href="/admin"
                    className={` ${
                      useQueryGetRole.data?.data?.data?.role === "admin"
                        ? ""
                        : "hidden"
                    } `}
                  >
                    Admin
                  </Link>
                </li>
                <li>
                  <Link href="/setting/user">Setting</Link>
                </li>
                <li>
                  <Link href="/gallery">gallery</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};
