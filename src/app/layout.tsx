export const dynamic = "auto";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NavBar } from "./components/NavBar";
import Provider from "@/utils/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <Provider>
          <body
            className={
              inter.className + " w-[90%] mx-auto flex flex-col space-y-6"
            }
          >
            <NavBar />

            {children}
          </body>
        </Provider>
      </UserProvider>
    </html>
  );
}
