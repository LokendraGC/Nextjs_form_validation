"use client";
import { NextResponse } from "next/server";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();

  const logOut = async () => {
    console.log("Hello logout!");
    try {
      await axios.get("api/logout");

      document.cookie ="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      router.push("/login");

      return NextResponse.json(
        { message: "Logout successfully completed" },
        { success: true }
      );
    } catch (error) {
      return NextResponse.json({ error: "Error getting" }, { success: false });
    }
  };
  return (
    <div>
      <p>This is dashboard</p>
      <div className="">
        <button
          onClick={logOut}
          className="bg-blue-600 text-white p-2 rounded-md ml-10"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default page;
