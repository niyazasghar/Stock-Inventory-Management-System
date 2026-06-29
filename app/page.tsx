"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Box, Package, Shield, Truck, Settings, Users, LogIn } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-slate-200">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Box className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl tracking-tight">StockOps</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <Link href="#features" className="hover:text-blue-600 transition">Features</Link>
              <Link href="#workflow" className="hover:text-blue-600 transition">Workflow</Link>
              <Link href="#roles" className="hover:text-blue-600 transition">Roles</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/overview"
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition flex items-center gap-2"
              >
                View Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase border border-blue-100">
          A DevShuttle Lab Build
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
          Control inventory, orders, warehouses, and invoices <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">without spreadsheet chaos.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          StockOps helps growing product businesses track stock, manage orders, monitor warehouses, handle invoices, and understand operations from one clean dashboard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/overview"
            className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-medium hover:bg-blue-700 transition w-full sm:w-auto flex justify-center items-center gap-2 shadow-sm shadow-blue-200"
          >
            View Demo Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#features"
            className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl text-base font-medium hover:bg-slate-50 transition w-full sm:w-auto flex justify-center items-center"
          >
            Explore Inventory Flow
          </Link>
        </div>

        {/* Mockup Preview Area */}
        <div className="mt-20 relative mx-auto max-w-6xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent z-10 h-full pointer-events-none rounded-2xl" />
          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden aspect-[16/9] relative flex items-center justify-center bg-slate-50">
             <div className="absolute inset-0 p-2 md:p-4">
               {/* Simplified Mockup Representation */}
               <div className="w-full h-full rounded-xl border border-slate-100 bg-white flex flex-col overflow-hidden shadow-sm">
                  {/* Topbar */}
                  <div className="h-12 border-b flex items-center px-4 justify-between bg-slate-50/50">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                     </div>
                     <div className="h-6 w-48 bg-white border rounded text-xs flex items-center px-2 text-slate-400">Search products, orders...</div>
                  </div>
                  {/* Main */}
                  <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-48 border-r bg-slate-50 hidden md:block p-4 space-y-2">
                       {[...Array(6)].map((_,i) => <div key={i} className="h-8 rounded bg-slate-100 w-full mb-1"></div>)}
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col gap-4">
                       <div className="flex gap-4">
                         {[...Array(4)].map((_,i) => (
                           <div key={i} className="flex-1 h-24 rounded-xl border bg-white shadow-sm p-4 flex flex-col justify-between">
                              <div className="w-8 h-8 rounded bg-blue-50"></div>
                              <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                           </div>
                         ))}
                       </div>
                       <div className="flex-1 rounded-xl border bg-white shadow-sm"></div>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Inventory gets messy when products, orders, and warehouses are tracked manually.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Stock levels are updated late or incorrectly",
              "Teams rely on spreadsheets and WhatsApp updates",
              "Low-stock items are noticed too late",
              "Purchase orders and sales orders are disconnected",
              "Warehouse visibility is poor",
              "Invoices and payments are hard to track",
            ].map((problem, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-bold text-sm">✕</span>
                </div>
                <p className="text-slate-700 font-medium">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            One platform for products, stock movement, orders, warehouses, invoices, and reporting.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {[
            { icon: Package, title: "Product Catalogue", desc: "Manage SKUs, categories, and pricing." },
            { icon: BarChart3, title: "Stock Level Tracking", desc: "Real-time visibility across warehouses." },
            { icon: Shield, title: "Low-Stock Alerts", desc: "Never run out of high-demand items." },
            { icon: Truck, title: "Purchase Orders", desc: "Automate supplier purchasing." },
            { icon: Box, title: "Sales Orders", desc: "Process fulfillment effortlessly." },
            { icon: Settings, title: "Warehouse Management", desc: "Track capacity and locations." },
            { icon: Users, title: "Role-Based Access", desc: "Control who sees what data." },
            { icon: BarChart3, title: "Analytics & Reports", desc: "Data-driven operational insights." }
           ].map((feat, i) => (
             <div key={i} className="p-6 rounded-2xl bg-white border shadow-sm hover:shadow-md transition">
               <feat.icon className="w-10 h-10 text-blue-600 mb-4 stroke-[1.5]" />
               <h3 className="font-semibold text-slate-900 mb-2">{feat.title}</h3>
               <p className="text-sm text-slate-600">{feat.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold mb-16 text-center">Clear Operational Workflow</h2>
           <div className="relative">
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 hidden md:block"></div>
             <div className="grid md:grid-cols-5 gap-8 relative z-10">
               {[
                 "1. Add products & suppliers",
                 "2. Receive stock to warehouse",
                 "3. Create sales or purchase orders",
                 "4. Track movement & invoices",
                 "5. Monitor reports & alerts"
               ].map((step, i) => (
                 <div key={i} className="text-center">
                   <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 border-4 border-slate-900 font-bold">
                     {i + 1}
                   </div>
                   <p className="text-sm font-medium text-slate-300">{step.split('. ')[1]}</p>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* Inventory Control Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-center">
         <div className="flex-1">
           <h2 className="text-3xl font-bold text-slate-900 mb-6">
             Know what is in stock, what is running low, and what needs action.
           </h2>
           <ul className="space-y-4">
             {[
               "Low-stock queue & reorder recommendations",
               "Stock movement timeline",
               "Warehouse-wise stock distribution",
               "Damaged and returned stock records"
             ].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-slate-700">
                 <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                   <ArrowRight className="w-3 h-3" />
                 </div>
                 {item}
               </li>
             ))}
           </ul>
         </div>
         <div className="flex-1 w-full bg-slate-50 rounded-2xl border p-8 flex items-center justify-center min-h-[300px]">
             {/* Abstract UI representation */}
             <div className="w-full space-y-4">
                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2 px-2">
                  <span>Product</span>
                  <span>Stock</span>
                  <span>Status</span>
                </div>
                {[
                  { name: "Wireless Scanner", stock: "45", status: "In Stock", color: "bg-emerald-100 text-emerald-700" },
                  { name: "Steel Door Handle", stock: "12", status: "Low Stock", color: "bg-amber-100 text-amber-700" },
                  { name: "Organic Rice Pack", stock: "0", status: "Out of Stock", color: "bg-red-100 text-red-700" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white border shadow-sm">
                    <span className="font-medium text-slate-900 text-sm">{row.name}</span>
                    <span className="text-slate-600 text-sm">{row.stock}</span>
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${row.color}`}>{row.status}</span>
                  </div>
                ))}
             </div>
         </div>
      </section>

      {/* Role-Based Access Section */}
      <section id="roles" className="py-24 bg-slate-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Built for the whole team</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { role: "Admin", desc: "Full access to all modules, settings, and reports." },
                { role: "Warehouse Manager", desc: "Manage inventory, warehouses, movements, and alerts." },
                { role: "Sales Team", desc: "Handle customers, sales orders, and invoices." },
                { role: "Purchase Manager", desc: "Manage suppliers, purchase orders, and receiving." },
              ].map((r, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">{r.role}</h3>
                  <p className="text-sm text-slate-600">{r.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section className="py-24 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">See how StockOps manages real inventory operations.</h2>
        <p className="text-xl text-slate-600 mb-10">
          Explore the demo dashboard to see how products, warehouses, orders, invoices, and stock alerts connect in one platform.
        </p>
        <Link
          href="/overview"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          View Demo Dashboard
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-6">
            <Box className="w-6 h-6 text-slate-500" />
            <span className="font-bold text-lg text-slate-300">StockOps</span>
          </div>
          <p className="text-sm max-w-2xl mx-auto mb-6">
            StockOps is a DevShuttle Lab Build created to demonstrate inventory workflow automation, dashboard development, order management, and internal business software.
          </p>
          <div className="text-xs">
             &copy; {new Date().getFullYear()} DevShuttle. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
