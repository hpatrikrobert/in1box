"use client";

import { Mailbox_Context } from "@/app/providers";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Navigation = () => {
  const isAboveMobileScreen = useMediaQuery("(min-width : 960px)");

  const { selectedMailbox, setSelectedMailbox, mailboxes } = useContext(Mailbox_Context);

  const handleClick = (id, address) => {
    setSelectedMailbox({ id: id, address: address });
    console.log(selectedMailbox);
  };

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
              <h3
                className="font-bold text-xl cursor-pointer"
                onClick={() => setSelectedMailbox({ id: "", address: "" })}>
                Mailboxes
              </h3>
              {mailboxes.map((mailbox) => {
                return (
                  <div
                    key={mailbox._id}
                    className={`px-4 rounded py-2 cursor-pointer ${
                      selectedMailbox.id === mailbox._id ? "bg-slate-100" : "hover:bg-slate-100"
                    }`}
                    onClick={() => handleClick(mailbox._id, mailbox.address)}>
                    <p className="font-bold">{mailbox.name}</p>
                    <p className=" text-xs text-slate-500">{mailbox.address}</p>
                  </div>
                );
              })}
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

export default Navigation;
