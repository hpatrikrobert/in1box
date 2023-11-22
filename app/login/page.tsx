"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-[80vh]">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-white">
        <h1 className="text-xl font-bold my-4">Enter the details</h1>
        <form onSubmit={handleSubmit} id="login-form" className="flex flex-col gap-3">
          <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <button type="submit" className="bg-green-600 text-white font-bold cursor-pointer py-2 px-6">
            Login
          </button>

          {error && <div className="bg-red-500 text-sm text-white w-fit py-1 px-3 rounded-md mt-2">{error}</div>}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don&apos;t have an account? <span className="underline font-bold">Register.</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
