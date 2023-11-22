"use client";

import moment from "moment";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import email from "@/interfaces/email_Interface";

const getEmail = async (id: string | undefined) => {
  try {
    const email = await fetch(`http://localhost:3000/api/emails/${id}`, { cache: "no-store" });
    return email.json();
  } catch (error) {
    console.log(error);
  }
};

const SingleEmail = () => {
  const path = usePathname();
  const id = path.split("/").pop();

  const [email, setEmail] = useState({title: "", sender: "", updatedAt: new Date(), content: ""});

  useEffect(() => {
    async function fetchData() {
      const { email } = await getEmail(id);
      setEmail(email);
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!email) {
    return <div>Loading</div>;
  }

  return (
    <div className="p-10 bg-white border-b">
      <div>
        <Link className="text-red-700" href={"/dashboard"}>
          Back to emails
        </Link>
      </div>
      <div className="bg-white mt-10">
        <h2 className="text-2xl font-bold">{email.title}</h2>
        <hr className="mb-4" />
        <div className="flex items-center">
          <h3 className="font-bold text-lg">{email.sender}</h3>
          <p className="ml-4 text-slate-400 text-xs">{moment(email.updatedAt).fromNow()}</p>
        </div>
        <p className="mt-2">{email.content}</p>
      </div>
    </div>
  );
};

export default SingleEmail;
