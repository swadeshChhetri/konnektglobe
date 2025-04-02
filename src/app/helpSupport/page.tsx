'use client';

import { Search } from "lucide-react";

export default function HelpSupport() {
  const categories = [
    { title: "Getting Started", description: "Start off on the right foot! Not the left one!", icon: "\uD83C\uDF1F" },
    { title: "Account Settings", description: "You're a special snowflake and so is your account", icon: "\uD83D\uDD11" },
    { title: "Billing", description: "That feel when you look at your bank account", icon: "\uD83D\uDCB3" },
    { title: "Interface", description: "What does this button do ..#???", icon: "\uD83D\uDCBB" },
    { title: "Trust & Safety", description: "Keep things safe & sound for you and your buddies", icon: "\uD83D\uDEE1️" },
    { title: "F.A.Q", description: "All you can eat self-serve problem solving", icon: "\u2753" },
    { title: "Community", description: "Bringing people together from all over the world", icon: "\uD83D\uDC64" },
    { title: "Server Setup", description: "Almost as exciting as interior decorating", icon: "\uD83D\uDEE0️" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 pt-20">
      {/* Header Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to KonnektGlobe Support</h1>
        <div className="flex items-center mt-4 bg-gray-100 px-4 py-2 rounded-full w-full max-w-md">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="How can we help you?"
            className="flex-grow px-2 bg-transparent focus:outline-none"
          />
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full">Search</button>
        </div>
      </div>
      
      {/* Help Categories */}
      <div className="mt-10 text-center w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-gray-700">Need help&apos; We&apos;ve got your back</h2>
        <p className="text-gray-500 mt-2">Perhaps you can find the answers in our collections</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-semibold text-blue-600">{category.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {/* <div className="mt-10 text-center">
        <p className="text-gray-500">Other ways to find help:</p>
        <div className="flex justify-center gap-4 mt-2">
          <span className="text-blue-400 text-2xl">🐦</span>
          <span className="text-orange-500 text-2xl">🔴</span>
          <span className="text-indigo-500 text-2xl">🎮</span>
        </div>
      </div> */}
    </div>
  );
}
