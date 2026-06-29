import React from "react";
import { Search, Filter, FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import ActionToastButton from "@/app/components/ActionToastButton";

export default function InvoicesPage() {
  const invoices = [
    { id: 'INV-88012', type: 'SALES', entity: 'UrbanMart Retail', date: 'Oct 14, 2024', due: 'Nov 14, 2024', amount: 900.00, status: 'PENDING' },
    { id: 'INV-88013', type: 'PURCHASE', entity: 'Apex Wholesale Co.', date: 'Oct 12, 2024', due: 'Nov 12, 2024', amount: 1250.00, status: 'PAID' },
    { id: 'INV-88014', type: 'SALES', entity: 'PrimeCare Supplies', date: 'Sep 30, 2024', due: 'Oct 30, 2024', amount: 4200.00, status: 'PAID' },
    { id: 'INV-88015', type: 'SALES', entity: 'NovaStyle Commerce', date: 'Sep 10, 2024', due: 'Oct 10, 2024', amount: 150.00, status: 'OVERDUE' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Invoices & Billing</h1>
        <p className="page-header-sub">Track payments, receivables, and payables.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <div className="dashboard-card p-5 border-l-4 border-l-emerald-500">
           <p className="text-sm font-medium text-slate-500 mb-1">Paid This Month</p>
           <h3 className="text-2xl font-bold text-slate-900">$5,450.00</h3>
         </div>
         <div className="dashboard-card p-5 border-l-4 border-l-amber-500">
           <p className="text-sm font-medium text-slate-500 mb-1">Pending Receivables</p>
           <h3 className="text-2xl font-bold text-slate-900">$900.00</h3>
         </div>
         <div className="dashboard-card p-5 border-l-4 border-l-red-500">
           <p className="text-sm font-medium text-slate-500 mb-1">Overdue Invoices</p>
           <h3 className="text-2xl font-bold text-slate-900">$150.00</h3>
         </div>
      </div>

      <div className="dashboard-card flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg max-w-sm w-full focus-within:border-blue-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search invoices by ID or entity..." 
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-slate-900"
            />
          </div>
          <ActionToastButton message="Filter Invoices" description="Simulated opening filter drawer." className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white">
            <Filter className="w-4 h-4 text-slate-500" />
            Filters
          </ActionToastButton>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Invoice Number</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Customer/Supplier</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {inv.id}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold tracking-wide uppercase ${inv.type === 'SALES' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                      {inv.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{inv.entity}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.due}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">${inv.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {inv.status === 'PAID' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3" /> Paid</span>}
                    {inv.status === 'PENDING' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-800"><Clock className="w-3 h-3" /> Pending</span>}
                    {inv.status === 'OVERDUE' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800"><AlertCircle className="w-3 h-3" /> Overdue</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionToastButton message="Download PDF" description="Simulated PDF download." className="text-blue-600 hover:text-blue-800 font-medium text-xs hover:underline">Download PDF</ActionToastButton>
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
