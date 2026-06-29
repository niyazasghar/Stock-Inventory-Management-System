import React from "react";
import { Search, Filter, Plus, FileText, Download } from "lucide-react";
import ActionToastButton from "@/app/components/ActionToastButton";

export default function PurchaseOrdersPage() {
  // Mock data for UI case study
  const orders = [
    { id: 'PO-24091', supplier: 'Apex Wholesale Co.', date: 'Oct 12, 2024', expected: 'Oct 19, 2024', items: 2, total: 1250.00, status: 'APPROVED' },
    { id: 'PO-24092', supplier: 'BuildMax Materials', date: 'Oct 10, 2024', expected: 'Oct 15, 2024', items: 5, total: 3400.00, status: 'RECEIVED' },
    { id: 'PO-24093', supplier: 'FreshLine Suppliers', date: 'Oct 14, 2024', expected: 'Oct 21, 2024', items: 1, total: 450.00, status: 'DRAFT' },
    { id: 'PO-24094', supplier: 'Apex Wholesale Co.', date: 'Sep 28, 2024', expected: 'Oct 05, 2024', items: 12, total: 8900.00, status: 'RECEIVED' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'APPROVED': return 'bg-blue-100 text-blue-800';
      case 'RECEIVED': return 'bg-emerald-100 text-emerald-800';
      case 'DRAFT': return 'bg-slate-100 text-slate-800';
      case 'SENT': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header">Purchase Orders</h1>
          <p className="page-header-sub">Manage supplier orders and receiving workflows.</p>
        </div>
        <ActionToastButton message="Create Purchase Order" description="Simulated opening Create PO modal." className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create PO
        </ActionToastButton>
      </div>

      <div className="flex gap-4 border-b border-slate-200 overflow-x-auto pb-px">
        {['All Orders', 'Drafts', 'Pending Approval', 'Expected Soon', 'Completed'].map((tab, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-2 text-sm font-medium border-b-2 transition-colors ${i === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="dashboard-card flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg max-w-sm w-full focus-within:border-blue-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search by PO number or supplier..." 
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
                <th className="px-6 py-4">PO Number</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4">Expected Date</th>
                <th className="px-6 py-4 text-right">Total Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {orders.map((po, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{po.id}</td>
                  <td className="px-6 py-4 text-slate-700">{po.supplier}</td>
                  <td className="px-6 py-4 text-slate-500">{po.date}</td>
                  <td className="px-6 py-4 text-slate-500">{po.expected}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">${po.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase ${getStatusColor(po.status)}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionToastButton message="View PO Details" description="Simulated navigation to PO detail view." className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors inline-flex items-center gap-1.5">
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
