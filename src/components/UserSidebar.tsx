'use client';

import { useState } from 'react';
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MailQuestion, Package, Settings } from "lucide-react";





const navItems = [
  { id: "dashboard", icon: LayoutDashboard, href: "/user/dashboard" },
  { id: "inquiry", icon: MailQuestion, href: "/user/manageInquiry" },
  { id: "products", icon: Package, href: "/user/manageProducts" },
  { id: "settings", icon: Settings, href: "/user/profileSetting" },
];

  const UserSidebar = () => {
    const pathname = usePathname();
  // const [active, setActive] = useState('Dashboard');

  return (
  //  {/* Sidebar */}
    <div className="w-24 min-h-screen bg-white shadow-lg p-5 pt-24">
      <ul>
        {navItems.map((item) => (
          <li key={item.id}> {/* Key should be here */}
            <Link
              href={item.href}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
                pathname === item.href ? 'bg-orange-200 text-orange-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
           
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserSidebar;