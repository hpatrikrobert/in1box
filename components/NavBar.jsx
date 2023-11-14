"use client";

import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineMailOpen } from "react-icons/hi";

const NavBar = () => {
  const isAboveMobileScreen = useMediaQuery("(min-width : 960px)");

  return (
    <>
      {isAboveMobileScreen ? (
        <nav className="flex justify-between h-24 items-center px-10 border-b-2 border-slate-300 bg-main-blue">
          <Link className="flex text-4xl text-white font-bold" href="/dashboard">
            <HiOutlineMailOpen className="mr-2" />
            In1Box
          </Link>
          <div className="flex space-x-6 items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input //TODO find out why this is adding a ring on focus
                type="search"
                id="default-search"
                className="block w-72 p-3 pl-12 text-sm text-gray-900 border rounded-full"
                placeholder="Search Emails, People..."
              />
            </div>
            <Link href="/dashboard/profile">
              <Image
                className="rounded-full h-16 w-16 object-cover"
                src="/images/selfie-placeholder.jpeg"
                alt="profile image"
                height={70}
                width={70}
              />
            </Link>
          </div>
        </nav>
      ) : (
        // TODO add hamburger menu with left slide in, add search button that drops down an input box
        <nav className="flex justify-between h-24 items-center px-6 border-b-2 border-slate-300 bg-main-blue">
          <div>Hamburger</div>
          <Link className="flex text-4xl text-white font-bold" href="/">
            <HiOutlineMailOpen className="mr-2" />
            In1Box
          </Link>
          <div>Search</div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
