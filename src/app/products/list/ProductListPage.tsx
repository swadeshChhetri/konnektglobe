"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "../../data/products";
import Link from "next/link";
import Image from "next/image";
import { useCity } from "@/context/CityContext";

export default function ProductListPage() {
  const { selectedCity } = useCity();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [filteredProducts, setFilteredProducts] = useState<
  { id: number; name: string; price: number; image: string; category: string; city: string }[]
>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let filtered = products;

    // Apply city filter (if city is not "All Cities")
    if (selectedCity !== "All Cities") {
      filtered = filtered.filter((product) => product.city === selectedCity);
    }

    // Apply search filter (category) if searchQuery is not empty
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setIsLoading(false);
  }, [searchQuery, selectedCity]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="pt-24 px-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-sm bg-white">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover mb-2"
                />
              </Link>
              <p className="font-semibold text-sm mb-1">{product.name}</p>
              <p className="text-gray-600 text-sm">₹ {product.price} / Piece</p>

              {/* Buttons */}
              <div className="mt-3 flex gap-2 w-full">
                <button
                  className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 text-sm rounded-md"
                  aria-label="View contact number"
                >
                  View Number
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white px-3 py-2 text-sm rounded-md"
                  aria-label="Contact supplier"
                >
                  Contact Supplier
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found for &quot;{searchQuery}&quot; in {selectedCity}.</p>
        )}
      </div>
    </div>
  );
}