'use client';
// import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Briefcase, Users, Eye, CheckCircle } from 'lucide-react';

// Dummy companies data for testing and dynamic loading
const dummyCompanies = [
  { id: 1, name: "Apple", description: "Technology & Gadgets", image: "/apple.jpg" },
  { id: 2, name: "Nike", description: "Sports & Fashion", image: "/nike.jpg" },
  { id: 3, name: "Samsung", description: "Electronics & Smartphones", image: "/samsung.jpg" },
];

export default function CompanyDetails() {

  const searchParams = useSearchParams();
  // const searchQuery = searchParams.get("search") || "";
  // const [companies, setCompanies] = useState<{ id: number; name: string; description: string; image: string }[]>([]);
  // const [filteredCompanies, setFilteredCompanies] = useState<{ id: number; name: string; description: string; image: string }[]>([]);
  const router = useRouter();

  // Simulate fetching companies data
  // useEffect(() => {
  //   setCompanies(dummyCompanies);
  // }, []);

  // Filter companies if a search query exists; otherwise, show all
  // useEffect(() => {
  //   if (searchQuery.trim()) {
  //     setFilteredCompanies(
  //       companies.filter((company) =>
  //         company.name.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     );
  //   } else {
  //     setFilteredCompanies(companies);
  //   }
  // }, [searchQuery, companies]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pt-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <h1 className="text-5xl font-bold text-gray-900">About Our Company</h1>
        <p className="text-gray-500 mt-2 text-lg">Home / About Us</p>
      </motion.div>

      {/* About Section */}
      <div className="container mx-auto px-6 md:px-16 py-12 grid md:grid-cols-2 gap-12 items-center">
        <motion.img 
          src="/about-image.jpg" 
          alt="About Us" 
          className="rounded-xl shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-semibold mb-6">Who We Are</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We specialize in crafting tailored web solutions that empower businesses to thrive. Our dedicated team of developers, designers, and strategists collaborates to create seamless websites, applications, and e-commerce platforms.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center py-14 bg-gray-100">
        <h2 className="text-4xl font-semibold">Why Choose Us</h2>
        <p className="text-gray-500 mb-10 text-lg">Discover what sets us apart.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
          {[
            { icon: <Briefcase />, title: "Expertise", text: "Years of experience in web development." },
            { icon: <Users />, title: "Collaboration", text: "We work closely with clients to achieve goals." },
            { icon: <Eye />, title: "Attention to Detail", text: "We ensure high-quality, pixel-perfect designs." },
            { icon: <CheckCircle />, title: "Customer Focus", text: "We prioritize client satisfaction." }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="p-8 bg-white rounded-xl shadow-lg flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="text-blue-500 text-5xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-2xl">{item.title}</h3>
              <p className="text-gray-600 mt-3 text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-center py-12"
      >
        <h2 className="text-4xl font-bold">That’s all about us</h2>
        <p className="text-gray-500 mt-3 text-lg">We’d love to hear from you!</p>
        <button className="mt-5 px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition" onClick={() => router.push('/contact')}>
          Get in Touch
        </button>
      </motion.div>
    </div>
  );
};
