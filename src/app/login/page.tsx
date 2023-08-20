// Set as client-side
"use client";

import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
// import {axios} from "axios";

// Function for rendering the signup page
export default function LoginPage() {
  const {useState} = React
  const router = useRouter()

  // Set the user state
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  // Function for handling the user signup
  const onLogin = async () => {

  }

  // Return the rendered signup page
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-slate-100">
      {/* Title of the Page */}
      <h1 className="text-white text-2xl">Login</h1>
      <hr />
      {/* Form for the user to signup */}
      {/* email inputs */}
      <label htmlFor="email">email</label>
      <input
       className="p-1 border border-gray-500 text-slate-600 rounded-lg"
       id="email"
       type="email"
       value={user.email}
       onChange={(e) => setUser({...user, email: e.target.value})} 
       placeholder="email"
       />
      {/* password inputs */}
      <label htmlFor="password">password</label>
      <input
       className="p-1 border border-gray-500 text-slate-600 rounded-lg"
       id="password"
       type="password"
       value={user.password}
       onChange={(e) => setUser({...user, password: e.target.value})} 
       placeholder="password"
       />
      {/* Button for the user to signup */}
      <button
      onClick={onLogin}
      className="py-1 px-4 border border-gray300 rounded-lg mt-4 focus:outline-none focus:border-gray-600">Login</button>
      <Link className=" mt-2" href="/signup">Visit signup page</Link>
    </div>
  )
}