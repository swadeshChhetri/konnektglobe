"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CityProviderProps {
  children: ReactNode;
}

const CityContext = createContext<{
  citiesData: { name: string; districts: string[] }[];
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  selectedDistrict: string;
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);


export function CityProvider({ children }: CityProviderProps) {

  const citiesData = [
    { name: "Delhi", districts: ["Central Delhi", "South Delhi", "North Delhi"] },
    { name: "Mumbai", districts: ["Andheri", "Borivali", "Dadar"] },
    { name: "Bengaluru", districts: ["Indiranagar", "Koramangala", "Whitefield"] },
    { name: "Chennai", districts: ["Anna Nagar", "T. Nagar", "Velachery"] },
  ];

  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  return (
    <CityContext.Provider value={{  citiesData, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict}}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}
