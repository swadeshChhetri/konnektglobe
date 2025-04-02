"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserSidebar from "../../../components/UserSidebar";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../../../context/AppProvider";




export default function MyListings() {
  const [userProperties, setUserProperties] = useState([]);
  const { isLoading, authToken } = useAuth();
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
              <div key={property.id} className="bg-white shadow-md p-4 rounded-lg" onClick={() => handleClick(property.id)}>
                <img
                  src={`https://www.tradesfairs.com/konnektglobe/public/storage/${property.banner_image}`}
                  alt={property.title || "Property Image"}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-xl font-bold mt-2">{property.name}</h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-700">💰 ₹{property.price}</p>
                {property.category && <p className="text-blue-500 text-sm">{property.category}</p>}
                {property.property_type && <p className="text-green-500 text-sm">{property.property_type}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}