"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import SkeletonProduct from "../../components/SkeletonProduct";

interface Product {
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

// Define TypeScript interface for a product
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then((response) => {
        setProducts(response.data.products);
        setIsLoading(false); // Set loading to false after data is loaded
        console.log(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="pt-24 px-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array(8) // Show 8 skeleton loaders while loading
            .fill(null)
            .map((_, index) => <SkeletonProduct key={index} />)
          : products.map((product: Product) => (
            <div key={product.id} className="border p-4 rounded shadow-sm bg-white">
              <Link href={`/products/${product.id}`}>
                {
                  product.banner_image ? (
                    <img
                    src={`https://www.tradesfairs.com/konnektglobe/public/storage/${product.banner_image}`}
                      alt={product.name}
                      width={200}
                      height={128}
                      className="w-full h-32 object-cover mb-2"
                    />
                  ) : "No Image"
                }
              </Link>
              <p className="font-semibold text-sm mb-1">{product.name}</p>
              <p className="text-gray-600 text-sm">₹ {product.price} / Piece</p>

              {/* Buttons */}
              <div className="mt-3 flex gap-2 w-full">
                <button className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 text-sm rounded-md">
                  View Number
                </button>
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 text-sm rounded-md">
                  Contact Supplier
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
