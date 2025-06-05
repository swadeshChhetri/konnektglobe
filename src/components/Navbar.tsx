"use client";

// import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  User,
  MapPin,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { Home, MessageCircle, BadgeCheck, LogOut } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useCity } from "../context/CityContext";
import { useAuth } from "../context/AppProvider";
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Handshake, Wallet, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCallback } from "react";
import api from '../utils/api'; 
import axios from "axios";


type FormData = {
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
};

export default function Header() {
  const [userCount, setTotalUsers] = useState<number | null>(null);
  const { authToken, logout } = useAuth();
  const { citiesData, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict } = useCity();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const modalRef = useRef<HTMLButtonElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    company_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
  });
  const [isUserSeller, setIsUserSeller] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/sellers", formData);
      if (response.data.success) {
        toast.success("Seller registered successfully!");
        setIsOpen(false);
        setFormData({
          company_name: "",
          contact_name: "",
          contact_email: "",
          contact_phone: "",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
    
        if (status === 422) {
          const errors = error.response?.data?.errors;
    
          if (errors && typeof errors === 'object') {
            Object.values(errors).forEach((err) => {
              if (Array.isArray(err)) {
                toast.error(err[0]);
              }
            });
          }
        } else {
          toast.error("Something went wrong. Please try again.");
        }
    
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    };
  };

  const fetchTotalUsers = useCallback(async () => {
    try {
      const response = await api.get("/users/count");

      // Only set userCount if it exists in response
      if (response.data.userCount !== undefined) {
        setTotalUsers(response.data.userCount);
      } else {
        console.warn("userCount is not available in the response");
      }
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  }, []);

  // Function to check if the logged-in user is a seller
  const checkIfSeller = useCallback(async () => {
    if (authToken) {
      try {
        const response = await api.get("/users/is-seller");
        setIsUserSeller(response.data.isSeller); // Assuming the API returns { isSeller: true/false }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          logout();
          router.push("/auth");
        } else {
          console.error("Error checking seller status:", error);
          setIsUserSeller(false);
        }
      }
    }
  }, [authToken, logout, router]);

  useEffect(() => {
    fetchTotalUsers();
  }, [fetchTotalUsers]);

  useEffect(() => {
    checkIfSeller();
  }, [checkIfSeller]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  return (
    <header className="bg-background w-full text-light fixed shadow-md z-50">
      <nav className="flex items-center justify-between gap-2 bg-dark text-light px-4 py-2 border-b shadow-sm">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="font-semibold text-light">
            <Image src="/logo.jpg" alt="KonnektGlobe Logo" width={120} height={60} priority />
          </Link>
        </div>

        {/* City Selector */}
        <div className="relative hidden md:block">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center text-black space-x-1">
            <MapPin className="w-5 h-5" />
            <span>{selectedDistrict || selectedCity || "Select City"}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-60 bg-white text-gray-900 border shadow-lg p-2 rounded-md z-50">
              <input type="text" placeholder="Search city..." className="w-full p-2 border rounded-md text-sm mb-2" />
              <ul className="text-sm max-h-64 overflow-y-auto">
                {citiesData.map((city) => (
                  <li key={city.name}>
                    <div onClick={() => { setSelectedCity(city.name); setSelectedDistrict(""); setDropdownOpen(false); }}
                      className="font-semibold cursor-pointer hover:bg-gray-100 p-1 rounded">
                      {city.name}
                    </div>
                    <ul className="ml-4 text-gray-600">
                      {city.districts.map((district) => (
                        <li key={district} onClick={() => { setSelectedDistrict(district); setDropdownOpen(false); }}
                          className="cursor-pointer hover:bg-gray-100 p-1 rounded">
                          {district}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mt-2 md:mt-0 md:px-4 max-w-md w-full">
          <SearchBar />
        </div>

        {/* Actions: Seller, Auth, User Info */}
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          {/* Conditional Button */}
          {authToken && isUserSeller ? (
            <Link href="/postproducts">
              <button className="hidden md:block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Post Product
              </button>
            </Link>
          ) : (
            <button onClick={toggleModal} className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Become a Seller
            </button>
          )}

          {/* Seller Modal (only relevant if not already a seller) */}
          {!isUserSeller && isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
              >
                <button onClick={toggleModal} className="absolute top-2 right-2">
                  <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </button>
                <h2 className="text-xl font-semibold mb-4">Seller Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input name="company_name" type="text" placeholder="Company Name" className="w-full border p-2 rounded" value={formData.company_name} onChange={handleChange} required />
                  <input name="contact_name" type="text" placeholder="Contact Name" className="w-full border p-2 rounded" value={formData.contact_name} onChange={handleChange} required />
                  <input name="contact_email" type="email" placeholder="Contact Email" className="w-full border p-2 rounded" value={formData.contact_email} onChange={handleChange} required />
                  <input name="contact_phone" type="text" placeholder="Contact Phone (Optional)" className="w-full border p-2 rounded" value={formData.contact_phone} onChange={handleChange} />
                  <div className="flex justify-between mt-4">
                    <button type="button" onClick={toggleModal} className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500">Cancel</button>
                    <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">Register</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>


        {/* User Count */}
        <div className="hidden md:block bg-blue-100 px-2 py-1 rounded-md text-blue-800 text-xs w-32 text-center">
          Registered Users<br />
          <span className="text-sm">{userCount !== null ? userCount : "Loading..."}</span>

        </div>

        {/* Auth/User */}
        {authToken ? (
          <div className="relative group">
            <User className="w-7 h-7 cursor-pointer text-black" />

            <div className="absolute top-10 right-0 w-48 bg-white text-gray-900 p-2 shadow-lg rounded-md z-50 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
              <Link href="/user/dashboard" className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100">
                <Home className="w-4 h-4" /> Dashboard
              </Link>
              <Link href="/pages/profile" className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100">
                <User className="w-4 h-4" /> Profile
              </Link>
              <Link href="/pages/inquiries" className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100">
                <MessageCircle className="w-4 h-4" /> Inquiries
              </Link>
              <Link href="/pages/buy-leads" className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100">
                <ShoppingCart className="w-4 h-4" /> Buy Leads
              </Link>
              <Link href="/pages/membership" className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100">
                <BadgeCheck className="w-4 h-4" /> Membership
              </Link>
              <button onClick={logout} className="w-full flex items-center px-4 py-2 gap-2 text-red-600 hover:bg-red-100">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>

        ) : (
          <Link href="/auth">
            <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">Login</button>
          </Link>
        )}

        {/* Help Icon */}
        <button onClick={() => setShowComment(!showComment)} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          <MoreVertical className="w-5 h-5" />
        </button>
        <div className="relative">
          {showComment && (
            <div className="bg-white shadow-md rounded-xl p-6 w-[400px] absolute top-12 right-0 z-50">
              <h2 className="text-xl font-semibold text-gray-900">
                IT Products & Services
              </h2>

              <motion.button
                ref={modalRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full bg-blue-600 text-white font-medium py-3 rounded-lg flex justify-center items-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/postproducts");
                }}
              >
                Post Buy Requirement ➝
              </motion.button>

              <h3 className="mt-6 text-lg font-semibold text-gray-800 flex items-center">
                <span className="text-orange-500">👑</span> Try our Pocket-Friendly Plans
              </h3>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-100 rounded-lg text-center"
                >
                  <Handshake className="mx-auto text-gray-700" size={32} />
                  <p className="mt-2 text-sm font-medium">Buy Leads</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-100 rounded-lg text-center"
                >
                  <Wallet className="mx-auto text-gray-700" size={32} />
                  <p className="mt-2 text-sm font-medium">Subscription Plans</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-100 rounded-lg text-center"
                >
                  <Briefcase className="mx-auto text-gray-700" size={32} />
                  <p className="mt-2 text-sm font-medium">Google Business Listing</p>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>

  );
}
