import React from "react";
import { Search, Filter, Plus, FileText } from "lucide-react";
import ActionToastButton from "@/app/components/ActionToastButton";

export default function SalesOrdersPage() {
  // Mock data for UI case study
  const orders = [
    { id: 'SO-54031', customer: 'UrbanMart Retail', date: 'Oct 14, 2024', items: 3, total: 900.00, status: 'PROCESSING' },
    { id: 'SO-54032', customer: 'PrimeCare Supplies', date: 'Oct 13, 2024', items: 12, total: 4200.00, status: 'SHIPPED' },
    { id: 'SO-54033', customer: 'NovaStyle Commerce', date: 'Oct 12, 2024', items: 1, total: 150.00, status: 'DELIVERED' },
    { id: 'SO-54034', customer: 'GreenNest Interiors', date: 'Oct 10, 2024', items: 5, total: 1800.00, status: 'NEW' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-emerald-100 text-emerald-800';
      case 'NEW': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header">Sales Orders</h1>
          <p className="page-header-sub">Manage customer orders and fulfillment workflows.</p>
        </div>
        <ActionToastButton message="Create Sales Order" description="Simulated opening Create SO modal." className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Sales Order
        </ActionToastButton>
      </div>

      <div className="dashboard-card flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg max-w-sm w-full focus-within:border-blue-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search by SO number or customer..." 
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-slate-900"
            />
          </div>
          <ActionToastButton message="Filter Orders" description="Simulated opening filter drawer." className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white">
            <Filter className="w-4 h-4 text-slate-500" />
            Filters
          </ActionToastButton>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">SO Number</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Order Date</th>
                <th className="px-6 py-4 text-right">Items</th>
                <th className="px-6 py-4 text-right">Total Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {orders.map((so, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{so.id}</td>
                  <td className="px-6 py-4 text-slate-700">{so.customer}</td>
                  <td className="px-6 py-4 text-slate-500">{so.date}</td>
                  <td className="px-6 py-4 text-right text-slate-500">{so.items}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">${so.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase ${getStatusColor(so.status)}`}>
                      {so.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionToastButton message="View SO Details" description="Simulated navigation to SO detail view." className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors inline-flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> View
                    </ActionToastButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
