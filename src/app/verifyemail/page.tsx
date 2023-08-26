// Set as client-side
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

export default function VerifyEmailPage() {
  // Set the states
  const [token, setToken] = useState<String>("");
  const [verified, setVerified] = useState<Boolean>(false);
  const [hasError, setHasError] = useState<Boolean>(false);

  // Function to verify the user's email
  const verifyUserEmail = async () => {
    try {
      // Try to verify the user's token
      await axios.post("/api/users/verifyemail", { token });
      // Set the verified state to true
      setVerified(true);
    } catch (error: any) {
      // Error handling
      setHasError(true);
      console.error(error.response.data);
    }
  };

  // Run this code when the component mounts
  useEffect(() => {
    // Get the token from the URL
    const urlToken = window.location.search.split("=")[1];
    // Set the token state
    setToken(urlToken || "");
  }, []);

  // Run this code when token changes
  useEffect(() => {
    // If the token is not empty, try to verify the user's email
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl bg-green-700 text-black">Verify Email</h1>
      <h3>{!hasError && "Please move to Login"}</h3>
      <br />

      {/* If verified, show this */}
      {verified && (
        <div>
          <h3 className="mb-2">Your email has been verified.</h3>
          <Link href="/login">Login</Link>
        </div>
      )}

      {/* If there is an error, show this */}
      {hasError && (
        <div>
          <h3 className="text-2xl bg-red-500 text-black">
            Error occurred. Please try again later.
          </h3>
        </div>
      )}
    </div>
  );
}
