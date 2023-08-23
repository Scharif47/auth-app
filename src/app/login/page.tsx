// Set as client-side
"use client";

import { isValidEmail } from "../../utils/validation";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

// Function for rendering the login page
export default function LoginPage() {
  const { useState } = React;
  const router = useRouter();

  // Set the user state
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // Set state for diabling the button
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // Set state for loading process
  const [isLoading, setIsLoading] = useState(false);

  // Function for handling the user login
  const onLogin = async () => {
    try {
      // Try to login the user
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);

      // Show success message
      toast.success("Login successful");
      console.log("Login success ", response.data);

      // Push the logged in user to the profile page
      router.push("/profile");
    } catch (error: any) {
      // Error handling
      console.error("Login failed ", error.message);
      toast.error(error.message);
    } finally {
      // Don't show loading process anymore
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      isValidEmail(user.email)
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user]);

  // Return the rendered login page
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-slate-100">
      {/* Title of the Page */}
      <h1 className="text-white text-2xl">
        {isLoading ? "Processing..." : "Login"}
      </h1>
      <hr />
      {/* Form for the user to login */}
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
      {/* Button for the user to login */}
      <button
        onClick={onLogin}
        className={`py-1 px-4 border border-gray300 rounded-lg mt-4 focus:outline-none focus:border-gray-600 ${
          isButtonDisabled ? "bg-red-800" : "bg-green-800"
        }`}
      >
        Login
      </button>
      <Link className=" mt-2" href="/signup">
        Visit signup page
      </Link>
    </div>
  );
}
