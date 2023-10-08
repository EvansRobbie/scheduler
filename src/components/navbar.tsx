"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { status } = useSession();
  return (
    <div className="h-20 flex items-center border-b justify-end">
      {status === "authenticated" ? (
        <button onClick={() => signOut()} className="btn  btn-secondary">
          Logout
        </button>
      ) : (
        <Link href={"/login"} className="btn  btn-secondary">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
