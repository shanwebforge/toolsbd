'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Search, 
  X, 
  Clock, 
  CheckCircle2, 
  Truck, 
  CreditCard,
  User,
  Hash,
  Calendar
} from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  items: string;
  totalAmount: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  paymentStatus: 'Paid' | 'Unpaid';
  date: string;
}

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [customer, setCustomer] = useState('');
  const [itemList, setItemList] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<Order['status']>('Pending');
  const [payment, setPayment] = useState<Order['paymentStatus']>('Unpaid');

  useEffect(() => {
    const saved = localStorage.getItem('shan_orders_data');
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  const saveToLocal = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('shan_orders_data', JSON.stringify(newOrders));
  };

  const addOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: Date.now().toString(),
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customer,
      items: itemList,
      totalAmount: amount,
      status: status,
      paymentStatus: payment,
      date: new Date().toLocaleDateString()
    };
    saveToLocal([newOrder, ...orders]);
    setIsModalOpen(false);
    setCustomer(''); setItemList(''); setAmount('');
  };

  const deleteOrder = (id: string) => {
    const filtered = orders.filter(o => o.id !== id);
    saveToLocal(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-3 h-3 text-amber-500" />;
      case 'Shipped': return <Truck className="w-3 h-3 text-indigo-500" />;
      case 'Delivered': return <CheckCircle2 className="w-3 h-3 text-emerald-500" />;
      default: return <Clock className="w-3 h-3 text-slate-400" />;
    }
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-3">
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Sales Hub</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase">
              Order <span className="text-purple-600">Pipeline</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search Order ID or Customer..." 
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs outline-none focus:border-purple-500 w-full md:w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" /> New Order
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-100 dark:border-zinc-800">
                <tr>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">No orders found</td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4">
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{order.orderId}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700 dark:text-white uppercase tracking-tight">{order.customerName}</span>
                          <span className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5"><Calendar className="w-2.5 h-2.5" /> {order.date}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-slate-500 dark:text-zinc-400 truncate max-w-[150px] block">{order.items}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                           <span className={`flex items-center gap-1.5 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                             order.status === 'Delivered' ? 'text-emerald-600 border-emerald-100 bg-emerald-50' : 
                             order.status === 'Shipped' ? 'text-indigo-600 border-indigo-100 bg-indigo-50' : 
                             'text-amber-600 border-amber-100 bg-amber-50'
                           }`}>
                             {getStatusIcon(order.status)} {order.status}
                           </span>
                           <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${order.paymentStatus === 'Paid' ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'}`}>
                             {order.paymentStatus}
                           </span>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-sm text-slate-800 dark:text-white text-nowrap">
                        ৳{order.totalAmount}
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => deleteOrder(order.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-lg shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-[0.2em]">Create New Order</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={addOrder} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Customer Name</label>
                  <input required value={customer} onChange={e => setCustomer(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Items Summary</label>
                  <input required value={itemList} onChange={e => setItemList(e.target.value)} placeholder="e.g. 2x Web Design Service" className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none">
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Total (৳)</label>
                    <input required value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500" />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-zinc-800 rounded-lg">
                   <input type="checkbox" id="paid" onChange={(e) => setPayment(e.target.checked ? 'Paid' : 'Unpaid')} className="accent-purple-600" />
                   <label htmlFor="paid" className="text-[10px] font-bold text-slate-500 uppercase cursor-pointer">Mark as Paid Already</label>
                </div>
                <button type="submit" className="w-full py-3.5 bg-purple-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-[0.2em] mt-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                  Confirm Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}