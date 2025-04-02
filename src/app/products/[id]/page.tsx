"use client"; // Ensure this is a Client Component

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { PhoneCall, MessageCircle } from "lucide-react";
// import ContactModal from "../../../components/ContactModal";
// import InquiryFormModal from "../../../components/InquiryModal";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 
import { useAuth } from "../../../context/AppProvider";


const ProductDetails = () => {
  const params = useParams(); // Get dynamic route parameters
  const { authToken } = useAuth();
  // const router = useRouter(); 
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [seller, setSeller] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`); 
        console.log(response);
        setProduct(response.data.product);
        setSeller(response.data.seller);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);

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
      {/* <div className="space-y-6">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-lg font-semibold text-gray-600">₹{product.price} INR</p>

        {/* Buttons *
        <div className="flex gap-3 mt-4">
          <button className="btn btn-primary flex items-center" onClick={() => setIsModalOpen(true)}>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 3 }}
            >
              <PhoneCall className="w-5 h-5 mr-2" />
            </motion.span>
            Contact for Seller
          </button>

          <button className="btn btn-outline flex items-center" onClick={() => setIsInquiryModalOpen(true)}>
            <motion.span
              whileHover={{ scale: 1.2 }}
              animate={{ rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
            </motion.span>
            Send Inquiry
          </button>
        </div>

        {/* Product Details Table *
        <div className="overflow-x-auto mt-6">
          <table className="table w-full border">
            <tbody>
              <tr>
                <td className="font-semibold">Material</td>
                <td>{product.material || "N/A"}</td>
              </tr>
              <tr>
                <td className="font-semibold">Automatic Grade</td>
                <td>{product.grade || "N/A"}</td>
              </tr>
              <tr>
                <td className="font-semibold">Voltage</td>
                <td>{product.voltage || "N/A"}</td>
              </tr>
              <tr>
                <td className="font-semibold">Warranty</td>
                <td>{product.warranty || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}

      {/* Right Section: Seller Details */}
      {/* <div className="space-y-4 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold">Seller Details</h2>
        <p className="text-gray-600">{seller?.company_name || ""}</p>
        <p className="text-gray-500">Location: {seller?.contact_phone || "N/A"}</p>
        <p className="text-gray-600">{seller?.contact_email || ""}</p>
      </div> */}

      {/* Contact Modal */}
      {/* {isModalOpen && <ContactModal mobileNumber={seller?.contact_phone || "N/A"} onClose={() => setIsModalOpen(false)} />} */}

      {/* Inquiry Modal */}
      {/* {isInquiryModalOpen && (
        <InquiryFormModal
          productId={product.id} // Ensure your product API provides an ID
          sellerId={product.seller_id} // Ensure your product API provides seller_id
          productName={product.name}
          onClose={() => setIsInquiryModalOpen(false)}
        />
      )} */}
    </div>
  );
};

export default ProductDetails;
