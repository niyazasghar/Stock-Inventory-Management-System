"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Package, BarChart3, Settings, Users, 
  Truck, Box, ArrowRightLeft, FileText, Building2, Bell, Search, Menu
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ActionToastButton from "@/app/components/ActionToastButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState("Admin");

  const navigation = [
    { name: "Overview", href: "/overview", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    { name: "Inventory", href: "/inventory", icon: Box },
    { name: "Stock Movement", href: "/stock-movement", icon: ArrowRightLeft },
    { name: "Warehouses", href: "/warehouses", icon: Building2 },
    { name: "Purchase Orders", href: "/purchase-orders", icon: Truck },
    { name: "Sales Orders", href: "/sales-orders", icon: Package },
    { name: "Invoices", href: "/invoices", icon: FileText },
    { name: "Suppliers", href: "/suppliers", icon: Users },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Reports", href: "/reports", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col
      `}>
        <div className="h-16 flex items-center px-6 font-bold text-xl text-white border-b border-slate-800 shrink-0 gap-2">
          <Box className="w-6 h-6 text-blue-500" />
          StockOps
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 shrink-0">
           <Link
             href="/settings"
             className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
           >
             <Settings className="w-5 h-5 text-slate-400" />
             Settings
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shrink-0 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center bg-slate-100 px-3 py-2 rounded-lg max-w-md w-full focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 border border-transparent transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search products, orders, SKUs..." 
                className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-slate-900 placeholder:text-slate-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mock Role Switcher */}
            <div className="hidden md:flex items-center gap-2 mr-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role View:</span>
              <select 
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="text-sm border-slate-200 rounded-md bg-slate-50 text-slate-700 py-1 pl-2 pr-8 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Admin</option>
                <option>Warehouse Manager</option>
                <option>Sales</option>
                <option>Purchasing</option>
              </select>
            </div>

            <ActionToastButton message="Notifications" description="You have no new notifications." className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </ActionToastButton>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <Avatar className="w-8 h-8 cursor-pointer border border-slate-200">
              <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
