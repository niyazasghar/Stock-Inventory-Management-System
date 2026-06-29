import React from "react";
import { Search, Filter, ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft, ShieldAlert } from "lucide-react";
import ActionToastButton from "@/app/components/ActionToastButton";

export default function StockMovementPage() {
  const movements = [
    { id: 'SM-10492', product: 'Wireless Barcode Scanner', sku: 'SKU-ELEC-1042', type: 'IN', qty: 60, source: 'Supplier (Apex)', dest: 'Bengaluru Central', date: 'Oct 14, 2024, 09:30 AM', user: 'Rahul M.' },
    { id: 'SM-10493', product: 'Wireless Barcode Scanner', sku: 'SKU-ELEC-1042', type: 'TRANSFER', qty: 15, source: 'Bengaluru Central', dest: 'Mumbai South Hub', date: 'Oct 14, 2024, 11:15 AM', user: 'Rahul M.' },
    { id: 'SM-10494', product: 'Organic Rice Pack', sku: 'SKU-GROC-7781', type: 'IN', qty: 400, source: 'Supplier (FreshLine)', dest: 'Delhi NCR Dist.', date: 'Oct 13, 2024, 02:40 PM', user: 'Amit S.' },
    { id: 'SM-10495', product: 'Steel Door Handle', sku: 'SKU-HARD-4420', type: 'OUT', qty: 20, source: 'Bengaluru Central', dest: 'Customer (UrbanMart)', date: 'Oct 12, 2024, 10:05 AM', user: 'System (SO-54031)' },
    { id: 'SM-10496', product: 'Medical Face Masks', sku: 'SKU-MED-9014', type: 'ADJUSTMENT', qty: -5, source: 'Mumbai South Hub', dest: 'Damaged Goods', date: 'Oct 11, 2024, 04:20 PM', user: 'Sonia P.' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'IN': return <ArrowDownToLine className="w-4 h-4 text-emerald-600" />;
      case 'OUT': return <ArrowUpFromLine className="w-4 h-4 text-blue-600" />;
      case 'TRANSFER': return <ArrowRightLeft className="w-4 h-4 text-amber-600" />;
      case 'ADJUSTMENT': return <ShieldAlert className="w-4 h-4 text-red-600" />;
      default: return <ArrowRightLeft className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Stock Movement</h1>
        <p className="page-header-sub">Detailed audit trail of all inventory changes across locations.</p>
      </div>

      <div className="dashboard-card flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg max-w-sm w-full focus-within:border-blue-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search by product, SKU, or user..." 
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-slate-900"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none">
              <option>All Types</option>
              <option>Stock In</option>
              <option>Stock Out</option>
              <option>Transfers</option>
              <option>Adjustments</option>
            </select>
            <ActionToastButton message="Filter Stock Movements" description="Simulated opening filter options." className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white">
              <Filter className="w-4 h-4 text-slate-500" />
            </ActionToastButton>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">ID / Type</th>
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4 text-right">Qty</th>
                <th className="px-6 py-4">Source &rarr; Destination</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {movements.map((mov, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900 mb-1">{mov.id}</p>
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      {getTypeIcon(mov.type)}
                      <span className="uppercase tracking-wider">{mov.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{mov.product}</p>
                    <p className="text-xs text-slate-500">{mov.sku}</p>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">
                    <span className={mov.qty > 0 ? 'text-emerald-600' : 'text-red-600'}>
                      {mov.qty > 0 ? `+${mov.qty}` : mov.qty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{mov.source}</span>
                      <ArrowRightLeft className="w-3 h-3 text-slate-400" />
                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{mov.dest}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{mov.date}</td>
                  <td className="px-6 py-4 text-slate-700">{mov.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
