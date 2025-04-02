'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, X } from 'lucide-react';
import Link from 'next/link';
import UserSidebar from '../../../components/UserSidebar';
import axios from 'axios';
import { useAuth } from '../../../context/AppProvider';
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 


const Dashboard = () => {
  const { authToken } = useAuth();
  const [active, setActive] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalListedProducts, setTotalListedProducts] = useState(0);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [userProperties, setUserProperties] = useState([]);

  // Fetch inquiries and products from API
  useEffect(() => {
    const fetchData = async () => {
      try {

        //Response 1::
        const response1 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user-dashboard`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data1 = response1.data;
  
        setTotalListedProducts(data1.total_listed_products || 0);
        setTotalInquiries(data1.total_inquiries || 0);

        //Response 2::
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/showinquiries`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data2 = response2.data;
        console.log("Another route data:", data2);
        setInquiries(data2);

        //Response 3 ::
        const response3 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user-myProducts`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            }
          }
        );

        const data3 = response3.data;
        setUserProperties(data3.products || []);

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
      <div className="container mx-auto p-4">
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

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      <UserSidebar />
      {/* Main Content */}
      <div className="flex-1 p-6 ">
        {/* Heading */}
        <h1 className="text-3xl font-semibold mb-6">Welcome back, Swadesh 👋</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { title: 'Total Products Listed', count: totalListedProducts, color: 'bg-red-200' },
            { title: 'Total Inquiries Received', count: totalInquiries, color: 'bg-green-200' },
            { title: 'Total Customers Reached', count: 250, color: 'bg-blue-200' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`p-5 rounded-lg shadow-md ${item.color}`}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold">{item.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Reports and Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Recent Inquiries */}
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{inq.user_name}</td>
                      <td className="p-3">{inq.user_email}</td>
                      <td className="p-3">{inq.product_name}</td>
                      <td className={`p-3 font-medium ${inq.status === "New" ? "text-red-500" : "text-green-500"}`}>{inq.status}</td>
                      <td className="p-3 text-center">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal */}
            {selectedInquiry && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              >
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                  <button className="absolute top-2 right-2" onClick={() => setSelectedInquiry(null)}>
                    <X size={24} className="text-gray-600 hover:text-gray-800" />
                  </button>
                  <h3 className="text-lg font-semibold mb-2">Inquiry Details</h3>
                  <p><strong>Customer:</strong> {selectedInquiry.customer}</p>
                  <p><strong>Product:</strong> {selectedInquiry.product}</p>
                  <p><strong>Inquiry:</strong> {selectedInquiry.inquiry}</p>
                  <p><strong>Date:</strong> {selectedInquiry.date}</p>
                  <p><strong>Status:</strong> {selectedInquiry.status}</p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">Image</th>
                    <th className="p-2 border">Product Name</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userProperties.map((product) => (
                    <tr key={product.id} className="border">
                      <td className="p-2 border">
                        <img src={`https://www.tradesfairs.com/konnektglobe/public/storage/${product.banner_image}`} alt={product.name} className="w-12 h-12 object-cover" />
                      </td>
                      <td className="p-2 border">{product.name}</td>
                      <td className="p-2 border">₹{product.price}</td>
                      <td className="p-2 border">{product.category}</td>
                      <td className="p-2 border">
                        <span className={
                          product.status === "Active" ? "text-green-600" : "text-red-600"
                        }>
                          {product.status}
                        </span>
                      </td>
                      <td className="p-2 border">
                        <button onClick={() => setSelectedProduct(product)}
                        >
                          <Eye className="w-4 h-4" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                onClick={() => setSelectedProduct(null)}
              >
                <div className="bg-white p-6 w-96 relative">
                  <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-40 object-cover mt-2" />
                  <div className="mt-4">
                    <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
                    <p><strong>Min Order:</strong> {selectedProduct.minOrder} {selectedProduct.unit}</p>
                    <p><strong>Category:</strong> {selectedProduct.category}</p>
                    <p><strong>City:</strong> {selectedProduct.city}</p>
                    <p>
                      <strong>Status:</strong>
                      <span className={selectedProduct.status === "Active" ? "text-green-600" : "text-red-600"}>
                        {selectedProduct.status}
                      </span>
                    </p>
                    <button className="mt-4" onClick={() => setSelectedProduct(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
