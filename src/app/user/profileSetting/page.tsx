"use client";

import { useState, useEffect } from "react";
import UserSidebar from '../../../components/UserSidebar';
import { useAuth } from "../../../context/AppProvider";
import api from '../../../utils/api';
import type { AxiosError } from "axios";
import toast from "react-hot-toast";


interface User {
  name?: string;
  email?: string;
  is_seller?: boolean;

}

interface Seller {
  company_name?: string;
  contact_phone?: string;
  contact_email?: string;
}

export default function ProfileSettings() {
  const { authToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/profile');
        setUser(response.data.user);
      } catch (err) {
        console.error("❌ Error fetching user profile:", err);
      }
    };

    const fetchSeller = async () => {
      try {
        const response = await api.get('/seller/profile');
        if (response.data?.seller) {
          setSeller(response.data.seller);
        } else {
          setSeller(null);
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 404) {
          console.warn("⚠️ User is not a seller.");
          setSeller(null);
        } else {
          console.error("❌ Error fetching seller profile:", axiosError);
        }
      }
    };

    if (authToken) {
      fetchUser();
      fetchSeller();
    }
  }, [authToken]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeller((prevSeller) => ({
      ...prevSeller,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await api.put('/seller/profile', seller); // or another endpoint
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile.');
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      <UserSidebar />
      <div className="flex-1 p-6">
        {/* Breadcrumb */}
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {!user?.is_seller && (
          <p className="text-red-600">You are not registered as a seller. Please register first.</p>
        )}

        {/* Form Inputs */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="company_name"
              value={seller?.company_name || user?.name || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Mobile Number</label>
            <input
              type="text"
              name="contact_phone"
              value={seller?.contact_phone || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                name="contact_email"
                value={seller?.contact_email || user?.email || ""}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
