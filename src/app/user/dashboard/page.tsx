'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UserSidebar from '../../../components/UserSidebar';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../../../utils/api";
import Image from 'next/image';

interface Product {
  id: number;
  banner_image: string;
  name: string;
  price: number;
  category: string;
  category_name: string;
  unit: string;
  status: string;
}

interface Inquiry {
  id: number;
  user_name: string;
  user_email: string;
  product_name: string;
  message: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalListedProducts, setTotalListedProducts] = useState(0);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [totalResolved, setTotalResolved] = useState(0);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [userProperties, setUserProperties] = useState<Product[]>([]);
  

  // Fetch inquiries and products from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Response 1: Dashboard data
        const response1 = await api.get('/user-dashboard');
        const data1 = response1.data;
        setTotalListedProducts(data1.total_listed_products || 0);
        setTotalInquiries(data1.total_inquiries || 0);
  
        // Response 2: Inquiries
        const response2 = await api.get('/showinquiries');
        const data2 = response2.data;
        console.log("Another route data:", data2);
        setInquiries(data2);
  
        const resolvedCount = data2.filter((inq: Inquiry) => inq.status === 'resolved').length;
        setTotalResolved(resolvedCount);
  
        // Response 3: Products
        const response3 = await api.get('/user-myProducts');
        const data3 = response3.data;
        setUserProperties(data3.products || []);
  
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
  
    fetchData();
  }, []);
  console.log(userProperties);

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
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          {[
            { title: 'Total Products Listed', count: totalListedProducts, color: 'bg-white' },
            { title: 'Total Inquiries Received', count: totalInquiries, color: 'bg-white' },
            { title: 'Total Customers Reached', count: totalResolved, color: 'bg-white' },
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
                  <tr className="bg-gray-100 border">
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Status</th>

                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 border">{inq.user_name}</td>
                      <td className="p-2 border">{inq.user_email}</td>
                      <td className="p-2 border">{inq.product_name}</td>
                      <td className={`p-2 border font-medium ${inq.status === "New" ? "text-red-500" : "text-green-500"}`}>{inq.status}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left border">
                    <th className="p-2 border">Image</th>
                    <th className="p-2 border">Product Name</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Product_unit</th>
                  </tr>
                </thead>
                <tbody>
                  {userProperties.map((product) => (
                    <tr key={product.id} className="border">
                      <td className="p-2 border">
                        <Image src={`http://127.0.0.1:8000/storage/${product.banner_image}`} alt={product.name}
                         width={500}
                         height={300}
                         className="w-12 h-12 object-cover" />
                      </td>
                      <td className="p-2 border">{product.name}</td>
                      <td className="p-2 border">₹{product.price}</td>
                      <td className="p-2 border">{product.category_name}</td>
                      <td className="p-2 border">{product.unit}</td>
                      {/* <td className="p-2 border">
                        <span className={
                          product.status === "Active" ? "text-green-600" : "text-red-600"
                        }>
                          {product.status}
                        </span>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
