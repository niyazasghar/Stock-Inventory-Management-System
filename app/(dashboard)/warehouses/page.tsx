import React from "react";
import { Plus, Search, Building2, MapPin, Package, Users } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import ActionToastButton from "@/app/components/ActionToastButton";

const prisma = new PrismaClient();

export default async function WarehousesPage() {
  let warehouses = [];
  try {
    warehouses = await prisma.warehouse.findMany({
      orderBy: { name: 'asc' }
    });
  } catch (e) {
    console.error("Warehouses error:", e);
    // fallback empty array
  }

  // Mock data for UI presentation if DB fails
  if (warehouses.length === 0) {
    warehouses = [
      { id: 1, name: "Bengaluru Central Warehouse", location: "Bengaluru, KA", manager: "Rahul M.", capacity: 5000, status: "ACTIVE" },
      { id: 2, name: "Mumbai South Hub", location: "Mumbai, MH", manager: "Sonia P.", capacity: 3000, status: "ACTIVE" },
      { id: 3, name: "Delhi NCR Distribution Center", location: "Delhi, NCR", manager: "Amit S.", capacity: 4500, status: "NEAR_CAPACITY" },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header">Warehouses</h1>
          <p className="page-header-sub">Manage your storage locations and capacities.</p>
        </div>
        <ActionToastButton message="Add Warehouse" description="Simulated opening Add Warehouse modal." className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Warehouse
        </ActionToastButton>
      </div>

      {/* Grid view for warehouses */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {warehouses.map((wh: any) => (
          <div key={wh.id} className="dashboard-card hover:shadow-md transition-shadow group flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-slate-500 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{wh.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {wh.location}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50/50 flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="w-4 h-4" />
                  Manager
                </div>
                <span className="font-medium text-slate-900">{wh.manager || "Unassigned"}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Package className="w-4 h-4" />
                  Capacity
                </div>
                <span className="font-medium text-slate-900">{wh.capacity} units</span>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Storage Usage</span>
                  <span className="font-medium text-slate-700">
                    {wh.status === 'NEAR_CAPACITY' ? '85%' : '42%'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${wh.status === 'NEAR_CAPACITY' ? 'bg-amber-500' : 'bg-blue-500'}`} 
                    style={{ width: wh.status === 'NEAR_CAPACITY' ? '85%' : '42%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center">
              <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                wh.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 
                wh.status === 'NEAR_CAPACITY' ? 'bg-amber-100 text-amber-800' : 
                'bg-slate-100 text-slate-800'
              }`}>
                {wh.status === 'NEAR_CAPACITY' ? 'Near Capacity' : wh.status}
              </span>
              <ActionToastButton message="Manage Stock" description="Simulated navigation to manage warehouse stock." className="text-sm font-medium text-blue-600 hover:text-blue-800">
                Manage Stock &rarr;
              </ActionToastButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
