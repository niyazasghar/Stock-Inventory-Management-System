"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, Filter } from "lucide-react";
import ActionToastButton from "@/app/components/ActionToastButton";

export default function ReportsPage() {
  const salesData = [
    { name: 'Week 1', sales: 4000, purchases: 2400 },
    { name: 'Week 2', sales: 3000, purchases: 1398 },
    { name: 'Week 3', sales: 2000, purchases: 9800 },
    { name: 'Week 4', sales: 2780, purchases: 3908 },
  ];

  const inventoryValueData = [
    { name: 'Electronics', value: 45000 },
    { name: 'Hardware', value: 22000 },
    { name: 'Medical', value: 18000 },
    { name: 'Grocery', value: 12000 },
  ];

  const COLORS = ['#2563eb', '#059669', '#d97706', '#dc2626'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header">Analytics & Reports</h1>
          <p className="page-header-sub">Operational insights across sales, purchases, and inventory.</p>
        </div>
        <div className="flex gap-2">
           <ActionToastButton message="Change Date Range" description="Simulated date picker open." className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-sm">
             <Calendar className="w-4 h-4" />
             Last 30 Days
           </ActionToastButton>
           <ActionToastButton message="Export PDF" description="Simulated report download." className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-sm">
             <Download className="w-4 h-4" />
             Export PDF
           </ActionToastButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Purchases Trend */}
        <div className="dashboard-card flex flex-col p-6">
          <div className="mb-6 flex justify-between items-start">
             <div>
               <h3 className="font-bold text-slate-900 text-lg">Order Volume Trend</h3>
               <p className="text-sm text-slate-500">Sales vs Purchases over the last 4 weeks.</p>
             </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="sales" name="Sales ($)" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="purchases" name="Purchases ($)" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Valuation Breakdown */}
        <div className="dashboard-card flex flex-col p-6">
          <div className="mb-6 flex justify-between items-start">
             <div>
               <h3 className="font-bold text-slate-900 text-lg">Inventory Valuation</h3>
               <p className="text-sm text-slate-500">Value of stock broken down by category.</p>
             </div>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center relative">
             <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
               <span className="text-sm text-slate-500 font-medium">Total Value</span>
               <span className="text-2xl font-bold text-slate-900">$97,000</span>
             </div>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={inventoryValueData}
                   cx="50%"
                   cy="50%"
                   innerRadius={80}
                   outerRadius={120}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {inventoryValueData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
               </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {inventoryValueData.map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                <span className="text-sm text-slate-600">{cat.name}</span>
                <span className="text-sm font-semibold text-slate-900 ml-auto">${cat.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
