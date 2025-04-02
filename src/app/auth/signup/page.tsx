"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  // Update state when the user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // // Check if passwords match
    // if (formData.password !== formData.confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    try {

      // First, get the CSRF cookie
      let checking = await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      console.log(checking);


      const response = await axios.post(
        "http://localhost:8000/api/signup", // Ensure Laravel API is running on port 8000
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Needed if using Laravel Sanctum for authentication
        }
      );
      console.log(response);

      console.log("User registered successfully:", response.data);
      alert("User registered successfully");
      router.push("/signin");
    } catch (error: any) {
      console.error("Registration failed", error.response?.data || error);
      alert("Registration failed! Check console for details.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-900"
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 mt-16">
        <h2 className="text-2xl font-bold text-center mb-4">
          <span className="text-blue-600">Sign Up</span> to Join KonnektGlobe
        </h2>
        <p className="text-gray-500 text-center mb-4">
          Ease of scheduling across the globe
        </p>
        <button className="w-full flex items-center justify-center border py-2 px-4 rounded-lg mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Logo"
            className="h-5 w-5 mr-2"
          />
          Sign Up with Google
        </button>

        <div className="relative text-center my-4">
          <span className="bg-white px-2 text-gray-500">OR</span>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
        <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded-lg"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email or Username"
            className="w-full p-2 border rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {/* <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded-lg"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div> */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2"
          >
            Sign Up
          </motion.button>
        </form>
        <p className="text-xs text-center text-gray-500 mt-4">
          By clicking “Sign Up”, you acknowledge that you have read and
          understood, and agree to KONNKT’s
          <a href="#" className="text-blue-600">
            {" "}
            Terms and Conditions{" "}
          </a>
          and
          <a href="#" className="text-blue-600">
            {" "}
            Privacy Policy
          </a>
        </p>
        <p className="text-center mt-4">
          Already have an account?
          <a href="#" className="text-blue-600">
            {" "}
            Log In
          </a>
        </p>
      </div>
    </motion.div>
  );
}
