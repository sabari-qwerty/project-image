"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios, { all } from "axios";
import { FC, useState, useEffect } from "react";

interface AdminPage {
  id: string;
  name: string;
  email: string;
  role: string;
  picture: string;
}
export const AdminPage = () => {
  const [role, setRole] = useState("user");
  const [allUser, setAllUser] = useState([]);
  const { user, error, isLoading } = useUser();
  const getRole = async (email: string) => {
    const data = await axios
      .get(`/api/user/get/single?email=${email}`)
      .then((data) => setRole(data?.data?.data?.role));
    console.log("get user");
  };
  useEffect(() => {
    getRole(String(user?.email));
    return () => undefined;
  }, [role, user?.email]);
  const getAllUser = async () => {
    await axios
      .get("/api/user/get/all")
      .then((res) => setAllUser(res.data.data));
  };
  useEffect(() => {
    getAllUser();
    return () => undefined;
  }, []);

  console.log(allUser);

  if (role !== "admin") return <>You not Admin</>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>email</th>
              <th>role </th>
              <th>update role</th>
            </tr>
          </thead>
          <tbody>
            {[...allUser].map((data: AdminPage, key) => (
              <tr
                key={key}
                className={`${data.role === "admin" ? "opacity-50" : ""}`}
              >
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={data.picture}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td>
                  <button
                    className="btn btn-outline"
                    disabled={
                      data.role === "admin" && data.email === user?.email
                    }
                  >
                    {data.role}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
