"use client";

import { useState, useEffect  } from "react";
import { Upload, Trash2 } from "lucide-react";
import UserSidebar from '../../../components/UserSidebar';
import { useAuth } from "../../../context/AppProvider";
import axios from "axios";



export default function ProfileSettings() {
  const { isLoading, authToken } = useAuth();
  const [seller, setSeller] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/seller/profile`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            }
          }
        );

        const data = response.data;
        console.log(data);
        setSeller(response.data.seller);


      } catch (error) {
        console.error("Error fetching myProducts data:", error);
      }
    }

    if (authToken) {
      fetchData();
    }
  }, [authToken]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeller((prevSeller) => ({
      ...prevSeller,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      <UserSidebar/>
    <div className="flex-1 p-6">
      {/* Breadcrumb */}
      <p className="text-gray-500 text-sm mb-2">Account settings / <span className="text-black font-semibold">Profile</span></p>
      
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-600 mb-6">Manage settings for your [Brand_name] profile</p>

      {/* Profile Picture Upload */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
          MA
        </div>
        <div>
          <p className="text-gray-600 text-sm">We support PNGs, JPEGs, and GIFs under 10MB</p>
          <button className="flex items-center gap-2 mt-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md">
            <Upload size={16} /> Upload image
          </button>
        </div>
      </div>

      {/* Form Inputs */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={seller?.company_name || ""}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={seller?.contact_phone || "N/A"}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email Address</label>
          <div className="flex items-center gap-2">
            <input
              type="email"
              name="email"
              value={seller?.contact_email || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Update e-mail</button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            You may need to log out and back in to see any changes.
          </p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        <p className="text-gray-600 text-sm">
          If you want to permanently delete this account and all of its data, you can do so below.
        </p>
        <button className="mt-2 flex items-center gap-2 text-red-600">
          <Trash2 size={16} /> Delete account
        </button>
      </div>
    </div>
    </div>
  );
}
