"use client";

import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const isAboveMobileScreen = useMediaQuery("(min-width : 768px)");

  return (
    <>
      {isAboveMobileScreen ? (
        <div className="px-4 border-r-2 border-slate-300 flex flex-col justify-between h-[calc(100vh-6rem)]">
          <div>
            <h2 className="text-2xl font-bold mt-4">Welcome, Niels</h2>
            <Link href={"/write-email"}>
              <div className="bg-accent-green hover:bg-green-600 text-white font-bold mt-2 py-2 px-4 rounded w-full transition-colors text-center">
                Write New Message
              </div>
            </Link>
            <div className="mt-10">
              <h3 className="font-bold text-xl">Mailboxes</h3>
              <p className="mt-2">nielskoop@gmail.com</p>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <Link href={"/settings"}>
              <Image src="/images/070-settings.png" alt="open settings" height={30} width={30} />
            </Link>
            <Link href={"/new-mailbox"}>
              <Image src="/images/114-plus sign.png" alt="add mailbox" height={30} width={30} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-slate-200 flex justify-between px-4 py-1 text-gray-600">
          <p>nielskoop@gmail.com</p>
          <p>
            open conversations <b>3</b>
          </p>
        </div>
      )}
    </>
  );
};

export default Sidebar;
