"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "authenticated") {
    router.push("/");
  }
  //   console.log(session);
  const mentorSignIn = async () => {
    await signIn("google");
  };

  const menteeSignIn = async () => {
    await signIn("google");
  };
  return (
    <div className="flex w-full h-[100vh] items-center justify-center">
      <div className="inline-flex gap-3">
        <button onClick={mentorSignIn} className="btn btn-primary">
          Login as a mentor
        </button>
        <button onClick={menteeSignIn} className="btn btn-info">
          Login as a mentee
        </button>
      </div>
    </div>
  );
};

export default Login;
