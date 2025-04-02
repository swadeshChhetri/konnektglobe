'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

export default function InquiryModal({ productName = 'Unknown Product', mobileNumber, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-xl shadow-xl w-96"
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">{step === 1 ? 'Enter Your Details' : 'Contact Number'}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        {step === 1 ? (
          <div className="mt-4">
            <p className="text-sm text-gray-600">* All fields are mandatory</p>
            <div className="flex flex-col gap-3 mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="intent" value="buy" onChange={() => setSelectedOption('buy')} className="accent-blue-500" />
                I want to Buy
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="intent" value="sell" onChange={() => setSelectedOption('sell')} className="accent-blue-500" />
                I want to Sell
              </label>
            </div>
            <div className="mt-3">
              <label className="text-sm text-gray-600">Product Name</label>
              <div className="w-full border rounded-lg p-2 mt-1 bg-gray-100 text-gray-900">{productName}</div>
            </div>
            <button 
              onClick={() => selectedOption && setStep(2)} 
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <p className="text-gray-600">You can contact the supplier at:</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">{mobileNumber}</p>
            <button 
              onClick={() => setStep(1)} 
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg mt-4 hover:bg-gray-300"
            >
              Back
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}


