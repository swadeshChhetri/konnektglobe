import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image?: string;
  category?: string;
  price: string;
  originalPrice?: string;
  discount?: string;
}

interface ProductCardProps {
  product: Product;
  section: string;
}

const ProductCard = ({ product, section }: ProductCardProps) => {
  const imageUrl = product.image || "https://via.placeholder.com/300";
  const [showNumber, setShowNumber] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const mobileNumber = "98765 43210"; // Replace with

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);

      // Stop shaking after 1 second
      setTimeout(() => setIsShaking(false), 1000);
    }, 2000); // Every 2 seconds (1s shake + 1s pause)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Link
      href={`/${section}/${product.id}`}
      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative w-full h-64 overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-gray-700">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-green-600">
            {product.price}
          </span>
          {product.discount && (
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice}
            </span>
          )}
        </div>
        {product.discount && (
          <p className="text-sm text-red-500 font-semibold">
            {product.discount}
          </p>
        )}

        <div className="flex flex-col items-center gap-4">
          {/* View Mobile Number Button */}
          <button className="btn btn-outline btn-primary flex gap-2 items-center">
            {/* Shaking Phone Icon (Shake for 1s, Pause for 1s) */}
            <motion.span
              animate={isShaking ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <PhoneCall className="w-5 h-5" />
            </motion.span>
            View Mobile Number
          </button>

          {/* Contact Supplier Button */}
          <button className="btn btn-secondary w-full md:w-auto">
            Contact Supplier
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
