"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the Category type
interface Category {
  name: string;
  image: string;
}

// Define props for the CategorySlider component
interface CategorySliderProps {
  categories: Category[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  const [index, setIndex] = useState(0);

  const slideLeft = () => setIndex((prev) => Math.max(prev - 1, 0));
  const slideRight = () =>
    setIndex((prev) => Math.min(prev + 1, categories.length - 3));

  return (
    <>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4 w-fit"
          animate={{ x: `-${index * 220}px` }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              className="w-[200px] h-[200px] flex flex-col items-center border rounded-lg p-4 shadow-md bg-white"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                width={80}
                height={80}
                className="mb-2"
              />
              <p className="text-sm text-center">{cat.name}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Left Arrow Button */}
      {index > 0 && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          onClick={slideLeft}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Right Arrow Button */}
      {index < categories.length - 3 && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          onClick={slideRight}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

