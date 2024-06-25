import React, { useEffect, useState } from "react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AXIOS = axios.create({
  headers: {
    Accept: "application/json, text/plain, /",
    "Content-Type": "multipart/form-data",
  },
});
const Signin = () => {
  const navigate = useNavigate();
  const [taleId, setTaleId] = useState("");
  const [password, setPassword] = useState("");

  const handleTaleIdChange = (e) => setTaleId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignin = async (eve) => {
    eve.preventDefault();
    if (!taleId || !password) {
      return;
    } else {
      const response = await AXIOS.post("/auth/signin", { taleId, password });
      console.log(response, "RESPONSE", taleId, password);
      if (response.data?.token) {
        localStorage.setItem("taleUserToken", response.data?.token);
        navigate("/feed");
      } else {
        alert(response.data?.error);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-primary-grey-500 border-2 border-primary-grey-500 p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-red-500">
          Login
        </h2>
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm  mb-2"
              htmlFor="username"
            >
              Username or Email
            </label>
            <div className="flex items-center border rounded-xl border-1 border-zinc-500 shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <UserIcon className="h-5 w-5 text-gray-200 mr-2" />
              <input
                className="flex-grow focus:outline-none p-1 bg-transparent text-white"
                id="username email"
                type="text"
                value={taleId}
                onChange={handleTaleIdChange}
                placeholder="Enter username or email"
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
            <div className="flex items-center border rounded-xl border-1 border-zinc-500 bg-primary-grey-500 shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <LockClosedIcon className="h-5 w-5 text-gray-200 mr-2" />
              <input
                className="flex-grow focus:outline-none p-1 bg-transparent text-white"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="mb-4 text-right">
            <a
              href="#"
              className="text-primary-red-500 hover:text-primary-red-700 text-sm font-medium"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline bg-primary-blue bg-primary-red-500 hover:bg-primary-red-700 w-60"
              type="submit"
            >
              Login
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
          <div className="text-sm mt-8 text-center text-white">
            Don't have an account?
            <Link
              to="/signup"
              className="text-primary-red-500 hover:text-primary-red-700 ml-2 font-medium"
            >
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
