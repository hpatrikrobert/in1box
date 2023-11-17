"use client";

import { TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { getSession } from "next-auth/react";

const NewMailbox = () => {
  const [mailbox, setMailbox] = useState({ name: "", address: "", user_id: "" });

  const router = useRouter();

  const handleChange = async (event, request) => {
    const { name, value } = event.target;
    const userSessionID = await getSession({req: request});
    setMailbox((prevMailbox) => ({ ...prevMailbox, [name]: value, user_id: userSessionID.user.email }));
    console.log(mailbox);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mailbox.name || !mailbox.address) {
      alert("Name, and email are required!");
      return;
    }

    try {
      const newMailbox = await fetch("http://localhost:3000/api/mailbox", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(mailbox),
      });

      if (newMailbox.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a new email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 w-3/6 mx-auto mt-20 bg-white">
      <h2 className="text-2xl font-bold mb-2">Create A New Mailbox</h2>
      <hr className="mb-8 h-1 bg-gray-200 rounded" />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {/* <InputLabel htmlFor="inbox-name">Inbox Name</InputLabel> */}
        <TextField type="text" name="name" value={mailbox.name} label={"Inbox Name"} onChange={handleChange} />
        {/* <InputLabel htmlFor="mail-address">Email Address</InputLabel> */}
        <TextField type="text" name="address" value={mailbox.address} label={"Email Address"} onChange={handleChange} />
        <div className="flex justify-between mt-10">
          <Link className="text-red-800" href={"/dashboard"}>
            Cancel
          </Link>
          <button className="bg-main-blue text-white w-60 p-2 rounded" type="submit">
            Create New Mailbox
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMailbox;
