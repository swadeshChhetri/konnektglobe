import type { Metadata } from "next";
import {  Montserrat, Noto_Serif } from "next/font/google";
import { AppProvider } from "../context/AppProvider";
import { CityProvider } from '../context/CityContext';
import Header from '../components/Navbar';
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";

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
  icons: {
    icon: '/favicon.ico', // This is your small browser icon
  },
  openGraph: {
    images: [
      {
        url: '/og-image.png', // Replace this with the path to your sharing image
        width: 1200,
        height: 630,
        alt: 'My website open graph image',
      },
    ],
  },
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
          </CityProvider>
        </AppProvider>
      </body>
    </html>
  );
}


