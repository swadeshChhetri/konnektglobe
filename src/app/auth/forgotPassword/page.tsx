"use client"
import { useState } from "react";
import { motion } from "framer-motion";

export default function ForgotResetPassword() {
  const [step, setStep] = useState(1); // 1: Forgot Password, 2: Reset Password
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (username) setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      alert("Password reset successfully!");
      setStep(1);
      setUsername("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("New passwords do not match!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        {step === 1 ? (
          <motion.form onSubmit={handleForgotPassword} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
            <label className="block mb-2 text-gray-700">Username *</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
            >
              Forgot Password
            </motion.button>
          </motion.form>
        ) : (
          <motion.form onSubmit={handleResetPassword} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
            <label className="block mb-2 text-gray-700">Old Password *</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md mb-4"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <label className="block mb-2 text-gray-700">New Password *</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label className="block mb-2 text-gray-700">Confirm Password *</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
            >
              Reset Password
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
}