"use client";
import Image from "next/image";
import React from "react";

import Link from "next/link";
import Social from "../components/social/Social";
const signup = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newuser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(newuser);

    const res = await fetch(`${process.env.PUBLIC_URL}/signup/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newuser),
    });

    const result = await res.json();

    // Handle errors
    if (!res.ok) {
      console.error(result.message); // Log error message
      alert(result.message); // Show error to user
      return;
    }

    console.log(result);
    // Reset the form if the signup is successful
    e.target.reset();
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
            Signup
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                placeholder="Type here"
                name="name"
                className="input input-bordered w-full "
                required
              />{" "}
            </div>
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
              signup
            </button>
          </form>
          <div className="divider">or</div>
          <Social />
          <p className="text-center ">
            Already have an account? Please{" "}
            <Link href="/login">
              <span className="text-red-500">Signin</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default signup;
