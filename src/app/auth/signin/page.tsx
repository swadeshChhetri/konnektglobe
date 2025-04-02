"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../../context/AppProvider";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // Error state
  const [passwordError, setPasswordError] = useState(""); // Error state
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous errors
    setEmailError("");
    setPasswordError("");

    // Validation
    if (!email) setEmailError("Email is required");
    if (!password) setPasswordError("Password is required");

    if (!email || !password) return; // Stop form submission if fields are empty

    try {
      // First, get the CSRF cookie so Laravel sets XSRF-TOKEN
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // Then, send the login request to your API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/signin",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Logged in successfully:", response.data);
      await login(response.data.user)
      console.log(response.data.user);
      alert("Logged in successfully!");
      router.push("/");
      // You might want to redirect the user or save authentication data here.
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed! Check the console for details.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          <span className="text-blue-600">Log In</span> to KonnektGlobe
        </h2>
        <p className="text-gray-500 text-center mb-4">
          Let’s schedule with confidence
        </p>

        <button className="w-full flex items-center justify-center gap-2 bg-white border py-2 rounded-lg shadow-sm hover:shadow-md transition">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 mx-2 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="text-gray-700 text-sm">Email or Username</label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@gmail.com"
                className="w-full bg-transparent outline-none ml-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>} {/* Show error */}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="text-gray-700 text-sm">Password</label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none ml-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>} {/* Show error */}
          </div>

          <Link href={"/pages/auth/forgotPassword"} className="text-right text-sm text-blue-600 mb-4 cursor-pointer">
            Forgot Password?
          </Link>

          <motion.button
            aria-label="Log In"
            // onClick={handleLogin}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
            type="submit"
          >
            Log In
          </motion.button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Sign Up</span>
        </p>
      </motion.div>
    </div>
  );
}
