// Set as client-side
"use client";

import { User } from "../../helpers/types";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  // Set state for user object
  const [userData, setUserData] = useState<User>({
    _id: "",
    username: "",
    email: "",
    isVerified: false,
    isAdmin: false,
  });
  // Set state for loading process
  const [isLoading, setIsLoading] = useState(false);

  // Get the user details on page load
  useEffect(() => {
    getUserDetails();
  }, []);

  // Function for logging out the user
  const logout = async () => {
    try {
      // Try to logout the user
      await axios.get("/api/users/logout");

      // Show success message
      toast.success("Logout successful");

      // Push the logged out user to the login page
      router.push("/login");
    } catch (error: any) {
      // Error handling
      console.error("Logout failed ", error.message);
      toast.error(error.message);
    }
  };

  // Function for getting the user details
  const getUserDetails = async () => {
    // Get the user deta
    const response = await axios.get("/api/users/me");
    setUserData(response.data.data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-slate-100">
      {/* Title of the Page */}
      <h1 className="text-white text-2xl">Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      {userData._id && (
        <h2 className="mt-4 mb-2 py-1 px-2 padding rounded bg-red-700">
          <Link href={`/profile/${userData._id}`}>Go to Profile</Link>
        </h2>
      )}
      <hr />
      <button
        onClick={logout}
        className="bg-indigo-500 hover:bg-indigo-700 py-1 px-4 border border-gray300 rounded-lg mt-4 focus:outline-none focus:border-gray-600"
      >
        {isLoading ? "Loading" : "Logout"}
      </button>
    </div>
  );
}
