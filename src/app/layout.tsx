import type { Metadata } from "next";
import { CityProvider } from '../context/CityContext';
import "./styles/globals.css";
import {  Montserrat, Noto_Serif } from "next/font/google";
import { AppProvider } from "../context/AppProvider";
import Header from '../components/Navbar';
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "CRUD Based Next js App with Laravel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${montserrat.variable} ${notoSerif.variable}`}>
      <body className='min-h-screen bg-gray-100'>
        <AppProvider>
          <CityProvider>
            <Toaster />
            <Header />
            {children}
            {/* {showHeaderFooter && <Footer />} */}
          </CityProvider>
        </AppProvider>
      </body>
    </html>
  );
}



