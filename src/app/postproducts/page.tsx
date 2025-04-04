'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/AppProvider';
import { useRouter } from "next/navigation"; 

interface ProductType {
  id?: number,
  name: string,
  slug: string,
  price?: number,
  min_order?: number,
  unit?: string,
  category_id?: number,
  city?: string,
  file?: string,
  banner_image?: File | null
}

const categories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Furniture' },
  { id: '4', name: 'Toys' },
];

const PostProductForm: React.FC = () => {
  const { authToken } = useAuth();
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<ProductType>({
    name: '',
    slug: '',
    price: 0,
    min_order: 0,
    unit: '',
    category_id: 1,
    city: '',
    file: "",
    banner_image: null
  });
  const [banner, setBanner] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    return () => {
      if (banner) URL.revokeObjectURL(banner);
    };
  }, [banner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      slug: name === 'name' ? value.toLowerCase().replace(/\s+/g, '-') : prev.slug,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setBanner(URL.createObjectURL(file)); // Preview Image
    } else {
      setBanner(null); // Reset banner if no file is selected
    } // Preview Image
    setFormData((prevData) => ({
      ...prevData,
      banner_image: file // Store the actual file instead of URL
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate unit
      // const allowedUnits = ["Piece", "Kg", "Meter", "Ton", "Box"];
      // if (!allowedUnits.includes(formData.unit)) {
      //   return toast.error("Invalid unit selected!");
      // }

      // Validate category
      if (!formData.category_id) {
        return toast.error("Please select a category!");
      }

      // Prepare form data
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("slug", formData.slug?.trim() || formData.name.replace(/\s+/g, "-").toLowerCase());
      formDataToSend.append("price", formData.price?.toString() || "0");
      formDataToSend.append("min_order", formData.min_order?.toString() || "0");
      formDataToSend.append("unit", formData.unit || "");
      formDataToSend.append("category_id", formData.category_id.toString());
      formDataToSend.append("city", formData.city || "");

      // ✅ Ensure `banner_image` is a valid File before appending
      if (formData.banner_image instanceof File) {
        formDataToSend.append("banner_image", formData.banner_image);
      }

      // Send request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success response
      if (response.data.message) {
        toast.success(response.data.message);

        // ✅ Reset form after successful submission
        setFormData((prev) => ({
          ...prev,
          banner_image: null, // Reset image
        }));

        setBanner(null);

        // ✅ Ensure `fileRef.current` exists before resetting
        if (fileRef.current) {
          fileRef.current.value = "";
        }

        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        const axiosError = error as { response?: { status: number; data: { errors: Record<string, string[]> } } };
    
        if (axiosError.response?.status === 422) {
          const validationErrors = axiosError.response.data.errors;
          Object.values(validationErrors).forEach((err) => {
            if (Array.isArray(err)) {
              toast.error(err[0]);
            }
          });
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.log(error);
    }
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl pt-24">
      <h2 className="text-2xl font-semibold mb-4">Post a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="slug" placeholder="Slug" value={formData.slug} className="w-full p-2 border rounded bg-gray-100" readOnly />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="min_order" placeholder="Minimum Order" value={formData.min_order} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="unit" value={formData.unit} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Piece</option>
          <option>Kg</option>
          <option>Meter</option>
          <option>Ton</option>
          <option>Box</option>
        </select>
        <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full p-2 border rounded" required>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required />

        <div className="mb-2">
          {banner && (
            <Image
              src={banner}
              alt="Preview"
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>

        <input
          className="form-control mb-2"
          type="file"
          ref={fileRef}
          id="bannerInput"
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default PostProductForm;
