"use client";
import Image from "next/image";
import React from "react";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Social from "../components/social/Social";
const Login = () => {
  const searchParams = useSearchParams();

  const path = searchParams.get("redirect");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: path ? path : "/",
    });
  };
  return (
    <div className="container mx-auto py-24">
      <div className="flex items-center justify-between gap-6">
        <div className="w-1/2">
          <Image
            src="/assets/images/login/login.svg"
            alt="Login Image cooming soon"
            height={540}
            width={540}
          />
        </div>
        <div className="border-2 p-12 w-1/2 ">
          <h3 className="text-3xl font-semibold text-orange-600 text-center">
            Signin
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="email">Email</label> <br />
              <input
                type="email"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full "
                required
              />{" "}
            </div>

            <div className="mt-12">
              <label htmlFor="password ">Password</label> <br />
              <input
                type="password"
                name="password"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-full mt-12 bg-orange-700 text-white hover:bg-red-700"
            >
              signin
            </button>
          </form>
          <div className="divider">or</div>
          <Social />
          <p className="text-center ">
            Do not have an account? Please{" "}
            <Link href="/signup">
              <span className="text-red-500">Signup</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
