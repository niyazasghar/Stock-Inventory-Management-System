import React from "react";
import { Search, Filter, Box, AlertTriangle, ArrowRightLeft } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import ActionToastButton from "@/app/components/ActionToastButton";

const prisma = new PrismaClient();

export default async function InventoryPage() {
  let inventory = [];
  try {
    inventory = await prisma.inventory.findMany({
      include: { product: true, warehouse: true },
      orderBy: { quantity: 'asc' }
    });
  } catch (e) {
    console.error("Inventory error:", e);
    // fallback empty array
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header">Inventory Control</h1>
          <p className="page-header-sub">Track stock levels across all your warehouses.</p>
        </div>
        <div className="flex gap-2">
          <ActionToastButton message="Transfer Stock" description="Simulated stock transfer." className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-sm">
            <ArrowRightLeft className="w-4 h-4" />
            Transfer Stock
          </ActionToastButton>
          <ActionToastButton message="Adjust Stock" description="Simulated stock adjustment." className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm shadow-blue-200">
            Adjust Stock
          </ActionToastButton>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="dashboard-card p-5 border-l-4 border-l-blue-500">
           <p className="text-sm font-medium text-slate-500 mb-1">Total Stock Items</p>
           <h3 className="text-2xl font-bold text-slate-900">{inventory.length > 0 ? inventory.reduce((acc, curr) => acc + curr.quantity, 0) : '0'}</h3>
         </div>
         <div className="dashboard-card p-5 border-l-4 border-l-amber-500">
           <p className="text-sm font-medium text-slate-500 mb-1">Low Stock Alerts</p>
           <h3 className="text-2xl font-bold text-slate-900">{inventory.filter(i => i.quantity <= (i.product?.reorderLevel || 10)).length || '0'}</h3>
         </div>
         <div className="dashboard-card p-5 border-l-4 border-l-emerald-500">
           <p className="text-sm font-medium text-slate-500 mb-1">Active Warehouses</p>
           <h3 className="text-2xl font-bold text-slate-900">3</h3>
         </div>
      </div>

      <div className="dashboard-card flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg max-w-sm w-full focus-within:border-blue-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search inventory by product, SKU, or warehouse..." 
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-slate-900"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Warehouses</option>
              <option>Bengaluru Central</option>
              <option>Mumbai South</option>
              <option>Delhi NCR</option>
            </select>
            <ActionToastButton message="Filter Inventory" description="Simulated filter options." className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white">
              <Filter className="w-4 h-4 text-slate-500" />
            </ActionToastButton>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Warehouse</th>
                <th className="px-6 py-4 text-right">Quantity</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {inventory.length > 0 ? (
                inventory.map((inv: any) => {
                  const isLowStock = inv.quantity <= (inv.product?.reorderLevel || 10);
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                        <Box className="w-4 h-4 text-slate-400" />
                        {inv.product.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{inv.product.sku}</td>
                      <td className="px-6 py-4 text-slate-700">{inv.warehouse.name}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-900">{inv.quantity}</td>
                      <td className="px-6 py-4">
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            <AlertTriangle className="w-3 h-3" />
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Healthy
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Box className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                    <p className="font-medium text-slate-900">No inventory records</p>
                    <p className="text-sm mt-1">Receive stock to populate inventory.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
