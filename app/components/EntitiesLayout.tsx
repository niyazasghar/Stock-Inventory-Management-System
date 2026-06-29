import React from "react";
import { Search, Filter, Plus, Users, Mail, Phone, ExternalLink } from "lucide-react";
import ActionToastButton from "@/app/components/ActionToastButton";

export default function EntitiesPage({ type }: { type: 'SUPPLIERS' | 'CUSTOMERS' }) {
  const isSupplier = type === 'SUPPLIERS';
  const entities = isSupplier ? [
    { id: 'SUP-01', name: 'Apex Wholesale Co.', contact: 'Arun K.', email: 'orders@apex.demo', phone: '+91 98765 43210', orders: 12, status: 'ACTIVE' },
    { id: 'SUP-02', name: 'FreshLine Suppliers', contact: 'Priya R.', email: 'supply@freshline.demo', phone: '+91 98765 43211', orders: 4, status: 'ACTIVE' },
    { id: 'SUP-03', name: 'BuildMax Materials', contact: 'Vijay S.', email: 'sales@buildmax.demo', phone: '+91 98765 43212', orders: 8, status: 'ACTIVE' },
  ] : [
    { id: 'CUST-01', name: 'UrbanMart Retail', contact: 'Nitin J.', email: 'purchasing@urbanmart.demo', phone: '+91 98765 43213', orders: 24, status: 'ACTIVE' },
    { id: 'CUST-02', name: 'PrimeCare Supplies', contact: 'Dr. Ramesh', email: 'procurement@primecare.demo', phone: '+91 98765 43214', orders: 5, status: 'ACTIVE' },
    { id: 'CUST-03', name: 'NovaStyle Commerce', contact: 'Anjali V.', email: 'sourcing@novastyle.demo', phone: '+91 98765 43215', orders: 18, status: 'ACTIVE' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-header">{isSupplier ? 'Suppliers' : 'Customers'}</h1>
          <p className="page-header-sub">Manage your business {isSupplier ? 'suppliers and vendors' : 'clients and retail partners'}.</p>
        </div>
        <ActionToastButton message={`Add ${isSupplier ? 'Supplier' : 'Customer'}`} description={`Simulated opening Add ${isSupplier ? 'Supplier' : 'Customer'} modal.`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add {isSupplier ? 'Supplier' : 'Customer'}
        </ActionToastButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.map((entity, i) => (
          <div key={i} className="dashboard-card group">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                  <Users className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{entity.name}</h3>
                  <p className="text-sm text-slate-500">{entity.id}</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 space-y-3">
               <div className="flex items-center gap-3 text-sm text-slate-700">
                 <Users className="w-4 h-4 text-slate-400" />
                 {entity.contact}
               </div>
               <div className="flex items-center gap-3 text-sm text-slate-700">
                 <Mail className="w-4 h-4 text-slate-400" />
                 {entity.email}
               </div>
               <div className="flex items-center gap-3 text-sm text-slate-700">
                 <Phone className="w-4 h-4 text-slate-400" />
                 {entity.phone}
               </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center">
              <div className="text-sm">
                <span className="font-bold text-slate-900">{entity.orders}</span>
                <span className="text-slate-500 ml-1">{isSupplier ? 'Purchase Orders' : 'Sales Orders'}</span>
              </div>
              <ActionToastButton message="Open Record" description="Simulated viewing full record." className="text-blue-600 hover:bg-blue-50 p-2 rounded-md transition-colors">
                <ExternalLink className="w-4 h-4" />
              </ActionToastButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
