"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle, Circle } from "lucide-react";
import { UploadCloud, MessageSquare } from 'lucide-react';
import { useDropzone } from 'react-dropzone';


const steps = [
  "Basic Details",
  "Location Details",
  "Property Profile",
  "Photos, Videos & Voice-over",
];

const PropertyForm = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  // ✅ Single formData state (merged both objects correctly)
  const [formData, setFormData] = useState({
    city: "",
    locality: "",
    subLocality: "",
    society: "",
    houseNumber: "",
    address: "",
    propertyType: "",
    propertySize: "",
    files: null as FileList | null,
    videoDescription: "",
    amenities: {
      parking: false,
      pool: false,
    },
    bhk: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    carpetArea: "",
    totalFloors: "",
    propertyFloor: "",
    availability: "",
    ownership: "",
    expectedPrice: "",
    pricePerSqFt: "",
    allInclusive: false,
    negotiable: false,
    description: "",
  });

  const [lookingTo, setLookingTo] = useState("Sell");
  const [propertyType, setPropertyType] = useState("Residential");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Record<string, string[]> = {
    Residential: [
      "Flat/Apartment",
      "Independent House / Villa",
      "Independent / Builder Floor",
      "Plot / Land",
      "1 RK/ Studio Apartment",
      "Serviced Apartment",
      "Farmhouse",
      "Other",
    ],
    Commercial: ["Office Space", "Shop", "Warehouse", "Showroom", "Other"],
  };

  // ✅ Fixed handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
  
    // Handle checkboxes separately
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : undefined;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  

  // ✅ Fixed handleFileChange function
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData((prev) => ({ ...prev, files: e.target.files }));
  //   }
  // };

  // const handleCategorySelection = (category: string) => {
  //   setSelectedCategory(category);
  //   setFormData((prev) => ({ ...prev, propertyType: category }));
  // };

  // ✅ Fixed handleCheckboxChange function
  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     amenities: { ...prev.amenities, [e.target.name]: e.target.checked },
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form Submitted Successfully!");
    router.push("/");
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const [files, setFiles] = useState<File[]>([]);
  
  const onDrop = (acceptedFile: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFile]);
  };
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {'image/*': [], 'video/*': []},
    maxSize: 10 * 1024 * 1024,
    multiple: true,
  });

  return (
    <div className="flex bg-gray-100 pt-16">
      {/* Sidebar */}
      <aside className="fixed left-0 h-full w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Post Your Property</h2>
        <div className="space-y-4">
          {steps.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index <= step ? (
                <CheckCircle className="text-blue-500" />
              ) : (
                <Circle className="text-gray-400" />
              )}
              <span className={index === step ? "text-blue-600 font-medium" : "text-gray-500"}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Form Section */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="w-3/4 p-8 bg-white shadow-md ml-96"
      >
        <button className="text-gray-600 mb-4" onClick={prevStep} disabled={step === 0}>
          &larr; Back
        </button>

        {step === 0 && (
          <div className="max-w-xl p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Welcome back Swadesh,</h2>
          <p className="text-lg text-gray-600 mb-4">Fill out basic details</p>
    
          <p className="font-medium mb-2">I&apos;m looking to</p>
          <div className="flex gap-2 mb-4">
            {["Sell", "Rent / Lease", "PG"].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-full border ${
                  lookingTo === option
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setLookingTo(option)}
              >
                {option}
              </button>
            ))}
          </div>
    
          <p className="font-medium mb-2">What kind of property do you have?</p>
          <div className="flex gap-4 mb-4">
            {["Residential", "Commercial"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-full border ${
                  propertyType === type
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setPropertyType(type)}
              >
                {type}
              </button>
            ))}
          </div>
    
          <div className="flex flex-wrap gap-2 mb-6">
            {categories[propertyType].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
    
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700" onClick={nextStep}>
            Continue
          </button>
        </div>
        )}

        {step === 1 && (
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-2xl font-bold mb-2">Where is your property located?</h1>
            <p className="text-gray-600 mb-6">An accurate location helps you connect with the right buyers</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "City", name: "city", required: true },
                { label: "Locality", name: "locality", required: true },
                { label: "Sub Locality (Optional)", name: "subLocality", required: false },
                { label: "Apartment / Society", name: "society", required: true },
                { label: "House No. (Optional)", name: "houseNumber", required: false },
              ].map(({ label, name, required }) => (
                <div key={name}>
                  <label className="block text-sm text-gray-700">{label}</label>
                  <input
                    type="text"
                    name={name}
                    // value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    required={required}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              ))}

              <button type="button" className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold" onClick={nextStep}>
                Continue
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-3xl p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Tell us about your property</h2>
            <form className="space-y-4">
              {/* BHK Selection */}
              <div>
                <label className="block font-medium">Your apartment is a</label>
                <div className="flex space-x-2 mt-2">
                  {["2 BHK", "3 BHK", "Other"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`px-4 py-2 border rounded ${formData.bhk === type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => setFormData({ ...formData, bhk: type })}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms, Bathrooms, Balconies */}
              <div>
                <label className="block font-medium">Number of Bedrooms</label>
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="border p-2 w-full mt-2" />
              </div>

              <div>
                <label className="block font-medium">Number of Bathrooms</label>
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="border p-2 w-full mt-2" />
              </div>

              {/* Area Details */}
              <div>
                <label className="block font-medium">Carpet Area (sq.ft.)</label>
                <input type="number" name="carpetArea" value={formData.carpetArea} onChange={handleChange} className="border p-2 w-full mt-2" />
              </div>

              {/* Floor Details */}
              <div>
                <label className="block font-medium">Total Floors</label>
                <input type="number" name="totalFloors" value={formData.totalFloors} onChange={handleChange} className="border p-2 w-full mt-2" />
              </div>

              {/* Availability & Ownership */}
              <div>
                <label className="block font-medium">Availability Status</label>
                <select name="availability" value={formData.availability} onChange={handleChange} className="border p-2 w-full mt-2">
                  <option value="">Select</option>
                  <option value="Ready to move">Ready to move</option>
                  <option value="Under construction">Under construction</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Ownership Type</label>
                <select name="ownership" value={formData.ownership} onChange={handleChange} className="border p-2 w-full mt-2">
                  <option value="">Select</option>
                  <option value="Freehold">Freehold</option>
                  <option value="Leasehold">Leasehold</option>
                  <option value="Co-operative society">Co-operative society</option>
                </select>
              </div>

              {/* Pricing Details */}
              <div>
                <label className="block font-medium">Expected Price (₹)</label>
                <input type="number" name="expectedPrice" value={formData.expectedPrice} onChange={handleChange} className="border p-2 w-full mt-2" />
              </div>

              <div>
                <label className="block font-medium">Price per sq.ft. (₹)</label>
                <input type="number" name="pricePerSqFt" value={formData.pricePerSqFt} onChange={handleChange} className="border p-2 w-full mt-2" />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" name="allInclusive" checked={formData.allInclusive} onChange={handleChange} />
                <label>All inclusive price</label>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" name="negotiable" checked={formData.negotiable} onChange={handleChange} />
                <label>Price Negotiable</label>
              </div>

              {/* Property Description */}
              <div>
                <label className="block font-medium">What makes your property unique?</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full mt-2" placeholder="Describe your property"></textarea>
              </div>

              {/* Submit Button */}
              <button   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={nextStep}>Post & Continue</button>
            </form>
          </div>
        )}

        {step === 3 && (
           <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg">
           <h2 className="text-xl font-semibold">Add photos of your property <span className="text-gray-500">(Optional)</span></h2>
           <p className="text-sm text-gray-600 mb-4">A picture is worth a thousand words. 87% of buyers look at photos before buying.</p>
           
           <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg cursor-pointer">
             <input {...getInputProps()} />
             <UploadCloud size={40} className="mx-auto text-gray-400" />
             <p className="mt-2 text-blue-600 font-semibold">+ Add at least 5 photos</p>
             <p className="text-xs text-gray-500">Drag and drop your photos/videos here<br />Up to 50 files • Max size 10MB • Formats: png, jpg, jpeg, gif, webp, mp4</p>
           </div>
           
           {files.length > 0 && (
             <div className="mt-4 space-y-2">
               {files.map((file, index) => (
                 <p key={index} className="text-sm text-gray-700">{file.name}</p>
               ))}
             </div>
           )}
           
           <div className="mt-6 bg-blue-50 p-4 rounded-lg">
             <p className="text-sm font-medium">Now you can also upload photos directly from your phone</p>
             <div className="mt-2 space-y-2">
               <button className="w-full flex items-center gap-2">
                 {/* <Whatsapp className="text-green-500" size={18} /> Send photos over WhatsApp */}
               </button>
               <button className="w-full flex items-center gap-2">
                 <MessageSquare className="text-blue-500" size={18} /> Get photo upload link over SMS
               </button>
             </div>
           </div>
           
           <div className="mt-6 text-center">
             <p className="text-xs text-gray-500">Without photos, your ad will be ignored by buyers</p>
             <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSubmit}>Continue without Photos</button>
           </div>
         </div>
        )}



      </motion.div>
    </div>
  );
};

export default PropertyForm;


