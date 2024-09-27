"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const location = usePathname();
  const session = useSession();
  console.log(session);

  return (
    <div className="bg-base-100">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <Link href={"/"}>
            <Image src={"/assets/logo.svg"} alt="Logo" height={50} width={70} />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-7">
            {links?.map((link, idx) => (
              <Link
                className={
                  location === link.url
                    ? "text-red-600 transition-all"
                    : "hover:bg-base-100 hover:border-b-4 hover:transition-all"
                }
                href={link.url}
                key={idx}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
        <div className="navbar-end space-x-4">
          {session?.status === "loading" && <h6>Loading...</h6>}
          {session?.status === "unauthenticated" && (
            <>
              <Link href={"/login"} className="btn">
                Login
              </Link>
              <Link href={"/signup"} className="btn">
                Signup
              </Link>
            </>
          )}
          {session?.status === "authenticated" && (
            <button className="btn" onClick={() => signOut()}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const links = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "MyBookings", url: "/my-bookings" },
  { name: "Services", url: "/services" },
  { name: "Blog", url: "/blog" },
  { name: "Contacts", url: "/contacts" },
];
export default Navbar;
