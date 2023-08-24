// Set as client-side
"use client";

import { isValidEmail } from "../../helpers/validation";
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Set state for loading process
  const [isLoading, setIsLoading] = useState(false);

  // Function for handling the user signup
  const onSignup = async () => {
    try {
      // Try to signup the user
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);

      // Show success message
      toast.success("Signup successful");
      console.log("Signup success ", response.data);

      // Push the registered user to the login page
      router.push("/login");
    } catch (error: any) {
      // Error handling
      console.error("Signup failed ", error.message);
      toast.error(error.message);
    } finally {
      // Don't show loading process anymore
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      isValidEmail(user.email) &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user]);

  // Return the rendered signup page
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-slate-100">
      {/* Title of the Page */}
      <h1 className="text-white text-2xl">
        {isLoading ? "Processing..." : "Signup"}
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
          isButtonDisabled ? "bg-red-800" : "bg-green-800"
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
