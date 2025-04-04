"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserSidebar from "../../../components/UserSidebar";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../../../context/AppProvider";

interface Product {
  id: number;
  name: string;
  banner_image: string;
  price: number;
  unit: 'Piece' | 'Kg' | 'Meter' | 'Ton' | 'Box';
  min_order: number;
  stock_quantity: number | null;
  category: string;
  city: string;
  is_featured: number; // 1 for true, 0 for false
  status: 'pending' | 'approved' | 'rejected';
}



export default function MyListings() {
  const [userProperties, setUserProperties] = useState<Product[]>([]);
  const { authToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user-myProducts`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            }
          }
        );

        const data = response.data;
        console.log(data);
        setUserProperties(data.products || []);


      } catch (error) {
        console.error("Error fetching myProducts data:", error);
        setUserProperties([]); 
      }
    }

    if (authToken) {
      fetchData();
    }
  }, [authToken]);



  const handleClick = (id: number) => {
    router.push(`/user/manageProducts/${id}`);
  };


  return (
    <div className="flex pt-16">
      <UserSidebar />
      <div className="p-4  w-[90%] ">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link href="/postproducts" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 max-md:hidden float-right">
          Post Property
        </Link>
        {userProperties?.length === 0 ? (
          <p>No properties found.</p>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-24">
          {userProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-md p-4 rounded-lg cursor-pointer hover:shadow-lg transition-all"
              onClick={() => handleClick(property.id)}
            >
              <div className="relative">
                <img
                  src={`https://www.tradesfairs.com/konnektglobe/public/storage/${property.banner_image}`}
                  alt={property.name || "Product Image"}
                  className="w-full h-40 object-cover rounded-md"
                />
                {property.is_featured === 1 && (
                  <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
        
              <h2 className="text-lg font-semibold mt-3 line-clamp-1">{property.name}</h2>
        
              <p className="text-sm text-gray-700 mt-1">
                ₹{property.price} / {property.unit}
              </p>
        
              <p className="text-sm text-gray-500">
                Min. Order: {property.min_order} {property.unit}(s)
              </p>
        
              {property.stock_quantity !== null && (
                <p className="text-sm text-green-600">In Stock: {property.stock_quantity}</p>
              )}
        
              <p className="text-sm text-gray-500 mt-1">{property.city}</p>
            </div>
          ))}
        </div>
        
        )}
      </div>
    </div>
  );
}