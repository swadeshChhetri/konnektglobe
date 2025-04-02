"use client";
import { createContext, useContext, useState } from "react";

const CityContext = createContext(null);

export function CityProvider({ children }) {

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
  return useContext(CityContext);
}
