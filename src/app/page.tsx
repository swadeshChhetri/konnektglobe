"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Mic, ArrowRight } from "lucide-react";
import CategorySlider from "../components/CategorySlider";
import ResponsiveSlider from "../components/Slider";
import Link from "next/link";
import {
  User, Shirt, Home, FlaskConical, Package, Gem, ShoppingBag, Leaf,
  Headphones, Dumbbell, Briefcase, Baby, Car, Box,
} from "lucide-react";
import { Landmark } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";


const products = [
  {
    name: "Disposable Shoe Cover",
    price: 2.5,
    image: "/B2B/1.jpg",
  },
  {
    name: "Ultrasonic Cleaners",
    price: 2500,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Polished Acoustic Chair",
    price: 4300,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Copper Pooja Kalash",
    price: 500,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Printed Promotion Umbrella",
    price: 163,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Cotton Printed Dupatta",
    price: 120,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Sample Product 7",
    price: 999,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Sample Product 8",
    price: 799,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Disposable Shoe Cover",
    price: 2.5,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Ultrasonic Cleaners",
    price: 2500,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Polished Acoustic Chair",
    price: 4300,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Copper Pooja Kalash",
    price: 500,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Printed Promotion Umbrella",
    price: 163,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Cotton Printed Dupatta",
    price: 120,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Sample Product 7",
    price: 999,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Sample Product 8",
    price: 799,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Disposable Shoe Cover",
    price: 2.5,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Ultrasonic Cleaners",
    price: 2500,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Polished Acoustic Chair",
    price: 4300,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Copper Pooja Kalash",
    price: 500,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Printed Promotion Umbrella",
    price: 163,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Cotton Printed Dupatta",
    price: 120,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Sample Product 7",
    price: 999,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Sample Product 8",
    price: 799,
    image: "https://via.placeholder.com/150",
  },
  // Add more products as needed...
];

const categories1 = [
  { name: "Health & Beauty", content: "Various beauty products & services." },
  { name: "Apparel & Fashion", content: "Trendy clothing and fashion items." },
  { name: "Chemicals", content: "Industrial and household chemicals." },
  { name: "Machinery", content: "Heavy and light machinery." },
  {
    name: "Electronics & Electricals",
    content: "Electronic gadgets & components.",
  },
  { name: "Health & Beauty", content: "Various beauty products & services." },
  { name: "Apparel & Fashion", content: "Trendy clothing and fashion items." },
  { name: "Apparel & Fashion", content: "Trendy clothing and fashion items." },
];

const homeCategories = [
  { name: "Common Medicines", image: "/B2B/15.jpg" },
  { name: "Medical & Diagnostic", image: "/B2B/16.jpg" },
  { name: "Personal Care Products", image: "/B2B/17.jpg" },
  { name: "Solar Panels", image: "/B2B/18.jpg" },
  { name: "Human Hair & Accessories", image: "/B2B/19.jpg" },
  { name: "Jackets", image: "/B2B/20.jpg" },
  { name: "Common Medicines", image: "/B2B/21.jpg" },
  { name: "Medical & Diagnostic", image: "/B2B/22.jpg" },
  { name: "Personal Care Products", image: "/B2B/23.jpg" },
  { name: "Solar Panels", image: "/B2B/24.jpg" },
  { name: "Human Hair & Accessories", image: "/B2B/25.jpg" },
  { name: "Jackets", image: "/B2B/14.jpg" },
];

const testimonials = [
  {
    name: "Mr. Patel Hiren",
    company: "Spice Villa Export, India",
    feedback:
      "ExportersIndia portal is quite effective. I am getting a lot of orders throughout the world. I am one happy client...",
  },
  {
    name: "Shelly Luo",
    company: "Viss Lighting, China",
    feedback:
      "Viss Lighting is one of the top manufacturers in the LED display & lighting industry with over 7 years of experience...",
  },
  {
    name: "Jalpenkumar",
    company: "Bhrza Technologies Company, India",
    feedback:
      "I want to thank my Relationship Manager for his support and guidance. I believed in him and the services of your portal...",
  },
];

