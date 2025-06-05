"use client"; // Ensure this is a Client Component

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PhoneCall, MessageCircle } from "lucide-react";
import ContactModal from "../../../components/ContactModal";
import InquiryFormModal from "../../../components/InquiryModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from '../../../utils/api'

interface Product {
  id: number;
  name: string;
  price: number;
  banner_image: string;
  video_url?: string | null;
  description?: string;
  specifications?: string;
  unit: 'Piece' | 'Kg' | 'Meter' | 'Ton' | 'Box';
  min_order: number;
  stock_quantity?: number | null;
  is_featured: number;
  status: 'pending' | 'approved' | 'rejected';
  city: string;
  seller_id: number;

  // Optional: Additional dynamic fields depending on your API
  material?: string;
  grade?: string;
  voltage?: string;
  warranty?: string;
}

interface Seller {
  company_name: string;
  contact_phone: string;
  contact_email: string;
}


const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [seller, setSeller] = useState<Seller | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/products/${params.id}`);
        if (!response || !response.data) {
          alert("No response");
          setIsLoading(false);
          return;
        }
        console.log(response);
        setProduct(response.data.product);
        setSeller(response.data.seller);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };
  
    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 pt-24">
        <Skeleton height={400} />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Skeleton height={250} />
          </div>
          <div>
            <Skeleton height={30} width={200} />
            <Skeleton height={20} width={100} />
            <Skeleton count={4} height={20} className="mt-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-24">
      {/* Left Section: Product Images */}
      <div className="sticky top-4 space-y-6">
        {/* <img
          src={product.image}
          alt="Product Image"
          className="w-full h-96 object-cover rounded-lg shadow"
        /> */}

        <video controls className="w-full h-64 rounded-lg shadow-md">
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* <div className="mt-6">
          <h2 className="text-lg font-semibold">Product Demo Video</h2>
          <video controls className="w-full h-64 rounded-lg shadow-md">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Product Brochure</h2>
          <a
            href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md inline-block mt-2 hover:bg-blue-600 transition"
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* Middle Section: Product Details */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-xl text-blue-600 font-semibold">₹{product.price} / {product.unit}</p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 3 }}
            >
              <PhoneCall className="w-5 h-5" />
            </motion.span>
            Contact Seller
          </button>

          <button
            className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg shadow transition duration-200"
            onClick={() => setIsInquiryModalOpen(true)}
          >
            <motion.span
              whileHover={{ scale: 1.2 }}
              animate={{ rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.span>
            Send Inquiry
          </button>
        </div>

        {/* Product Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 bg-gray-50 p-4 rounded-lg shadow">
          <div className="text-sm">
            <p className="text-gray-500 font-medium">Material</p>
            <p className="text-gray-800 font-semibold">{product.material || "N/A"}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500 font-medium">Automatic Grade</p>
            <p className="text-gray-800 font-semibold">{product.grade || "N/A"}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500 font-medium">Voltage</p>
            <p className="text-gray-800 font-semibold">{product.voltage || "N/A"}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500 font-medium">Warranty</p>
            <p className="text-gray-800 font-semibold">{product.warranty || "N/A"}</p>
          </div>
        </div>
      </div>


      {/* Right Section: Seller Details */}
      <div className="space-y-4 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold">Seller Details</h2>
        <p className="text-gray-600">{seller?.company_name || ""}</p>
        <p className="text-gray-500">Location: {seller?.contact_phone || "N/A"}</p>
        <p className="text-gray-600">{seller?.contact_email || ""}</p>
      </div>

      {/* Contact Modal */}
      {isModalOpen && <ContactModal mobileNumber={seller?.contact_phone || "N/A"} onClose={() => setIsModalOpen(false)} />}

      {/* Inquiry Modal */}
      {isInquiryModalOpen && (
        <InquiryFormModal
          productId={product.id} // Ensure your product API provides an ID
          sellerId={product.seller_id} // Ensure your product API provides seller_id
          productName={product.name}
          onClose={() => setIsInquiryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
