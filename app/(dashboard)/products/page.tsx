import React from "react";
import { Plus, Search, Filter, MoreHorizontal, Package } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import ActionToastButton from "@/app/components/ActionToastButton";

const prisma = new PrismaClient();

export default async function ProductsPage() {
  let products = [];
  try {
    products = await prisma.product.findMany({
      include: { category: true, supplier: true },
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.error("Products error:", e);
    // fallback empty array
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header">Products</h1>
          <p className="page-header-sub">Manage your product catalogue, pricing, and details.</p>
        </div>
        <ActionToastButton message="Add Product" description="Simulated opening Add Product modal." className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </ActionToastButton>
      </div>

      <div className="dashboard-card flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
          <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg max-w-sm w-full focus-within:border-blue-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search by name, SKU..." 
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-slate-900"
            />
          </div>
          <ActionToastButton message="Filter Products" description="Simulated opening filter drawer." className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white">
            <Filter className="w-4 h-4 text-slate-500" />
            Filters
          </ActionToastButton>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {products.length > 0 ? (
                products.map((p: any) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                          <Package className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">{p.name}</p>
                          <p className="text-xs text-slate-500">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">
                        {p.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">${p.sellingPrice.toFixed(2)}</p>
                      <p className="text-xs text-slate-500">Cost: ${p.unitPrice.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ActionToastButton message="Product Options" description="Simulated opening options menu." className="text-slate-400 hover:text-slate-900 p-1.5 rounded-md hover:bg-slate-100 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </ActionToastButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Package className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                    <p className="font-medium text-slate-900">No products found</p>
                    <p className="text-sm mt-1">Add a new product or check your database connection.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
          <span>Showing {products.length} products</span>
          <div className="flex gap-2">
            <ActionToastButton message="Previous Page" className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</ActionToastButton>
            <ActionToastButton message="Next Page" className="px-3 py-1 border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Next</ActionToastButton>
          </div>
        </div>
      </div>
    </div>
  );
}