function HomePage() {

  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [index, setIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [direction, setDirection] = useState(1);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cities = [
    { name: "Delhi", icon: <Landmark size={40} /> },
    { name: "Gurugram", icon: <Landmark size={40} /> },
    { name: "Noida", icon: <Landmark size={40} /> },
    { name: "Bengaluru", icon: <Landmark size={40} /> },
    { name: "Chennai", icon: <Landmark size={40} /> },
    { name: "Mumbai", icon: <Landmark size={40} /> },
    { name: "Ahmedabad", icon: <Landmark size={40} /> },
    { name: "Kolkata", icon: <Landmark size={40} /> },
    { name: "Pune", icon: <Landmark size={40} /> },
    { name: "Surat", icon: <Landmark size={40} /> },
    { name: "Hyderabad", icon: <Landmark size={40} /> },
    { name: "More Cities", icon: <Landmark size={40} /> },
  ];

  const cards2 = [
    {
      img: "/b2b.jpg", // Replace with actual image paths
      title: "Add your content",
      link: "/trade",
      linkText: "View more",
    },
    {
      img: "/b2c.jpg",
      title: "Add your content",
      link: "#",
      linkText: "View more",
    },
  ];

  const categories2 = [
    { icon: User, label: "" },
    { icon: Shirt, label: "" },
    { icon: Home, label: "" },
    { icon: FlaskConical, label: "" },
    { icon: Package, label: "" },
    { icon: Gem, label: "" },
    { icon: ShoppingBag, label: "" },
    { icon: Leaf, label: "" },
    { icon: Headphones, label: "" },
    { icon: Dumbbell, label: "" },
    { icon: Briefcase, label: "" },
    { icon: Baby, label: "" },
    { icon: Car, label: "" },
    { icon: Box, label: "" },
    { icon: Car, label: "" },
    { icon: Box, label: "" },
  ];

  const categories3 = [
    {
      title: "Prefabricated & Portable Build...",
      links: [
        "Office Container",
        "Portable Cabins",
        "Mobile Cabins",
        "Security Cabins",
      ],
      image: "/B2B/28.jpg",
    },
    {
      title: "Hardware Fittings and Access...",
      links: ["Steel Angles", "MS Channel", "Ferrules", "Brackets"],
      image: "/B2B/29.jpg",
    },
    {
      title: "Door & Window Fittings",
      links: [
        "Stainless Steel Door Hardware",
        "Door Handles",
        "Brass Handles",
        "Door Hardware",
      ],
      image: "/B2B/30.jpg",
    },
    {
      title: "Paints, Varnishes & Wall Putty",
      links: ["Paints", "Special Purpose Paints", "Primer Paint", "Wall Putty"],
      image: "/B2B/31.jpg",
    },
    {
      title: "Sanitary Ware & Fittings",
      links: [
        "Bathroom Sanitary Ware",
        "Water Closet",
        "Pedestal Wash Basin",
        "Kitchen Sink",
      ],
      image: "/B2B/32.jpg",
    },
    {
      title: "Pipe & Tube Fittings",
      links: [
        "Industrial Coupler",
        "Forged Pipe Fittings",
        "Forged Steel Fittings",
        "Thermowell",
      ],
      image: "/B2B/33.jpg",
    },
  ];

  const categories4 = [
    {
      title: "Medicines Tonics and Drugs",
      links: [
        "Office Container",
        "Portable Cabins",
        "Mobile Cabins",
        "Security Cabins",
      ],
      image: "/B2B/34.jpg",
    },
    {
      title: "Digestive System Medicines",
      links: ["Steel Angles", "MS Channel", "Ferrules", "Brackets"],
      image: "/B2B/35.jpg",
    },
    {
      title: "Animal Health Care",
      links: [
        "Stainless Steel Door Hardware",
        "Door Handles",
        "Brass Handles",
        "Door Hardware",
      ],
      image: "/B2B/36.jpg",
    },
    {
      title: "Anti Infective Medicines",
      links: ["Paints", "Special Purpose Paints", "Primer Paint", "Wall Putty"],
      image: "/B2B/37.jpg",
    },
    {
      title: "Dietary Supplements & Nutracs",
      links: [
        "Bathroom Sanitary Ware",
        "Water Closet",
        "Pedestal Wash Basin",
        "Kitchen Sink",
      ],
      image: "/B2B/38.jpg",
    },
    {
      title: "Pain Relief Drugs & Medicines",
      links: [
        "Industrial Coupler",
        "Forged Pipe Fittings",
        "Forged Steel Fittings",
        "Thermowell",
      ],
      image: "/B2B/39.jpg",
    },
  ];

  const categories5 = [
    {
      title: "Face Mask & PPE Kit",
      links: [
        "Office Container",
        "Portable Cabins",
        "Mobile Cabins",
        "Security Cabins",
      ],
      image: "/B2B/40.jpg",
    },
    {
      title: "Laboratory Equipments",
      links: ["Steel Angles", "MS Channel", "Ferrules", "Brackets"],
      image: "/B2B/41.jpg",
    },
    {
      title: "Diagnostic Imaging & X-ray Equipments",
      links: [
        "Stainless Steel Door Hardware",
        "Door Handles",
        "Brass Handles",
        "Door Hardware",
      ],
      image: "/B2B/42.jpg",
    },
    {
      title: "Medical Equipment & Supplies",
      links: ["Paints", "Special Purpose Paints", "Primer Paint", "Wall Putty"],
      image: "/B2B/43.jpg",
    },
    {
      title: "Physiotherapy Products",
      links: [
        "Bathroom Sanitary Ware",
        "Water Closet",
        "Pedestal Wash Basin",
        "Kitchen Sink",
      ],
      image: "/B2B/28.jpg",
    },
    {
      title: "Surgical Equipment & Supplies",
      links: [
        "Industrial Coupler",
        "Forged Pipe Fittings",
        "Forged Steel Fittings",
        "Thermowell",
      ],
      image: "/B2B/29.jpg",
    },
  ];


  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300;
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300;
    }
  };

  const handleScroll = (e) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    setCanScrollLeft(scrollLeft > 0);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-24 ">
        <section className="text-center relative">
          <div
            className="relative inline-flex"
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Sidebar */}
            <div className="bg-white shadow-md p-4 rounded-[5px]">
              <h2 className="text-lg font-bold mb-4">Top Categories</h2>
              <ul className="space-y-2">
                {categories1.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 transition"
                    onMouseEnter={() => setHoveredCategory(category.name)}
                  >
                    <span>{category.name}</span>
                  </li>
                ))}
              </ul>
            </div>


            {hoveredCategory && (
              <div
                className="absolute left-56 top-0 w-72 bg-gray-50 shadow-lg pl-4 z-10 mt-4 p-4 h-96"
                onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <h3 className="text-lg font-semibold">{hoveredCategory}</h3>
                <p className="text-sm text-gray-600">
                  {
                    categories1.find((cat) => cat.name === hoveredCategory)
                      ?.content
                  }
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="hover:text-blue-600 cursor-pointer">
                    Subcategory 1
                  </li>
                  <li className="hover:text-blue-600 cursor-pointer">
                    Subcategory 2
                  </li>
                  <li className="hover:text-blue-600 cursor-pointer">
                    Subcategory 3
                  </li>
                </ul>
              </div>
            )}
          </div>
        </section>

        <section className="col-span-2 ">
          <ResponsiveSlider
            images={[
              "/B2B/slide3.webp",
              "/B2B/slide2.jpeg",
              "/B2B/slide3.webp",
            ]}
            height="h-[23rem]"
            objectFit="object-contain"
          />
        </section>

        <section className="text-center">
          <div className="grid grid-cols-1 gap-6 m-1">
            {cards2.map((card, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={500}
                  height={300}
                  className="w-full h-[12rem] object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-between p-4">
                  <h3 className="text-white text-lg font-semibold">
                    {card.title}
                  </h3>
                  <a href={card.link} className="text-white underline text-sm">
                    {card.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="flex flex-wrap justify-center gap-6 p-6 mt-[5rem]">
        {categories2.map(({ icon: Icon, label }, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-200 rounded-full transition"
          >
            <Icon className="w-8 h-8 text-gray-700 transition-transform duration-200 hover:scale-110" />
            <p className="text-sm text-center mt-2 text-gray-700 transition-colors duration-200 hover:text-blue-600">
              {label}
            </p>
          </div>
        ))}
      </section>

      <div className="relative w-full px-6 mt-[5rem]">
        <h2 className="text-lg font-bold mb-4">Trending Categories</h2>
        <CategorySlider categories={homeCategories} />
      </div>

      <div className="p-6 mt-[5rem]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Real Estate, Building & Construction
      </h2>
      <div className="border border-gray-300 rounded-lg p-6 grid md:grid-cols-3 gap-6 bg-gray-50 shadow-lg">
        <motion.div
          className="relative col-span-1 bg-cover bg-center text-white p-8 rounded-lg flex flex-col justify-end shadow-md hover:shadow-lg transition-all duration-300"
          style={{ backgroundImage: "url('/B2B/main.jpg')" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-black bg-opacity-50 p-4 rounded-lg">
            <p className="text-xl font-semibold">Wood and Lumber</p>
            <p className="text-sm">Cladding Materials and Building Panels</p>
            <p className="text-sm">Bricks & Construction Materials</p>
            <p className="text-sm">Doors & Windows</p>
            <Link href="/products">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-300">
                View All
              </button>
            </Link>
          </div>
        </motion.div>

        <div className="col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories3.map((category, index) => (
            <motion.div
              key={index}
              className="border p-6 rounded-lg flex flex-col items-start gap-2 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:border-blue-500"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">{category.title}</h3>
              {category.links.map((link, i) => (
                <p key={i} className="text-blue-500 text-sm cursor-pointer hover:underline">
                  {link}
                </p>
              ))}
              <div className="flex justify-between items-center w-full mt-2">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <ArrowRight className="text-blue-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

      <div className="p-6 mt-[5rem]">
        <h2 className="text-2xl font-semibold mb-4">
          Health & Beauty
        </h2>
        <div className="border border-gray-300 rounded-lg p-4 grid md:grid-cols-3 gap-4">
          <motion.div
            className="relative col-span-1 bg-cover bg-center text-white p-6 rounded-lg flex flex-col justify-end"
            style={{ backgroundImage: "url('/B2B/main.jpg')" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold">Wood and Lumber</p>
            <p>Cladding Materials and Building Panels</p>
            <p>Bricks & Construction Materials</p>
            <p>Doors & Windows</p>
            <Link href="/products">
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                View All
              </button>
            </Link>
          </motion.div>

          <div className="col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories4.map((category, index) => (
              <motion.div
                key={index}
                className="border p-4 rounded-lg flex justify-between items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  {category.links.map((link, i) => (
                    <p key={i} className="text-blue-500 text-sm cursor-pointer">
                      {link}
                    </p>
                  ))}
                </div>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-16 h-16 object-cover"
                />
                <ArrowRight className="text-blue-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 mt-[5rem]" >
        <h2 className="text-2xl font-semibold mb-4">
          Hospitals & Diagnosis Supplies
        </h2>
        <div className="border border-gray-300 rounded-lg p-4 grid md:grid-cols-3 gap-4">
          <motion.div
            className="relative col-span-1 bg-cover bg-center text-white p-6 rounded-lg flex flex-col justify-end"
            style={{ backgroundImage: "url('/B2B/main.jpg')" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold">Wood and Lumber</p>
            <p>Cladding Materials and Building Panels</p>
            <p>Bricks & Construction Materials</p>
            <p>Doors & Windows</p>
            <Link href="/products">
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                View All
              </button>
            </Link>
          </motion.div>

          <div className="col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories5.map((category, index) => (
              <motion.div
                key={index}
                className="border p-4 rounded-lg flex justify-between items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  {category.links.map((link, i) => (
                    <p key={i} className="text-blue-500 text-sm cursor-pointer">
                      {link}
                    </p>
                  ))}
                </div>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-16 h-16 object-cover"
                />
                <ArrowRight className="text-blue-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-[5rem]">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
        Industrial Machinery
      </h2>
      <div className="grid grid-cols-4 gap-6 justify-items-center mt-[5rem]">
        {cities.map((city, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.15, boxShadow: "0px 8px 20px rgba(0, 123, 255, 0.4)", transition: { duration: 0.3, ease: "easeOut" } }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center w-24 h-24 border-2 border-gray-300 rounded-full cursor-pointer transition-all duration-300 ease-out hover:border-blue-500 hover:bg-blue-100"
          >
            {city.icon}
            <span className="text-sm font-medium mt-2 text-gray-700">
              {city.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 px-6 py-12 mt-[5rem]">
        <div className="bg-white shadow-2xl rounded-3xl flex max-w-5xl w-full overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
          {/* Left Side - Animated Image & Highlights */}
          <div className="w-1/2 p-6 flex flex-col items-center justify-center relative bg-gradient-to-r from-orange-100 to-orange-300">
            <Image
              src="/postbanner2.jpg"
              alt="User"
              width={800}
              height={600}
              className="shadow-lg"
            />
            {/* Floating Highlights */}
            <div className="absolute top-8 left-[-20px] bg-white px-4 py-2 rounded-lg shadow-md text-xs font-medium animate-bounce">
              🔥 Best Deals from Verified Sellers
            </div>
            <div className="absolute bottom-10 left-[-40px] bg-white px-4 py-2 rounded-lg shadow-md text-xs font-medium animate-pulse">
              🚚 Order on the Way! ETA: 2:00pm
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 p-10">
            <h2 className="text-2xl font-bold text-gray-800">Post Buy Requirement</h2>
            <p className="text-sm text-gray-500 mb-6">
              Tell us what you need, and we’ll help you get the best deals.
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-6 relative">
              <div className="w-1/4 bg-orange-500 h-2 rounded-full transition-all duration-500"></div>
            </div>

            {/* Input Fields */}
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Enter the product you are looking for..."
                className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-orange-300 focus:outline-none transition"
              />
              <div className="flex gap-3">
                <select className="border p-3 rounded-xl shadow-sm bg-gray-50">
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-orange-300 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Voice Recording Button */}
            <div
              className={`mt-6 p-4 border rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all duration-500 ${isRecording ? "bg-red-200 border-red-400" : "bg-gray-100 hover:bg-gray-200"
                }`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="text-red-500 animate-pulse" />
              <span className="text-sm font-medium">
                {isRecording ? "Recording... 🎙️" : "Tap to Record Voice"}
              </span>
            </div>

            {/* Checkbox */}
            <div className="mt-4 flex items-center gap-3">
              <input type="checkbox" id="loan" className="w-5 h-5 accent-orange-500" />
              <label htmlFor="loan" className="text-sm text-gray-600">
                Looking for a loan.
              </label>
            </div>

            {/* Submit Button */}
            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-lg hover:bg-blue-700 transition-all duration-300">
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-12 rounded-2xl shadow-lg text-center mt-[5rem]">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-wide">
          What Our Clients Say
        </h2>

        <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
          <div className="w-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="bg-white p-8 rounded-lg shadow-xl w-full border border-gray-200 flex flex-col items-center text-center"
              >
                <img
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  className="w-20 h-20 rounded-full border-4 border-orange-500 shadow-md mb-4"
                />
                <div className="relative">
                  <Quote className="text-orange-500 w-12 h-12 absolute top-[4.25rem] left-[84%] transform -translate-x-1/2" />
                  <p className="text-gray-800 text-xl italic leading-relaxed px-6 mt-8">
                    "{testimonials[index].feedback}"
                  </p>
                  <Quote className="text-orange-500 w-12 h-12 absolute bottom-[3.25rem] right-[95%] transform translate-x-1/2 rotate-180" />
                </div>
                <div className="mt-6">
                  <p className="font-semibold text-lg text-gray-900">
                    {testimonials[index].name}
                  </p>
                  <p className="text-gray-600 text-sm">{testimonials[index].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${i === index ? "bg-orange-500 scale-110 shadow-md" : "bg-gray-400"
                }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 p-6 mt-[5rem]">
        <h1 className="text-2xl font-bold mb-4">POPULAR PRODUCTS</h1>
        <div className="relative bg-white p-4 rounded shadow">
          {/* Left Arrow: Only shows when user has scrolled right */}
          {canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hidden md:block"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Scrollable Container */}
          <div className="overflow-hidden">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="grid grid-flow-col grid-rows-2 gap-4 auto-cols-[200px] overflow-x-scroll scroll-smooth"
            >
              {products.map((product, index) => (
                <div key={index} className="border p-2 rounded shadow-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover mb-2"
                  />
                  <p className="font-semibold text-sm mb-1">{product.name}</p>
                  <p className="text-gray-600 text-sm">
                    ₹ {product.price} / Piece
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow: Always shown (you can add logic to hide it if needed) */}
          <button
            onClick={handleScrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hidden md:block"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
