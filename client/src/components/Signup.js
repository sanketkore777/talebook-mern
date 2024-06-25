import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axios from "axios";
const AXIOS = axios.create({
  headers: {
    Accept: "application/json, text/plain, /",
    "Content-Type": "multipart/form-data",
  },
});
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  async function handleSignUp(e) {
    e.preventDefault();
    let response;
    try {
      response = await AXIOS.post("/auth/signup", {
        username,
        email,
        password,
      });
      console.log("Error000000000000000000000", response);
      alert(`Sign up successful! Status: ${response.status}`);
    } catch (error) {
      console.log(error, "Error", response);
      alert(`Sign up failed! Error: ${error.message}`);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-primary-grey-500 border-2 border-primary-grey-500 p-8 rounded-lg shadow-md w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-red-500">
          Create account
        </h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm  mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="flex items-center border rounded-xl border-1 border-zinc-500 shadow bg-primary-grey-500 appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                className="flex-grow focus:outline-none p-1 bg-transparent text-white"
                id="username"
                type="text"
                required
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter a username"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border rounded-xl border-1 border-zinc-500 shadow bg-primary-grey-500 appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <EnvelopeIcon className="h-5 w-5 text-gray-200 mr-2" />
              <input
                className="flex-grow focus:outline-none p-1 bg-transparent text-white"
                id="email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-200 text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border rounded-xl border-1 border-zinc-500 shadow bg-primary-grey-500 appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <LockClosedIcon className="h-5 w-5 text-gray-200 mr-2" />
              <input
                className="flex-grow focus:outline-none p-1 bg-transparent text-white"
                id="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter a password"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-primary-blue bg-primary-red-500 hover:bg-primary-red-700"
              type="submit"
            >
              Create account
            </button>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-gray-400">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="border-2 border-zinc-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              type="button"
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
                className="mr-2"
              />
              Continue with Google
            </button>
          </div>
          <div className="text-sm text-white mt-8 text-center">
            Already have an account?
            <Link to="/" className="text-primary-red-500 ml-2">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
