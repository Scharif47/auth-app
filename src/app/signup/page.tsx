// Set as client-side
"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

// Function for rendering the signup page
export default function SignupPage() {
  const { useState } = React;
  const router = useRouter();

  // Set the user state
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  // Set the button state
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function for handling the user signup
  const onSignup = async () => {
    try {
      // Try to signup the user
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success ", response.data);
      router.push("/login");
    } catch (error: any) {
      // Error handling
      console.error("Signup failed ", error.message);
      toast.error(error.message);
    } finally {
      // Don't show loading process anymore
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // Return the rendered signup page
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-slate-100">
      {/* Title of the Page */}
      <h1 className="text-white text-2xl">
        {loading ? "Processing..." : "Signup"}
      </h1>
      <hr />
      {/* Form for the user to signup */}
      {/* username inputs */}
      <label htmlFor="username">username</label>
      <input
        className="p-1 border border-gray-500 text-slate-600 rounded-lg"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      {/* email inputs */}
      <label htmlFor="email">email</label>
      <input
        className="p-1 border border-gray-500 text-slate-600 rounded-lg"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      {/* password inputs */}
      <label htmlFor="password">password</label>
      <input
        className="p-1 border border-gray-500 text-slate-600 rounded-lg"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      {/* Button for the user to signup */}
      <button
        onClick={onSignup}
        className={`py-1 px-4 border border-gray300 rounded-lg mt-4 focus:outline-none focus:border-gray-600 ${
          buttonDisabled ? "bg-red-800" : "bg-green-800"
        }`}
      >
        Signup
      </button>
      <Link className=" mt-2" href="/login">
        Visit login page
      </Link>
    </div>
  );
}
