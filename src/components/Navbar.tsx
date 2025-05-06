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
import axios from "axios";
import { useAuth } from "../context/AppProvider";
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Handshake, Wallet, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCallback } from "react";


type FormData = {
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
};

export default function Header() {
  const [userCount, setTotalUsers] = useState<number>(0);
  const { authToken, logout } = useAuth();
  const { citiesData, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict } = useCity();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const pathname = usePathname();
  // const isTradePage = pathname === "/BusinessProducts"; // Store condition in a variable
  // const [locationOpen, setLocationOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const modalRef = useRef<HTMLButtonElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    company_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
  });

  const toggleModal = () => setIsOpen(!isOpen);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sellers`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Ensure you have authToken
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Seller registered successfully!");
        setIsOpen(false); // Close the modal
        setFormData({
          company_name: "",
          contact_name: "",
          contact_email: "",
          contact_phone: "",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          Object.values(error.response.data.errors).forEach((err) => {
            if (Array.isArray(err)) toast.error(err[0]);
          });
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/count`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log(response.data.message); // Logs: "Don't worry bro, say `All is well`"

      // Only set userCount if it exists in response
      if (response.data.userCount !== undefined) {
        setTotalUsers(response.data.userCount);
      } else {
        console.warn("userCount is not available in the response");
      }
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  }, [authToken]);

  useEffect(() => {
    if (!authToken) {
      router.push("/auth");
      return;
    }
    fetchTotalUsers();
  }, [authToken, fetchTotalUsers, router]);

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



  // const handleSearch = () => {
  //   if (searchTerm) {
  //     router.push(`/products?search=${searchTerm}`);
  //   } else {
  //     router.push("/products");
  //   }
  // };

  // const handleLogout = () => {
  //   logout();
  //   router.push("/signin"); // Redirect after logout
  // };

  return (
    <header className="bg-background w-full text-light fixed shadow-md z-50">
      <nav className="flex items-center justify-between bg-dark text-light px-2 py-2 border-b shadow-sm">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="font-semibold text-light">
            <Image
              src="/logo.jpg"
              alt="KonnektGlobe Logo"
              width={80}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* Show extra content only on Trade page */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1 text-gray-600 "
          >
            <MapPin className="w-5 h-5" />
           <span className="hidden md:block">{selectedDistrict || selectedCity}</span> 
            <ChevronDown className="w-4 h-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg p-2 rounded-md">
              <input
                type="text"
                placeholder="Search city..."
                className="w-full p-2 border rounded-md text-sm"
              />
              <ul className="mt-2 text-sm">
                {citiesData.map((city) => (
                  <li key={city.name}>
                    <div onClick={() => {
                      setSelectedCity(city.name);
                      setSelectedDistrict("");
                      setDropdownOpen(false);
                    }}
                      className="hidden md:block font-semibold cursor-pointer hover:bg-gray-200 p-1 rounded"
                    >


                      {city.name}
                    </div>

                    <ul className="ml-4 text-gray-600">
                      {city.districts.map((district) => (
                        <li
                          key={district}
                          onClick={() => {
                            setSelectedDistrict(district);
                            setDropdownOpen(false);
                          }}
                          className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        >
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
        <SearchBar />

        <div className="hidden md:block justify-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={toggleModal}
          >
            Become a Seller
          </button>

          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
              >
                <button onClick={toggleModal} className="absolute top-2 right-2">
                  <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </button>
                <h2 className="text-xl font-semibold mb-4">Seller Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Company Name"
                    className="w-full border p-2 rounded"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="contact_name"
                    placeholder="Contact Name"
                    className="w-full border p-2 rounded"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="contact_email"
                    placeholder="Contact Email"
                    className="w-full border p-2 rounded"
                    value={formData.contact_email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="contact_phone"
                    placeholder="Contact Phone (Optional)"
                    className="w-full border p-2 rounded"
                    value={formData.contact_phone}
                    onChange={handleChange}
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500"
                      onClick={toggleModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>




        {/* Icons and Buttons */}
        <div className="flex items-center space-x-4">
          {/* {loading ? (
            <Skeleton width={100} height={20} /> // Show skeleton while loading
          ) :  */}
          {
            authToken ? (
              <div className="relative flex items-center gap-4">
                {/* Wrapper div to handle hover */}
                <div
                  onMouseEnter={() => setUserMenuOpen(true)}
                  onMouseLeave={() => setUserMenuOpen(false)}
                  className="relative"
                >
                  {/* User Icon */}
                  <User className="w-8 h-6 cursor-pointer" />

                  {/* Hover Menu */}
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-[1.50rem] right-[-79px] w-44 bg-white text-gray-900 p-2 shadow-xl rounded-xl flex flex-col border border-gray-200"
                    >
                      <Link href="/user/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                        <Home className="w-5 h-5" />
                        Dashboard
                      </Link>
                      <Link href="/pages/profile" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                        <User className="w-5 h-5" />
                        Profile
                      </Link>
                      <Link href="/pages/inquiries" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                        <MessageCircle className="w-5 h-5" />
                        Inquiries
                      </Link>
                      <Link href="/pages/buy-leads" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                        <ShoppingCart className="w-5 h-5" />
                        Buy Leads
                      </Link>
                      <Link href="/pages/membership" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                        <BadgeCheck className="w-5 h-5" />
                        Membership
                      </Link>

                      <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition mt-2"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

            ) : (
              <>
                {/* <button className="font-semibold flex  rounded-xl p-1">
                  <Link href="/checkout">
                    <User size={20} className="" />
                  </Link>
                </button> */}
                <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold ">
                  <Link href="/auth">
                    Login
                  </Link>
                </button>
              </>
            )}

          <div className="hidden md:block bg-blue-100 px-2 py-2 rounded-md text-blue-800 text-xs w-32">
            Registered Users <br />
            <span className="text-sm">{userCount !== null ? userCount : "Loading..."}</span>
          </div>

          {/* <div className="flex justify-center items-center bg-gradient-to-b from-blue-400 to-white">
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              <Headset className="w-6 h-6" />
            </button>

            {isOpen && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Get in Touch</h2>
                    <X
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <p className="text-gray-600 mb-4">Nunc erat cursus tellus gravida.</p>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <textarea
                      placeholder="What do you have in mind?"
                      className="p-3 border border-gray-300 rounded-lg w-full h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
                    >
                      Submit
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
          </div> */}

          <div className="relative">
            {/* Clickable CircleHelp Icon */}
            <button
              onClick={() => setShowComment(!showComment)}
              className="p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center gap-2"
            >
              <MoreVertical className="w-6 h-6" />
            </button>

            {/* Conditional rendering of the comment content */}
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
        </div>




      </nav>
    </header>
  );
}
