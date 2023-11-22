/* eslint-disable @next/next/no-async-client-component */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const resUserExists = await fetch("/api/checkuser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const { userCheck } = await resUserExists.json();
      console.log("UserCheck", userCheck);
      console.log("resUserExists");

      if (userCheck) {
        setError("Email already exists");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {        
        router.push("/login");
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const session = await getServerSession(authOptions);

  // if (session) redirect("/dashboard");

  return (
    <div className="grid place-items-center h-[80vh]">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-white">
        <h1 className="text-xl font-bold my-4">Enter the details</h1>
        <form
          onSubmit={handleSubmit}
          id="login-form"
          className="flex flex-col gap-3"
        >
          <input
            onChange={handleChange}
            value={user.firstName}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={handleChange}
            value={user.lastName}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <input
            onChange={handleChange}
            value={user.email}
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={handleChange}
            value={user.password}
            name="password"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-bold cursor-pointer py-2 px-6"
          >
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-sm text-white w-fit py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account?{" "}
            <span className="underline font-bold">Login.</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
