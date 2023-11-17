"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  console.log(session);

  async function handleClick(request) {
    const userSessionID = await getSession({req: request});
    console.log(userSessionID);
  }

  return (
    <div className="grid place-items-center h-[80vh]">
      <div className="shadow-lg p-8 bg-white flex flex-col gap-2 my-6">
        {/* TODO FIX SESSION OBJECT FROM NEXT-AUTH SO THAT THE NAME CAN BE DISPLAYED HERE  <div>
          Name: <span className="font-bold">{session?.user?.firstName}</span>
        </div> */}
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3 rounded-md">
          Log out
        </button>
        <button onClick={() => handleClick()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3 rounded-md">
          ShowSession
        </button>
      </div>
    </div>
  );
};

export default Profile;
