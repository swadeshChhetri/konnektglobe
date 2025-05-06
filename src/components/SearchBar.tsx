"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Products"); // Default selection
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (searchType === "Products") {
        router.push(`/pages/products/list?search=${searchTerm}`);
      } else {
        router.push(`/pages/company/details?search=${searchTerm}`);
      }
    }
  };

  return (
    <div className="flex items-center border rounded-full px-2 py-2 w-[54%]">

      <select className="pl-1 text-sm text-light bg-dark focus:outline-none"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}>
        <option>Products</option>
        <option>Company</option>
      </select>

      <input
        type="text"
        placeholder={`Search ${searchType}`}
        className="flex-grow px-2 text-sm focus:outline-none text-light bg-dark w-[2%]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="ml-2  rounded-md" onClick={handleSearch}>
        <Search className="" size={20} />
      </button>
    </div>
  );
}
