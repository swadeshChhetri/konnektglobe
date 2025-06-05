'use client';

import { motion } from 'framer-motion';
import {Eye} from 'lucide-react';
import { useState, useEffect } from 'react';
import UserSidebar from "../../../components/UserSidebar";
import { useAuth } from "../../../context/AppProvider";
import api from "../../../utils/api";

interface Inquiry {
  id: number;
  user_name: string;
  user_email: string;
  product_name: string;
  message: string;
  status: string;
  created_at: string;
}

const InquiryHeader = () => {
  const { authToken } = useAuth();
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const openModal = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInquiry(null);
    setIsModalOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // First request: Dashboard info
        const response = await api.get('/user-dashboard');
        const data = response.data;
        setTotalInquiries(data.total_inquiries || 0);
  
        // Second request: Inquiries
        const response2 = await api.get('/showinquiries');
        const anotherData = response2.data;
        setInquiries(anotherData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
  
    if (authToken) {
      fetchData();
    }
  }, [authToken]);
  
  const markAsResolved = async (id: number) => {
    try {
      await api.put(`/inquiries/${id}`, { status: 'resolved' });
  
      // Update local state after marking as resolved
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status: 'resolved' } : inquiry
        )
      );
  
      closeModal();
    } catch (error) {
      console.error("Error marking as resolved:", error);
    }
  };


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
        <div className="flex gap-4 mb-6 ">
          {[
            { title: 'Total Inquiries', count: totalInquiries, color: 'bg-red-200' },
          ].map((metric, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg flex-1 text-center shadow bg-white"
            >
              <h2 className="text-xl font-semibold">{metric.title}</h2>
              <p className="text-gray-500">{metric.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Inquiry Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md">
            <thead>
              <tr className="">
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
                  {/* <td className="p-3 border text-yellow-500">{inquiry.status}</td> */}
                  <td className={`p-2 border font-medium ${inquiry.status === "New" ? "text-red-500" : "text-green-500"}`}>{inquiry.status}</td>
                  <td className="p-3 border">{inquiry.created_at}</td>
                  <td className="p-3 border flex gap-2">
                    <button className="text-blue-500"
                      onClick={() => openModal(inquiry)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Inquiry Details Modal */}
        {isModalOpen && selectedInquiry && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Inquiry Details</h2>
                <button onClick={closeModal} className="text-gray-500">X</button>
              </div>
              <p><strong>ID:</strong> {selectedInquiry.id}</p>
              <p><strong>Customer Name:</strong> {selectedInquiry.user_name}</p>
              <p><strong>Contact:</strong> {selectedInquiry.user_email}</p>
              <p><strong>Product:</strong> {selectedInquiry.product_name}</p>
              <p><strong>Message:</strong> {selectedInquiry.message}</p>
              <p><strong>Status:</strong> {selectedInquiry.status}</p>
              <p><strong>Date:</strong> {selectedInquiry.created_at}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => markAsResolved(selectedInquiry.id)}>Mark as Resolved</button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InquiryHeader;

