'use client';

import { motion } from 'framer-motion';
import { Search, Eye, Mail, CheckCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import UserSidebar from "../../../components/UserSidebar";
import axios from "axios";
import { useAuth } from "../../../context/AppProvider";

const InquiryHeader = () => {
  const { authToken } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [inquiries, setInquiries] = useState<any[]>([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user-dashboard`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        setTotalInquiries(data.total_inquiries || 0);

        // Fetch another route
        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/showinquiries`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const anotherData = response2.data;
        console.log("Another route data:", anotherData);
        setInquiries(anotherData);
        

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  const openModal = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInquiry(null);
  };


  const metrics = [
    { name: "Total Inquiries", value: totalInquiries },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      <UserSidebar />
      <motion.div
        className="flex-1 p-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-4">Manage Inquiries</h1>

        {/* Summary Metrics */}
        <div className="flex gap-4 mb-6">
          {[
            { title: 'Total Inquiries', count: totalInquiries, color: 'bg-red-200' },
          ].map((metric, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-4 rounded-lg flex-1 text-center shadow"
            >
              <h2 className="text-xl font-semibold">{metric.title}</h2>
              <p className="text-gray-500">{metric.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center border rounded-lg p-2 w-full md:w-1/2 bg-gray-50">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search inquiries..."
              className="bg-transparent focus:outline-none flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select className="border rounded-lg p-2 bg-gray-50 cursor-pointer" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="">All Dates</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>

          <select className="border rounded-lg p-2 bg-gray-50 cursor-pointer" value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
            <option value="">All Products</option>
            <option value="Product A">Product A</option>
            <option value="Product B">Product B</option>
          </select>

          <select className="border rounded-lg p-2 bg-gray-50 cursor-pointer" value={customerFilter} onChange={(e) => setCustomerFilter(e.target.value)}>
            <option value="">All Customers</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>

        {/* Inquiry Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Inquiry ID</th>
                <th className="p-3 border">Customer Name</th>
                <th className="p-3 border">Contact Info</th>
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="p-3 border">{inquiry.id}</td>
                  <td className="p-3 border">{inquiry.user_name}</td>
                  <td className="p-3 border">{inquiry.user_email}</td>
                  <td className="p-3 border">{inquiry.product_name}</td>
                  <td className="p-3 border">{inquiry.message}</td>
                  <td className="p-3 border text-yellow-500">{inquiry.status}</td>
                  <td className="p-3 border">{inquiry.created_at}</td>
                  <td className="p-3 border flex gap-2">
                    <button className="text-blue-500" onClick={() => openModal(inquiry)}>
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-green-500">
                      <Mail className="w-5 h-5" />
                    </button>
                    <button className="text-gray-500">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Inquiry Details Modal */}
        {/* {isModalOpen && selectedInquiry && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Inquiry Details</h2>
                <button onClick={closeModal} className="text-gray-500"><X className="w-5 h-5" /></button>
              </div>
              <p><strong>ID:</strong> {selectedInquiry.id}</p>
              <p><strong>Customer:</strong> {selectedInquiry.customer}</p>
              <p><strong>Contact:</strong> {selectedInquiry.contact}</p>
              <p><strong>Product:</strong> {selectedInquiry.product}</p>
              <p><strong>Message:</strong> {selectedInquiry.message}</p>
              <p><strong>Status:</strong> {selectedInquiry.status}</p>
              <p><strong>Date:</strong> {selectedInquiry.date}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Reply</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded">Mark as Resolved</button>
              </div>
            </div>
          </div>
        )} */}
      </motion.div>
    </div>
  );
};

export default InquiryHeader;

