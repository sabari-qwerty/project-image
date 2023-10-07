"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { FC } from "react";

export const NavBar: FC = () => {
  const { user, error, isLoading } = useUser();
  console.log;
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
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
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};
