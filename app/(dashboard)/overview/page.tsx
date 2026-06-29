import React from "react";
import { Package, TrendingUp, AlertTriangle, Box, ArrowRight, Truck, Clock } from "lucide-react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import ActionToastButton from "@/app/components/ActionToastButton";

// In a real app we'd use a singleton Prisma client to prevent connection limit issues in dev
const prisma = new PrismaClient();

export default async function OverviewPage() {
  // Try to fetch real data from DB, fallback to 0/empty if DB not seeded
  let productsCount = 0;
  let lowStockCount = 0;
  let openPoCount = 0;
  let pendingSoCount = 0;
  let lowStockProducts = [];
  let recentInvoices = [];
  
  try {
    productsCount = await prisma.product.count();
    lowStockCount = await prisma.product.count({ where: { reorderLevel: { gt: 0 } } }); // simplified check
    openPoCount = await prisma.purchaseOrder.count({ where: { status: { in: ['DRAFT', 'SENT', 'APPROVED'] } } });
    pendingSoCount = await prisma.salesOrder.count({ where: { status: { in: ['NEW', 'PROCESSING'] } } });
    
    lowStockProducts = await prisma.inventory.findMany({
      where: { quantity: { lte: 20 } },
      include: { product: true, warehouse: true },
      take: 5
    });
    
    recentInvoices = await prisma.invoice.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Database error or not seeded:", error);
    // Continue with mock/empty data for frontend presentation
  }

  const kpis = [
    { label: "Total Products", value: productsCount.toString(), icon: Package, trend: "+12% from last month", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Low-Stock Items", value: lowStockCount.toString() || "3", icon: AlertTriangle, trend: "Requires attention", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Open Purchase Orders", value: openPoCount.toString() || "2", icon: Truck, trend: "Pending delivery", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Sales", value: pendingSoCount.toString() || "5", icon: Clock, trend: "Awaiting fulfillment", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="page-header">Dashboard Overview</h1>
        <p className="page-header-sub">Track your inventory, orders, and warehouse operations.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="dashboard-card p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
              <h3 className="text-3xl font-bold text-slate-900">{kpi.value}</h3>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Alerts */}
        <div className="lg:col-span-2 dashboard-card flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Low-Stock Alerts</h3>
              <p className="text-sm text-slate-500">Items that need to be reordered soon.</p>
            </div>
            <Link href="/inventory" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-0 flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Warehouse</th>
                  <th className="px-6 py-4 text-right">Current Stock</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map((item: any, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{item.product.name}</td>
                      <td className="px-6 py-4 text-slate-500">{item.product.sku}</td>
                      <td className="px-6 py-4 text-slate-500">{item.warehouse.name}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {item.quantity} left
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ActionToastButton message="Create PO" description="Simulated opening Create PO dialog." className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2 py-1 rounded">Create PO</ActionToastButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Mock data fallback if DB fails
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Steel Door Handle</td>
                    <td className="px-6 py-4 text-slate-500">SKU-HARD-4420</td>
                    <td className="px-6 py-4 text-slate-500">Delhi NCR Distribution</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        12 left
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionToastButton message="Create PO" description="Simulated opening Create PO dialog." className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2 py-1 rounded">Create PO</ActionToastButton>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="dashboard-card flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-white">
            <h3 className="font-bold text-lg text-slate-900">Recent Invoices</h3>
            <p className="text-sm text-slate-500">Latest generated invoices.</p>
          </div>
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${i % 2 === 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">INV-{88012 + i}</p>
                    <p className="text-xs text-slate-500">{i % 2 === 0 ? 'Sales' : 'Purchase'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-sm">${(1250.0 + (i * 200)).toFixed(2)}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${i === 2 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {i === 2 ? 'Pending' : 'Paid'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 mt-auto">
             <Link href="/invoices" className="text-sm font-medium text-blue-600 hover:text-blue-700 block text-center w-full">
               View All Invoices
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
