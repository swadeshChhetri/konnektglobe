'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import axios from "axios";
import { useAuth } from "../context/AppProvider";
import { toast } from "react-hot-toast";

interface InquiryFormModalProps {
  productId: number;
  sellerId: number;
  productName: string;
  onClose: () => void;
}

export default function InquiryFormModal({
  productId,
  productName,
  onClose,
}: InquiryFormModalProps) {
  const [step, setStep] = useState(1);
  const { authToken, logout } = useAuth();
  // const [selectedOption, setSelectedOption] = useState<string>("");
  const [requirement, setRequirement] = useState('one-time');
  const [sendToOthers, setSendToOthers] = useState(false);
  const [lookingForLoan, setLookingForLoan] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderValue, setOrderValue] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Sending inquiry data to the server
      const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/inquiries`, {
        product_id: productId,
        user_name: buyerName,
        user_email: buyerEmail,
        message,
        quantity,
        approx_order_value: orderValue,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Ensure you have authToken
          "Content-Type": "application/json",
        },
      }
      );
      if (response.data.message) {
        toast.success("Inquiry submitted successfully!");
      }
      setFeedback("Inquiry submitted successfully!");
      // Optionally close the modal after a delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setFeedback("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-xl shadow-xl w-96"
      >
        {step === 1 && (
          <>
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Submit Your Inquiry</h2>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">Adding details helps suppliers respond quickly.</p>
              <div className="mt-3 border p-3 rounded-lg bg-gray-100">
                <p className="text-sm font-medium text-gray-800">{productName}</p>
                <textarea
                  className="w-full mt-2 p-2 border rounded-lg"
                  defaultValue={`Hi, I am interested in ${productName}.`}
                />
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-800">Requirement Frequency</p>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="requirement" value="one-time" checked={requirement === 'one-time'} onChange={() => setRequirement('one-time')} />
                    One-Time
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="requirement" value="recurring" checked={requirement === 'recurring'} onChange={() => setRequirement('recurring')} />
                    Recurring
                  </label>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={sendToOthers} onChange={() => setSendToOthers(!sendToOthers)} />
                  Would you like to send this inquiry to other suppliers of similar products?
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={lookingForLoan} onChange={() => setLookingForLoan(!lookingForLoan)} />
                  Looking for a loan.
                </label>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="max-h-[80vh] overflow-y-auto p-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Additional Details</h2>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                <X size={20} />
              </button>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Quantity*</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg mt-2"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />

              <label className="text-sm font-medium mt-4 block">Approximate Order Value*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg mt-2"
                placeholder="Enter value in INR"
                value={orderValue}
                onChange={(e) => setOrderValue(Number(e.target.value))}
              />

              <label className="text-sm font-medium mt-4 block">Your Name*</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg mt-2"
                placeholder="Enter your name"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
              />

              <label className="text-sm font-medium mt-4 block">Your Email*</label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg mt-2"
                placeholder="Enter your email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                required
              />

              <label className="text-sm font-medium mt-4 block">Message*</label>
              <textarea
                className="w-full p-2 border rounded-lg mt-2"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 flex items-center justify-center gap-2 hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Inquiry"}
            </button>
          </div>
        )}

        {step === 3 && (
          <>
            <div className="flex justify-center items-center flex-col">
              <CheckCircle size={48} className="text-green-500" />
              <h2 className="text-lg font-semibold mt-4">Inquiry Submitted Successfully!</h2>
              <p className="text-sm text-gray-600 mt-2 text-center">Thank you for your inquiry. Suppliers will reach out to you soon.</p>
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

