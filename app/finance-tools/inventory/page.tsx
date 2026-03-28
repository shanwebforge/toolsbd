'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Plus, 
  Minus, 
  History, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search,
  RotateCcw,
  X
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minStock: number;
  lastUpdated: string;
}

export default function InventoryTracker() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState(0);
  const [minStock, setMinStock] = useState(5);

  useEffect(() => {
    const saved = localStorage.getItem('shan_inventory_data');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const saveToLocal = (newItems: InventoryItem[]) => {
    setItems(newItems);
    localStorage.setItem('shan_inventory_data', JSON.stringify(newItems));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name,
      sku: sku || `SKU-${Math.floor(Math.random() * 1000)}`,
      currentStock: stock,
      minStock,
      lastUpdated: new Date().toLocaleString()
    };
    saveToLocal([newItem, ...items]);
    setIsModalOpen(false);
    setName(''); setSku(''); setStock(0);
  };

  const updateStock = (id: string, amount: number) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          currentStock: Math.max(0, item.currentStock + amount),
          lastUpdated: new Date().toLocaleString()
        };
      }
      return item;
    });
    saveToLocal(updated);
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20 mb-3">
              <BarChart3 className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Stock Monitor</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase">
              Inventory <span className="text-indigo-600">Tracker</span>
            </h1>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search SKU or Name..." 
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs outline-none focus:border-indigo-500 w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Low Stock Alert */}
        {items.some(i => i.currentStock <= i.minStock) && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <p className="text-xs font-bold text-rose-600 uppercase tracking-tight">Warning: Some items are below minimum stock level!</p>
          </div>
        )}

        {/* Inventory List */}
        <div className="grid gap-4">
          {filteredItems.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-dashed border-slate-200 dark:border-zinc-800 rounded-lg p-16 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No inventory data found</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-tight">{item.name}</h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded border border-slate-200 dark:border-zinc-700">{item.sku}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1"><History className="w-3 h-3" /> Updated: {item.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Stock Level</p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateStock(item.id, -1)}
                        className="p-1.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-md text-slate-400 hover:text-rose-500 transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className={`text-lg font-black font-mono w-10 text-center ${item.currentStock <= item.minStock ? 'text-rose-500 animate-pulse' : 'text-indigo-600'}`}>
                        {item.currentStock}
                      </span>
                      <button 
                        onClick={() => updateStock(item.id, 1)}
                        className="p-1.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-md text-slate-400 hover:text-emerald-500 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:block w-24">
                     <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Status</p>
                     <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${item.currentStock <= item.minStock ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${Math.min(100, (item.currentStock / 20) * 100)}%` }}
                        />
                     </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-lg shadow-2xl border border-slate-200 dark:border-zinc-800">
              <div className="p-5 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                <h2 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-[0.2em]">New Stock Entry</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={addItem} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Item Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1">SKU / Code</label>
                  <input value={sku} onChange={e => setSku(e.target.value)} placeholder="Optional" className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Initial Stock</label>
                    <input type="number" required value={stock} onChange={e => setStock(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Min Level</label>
                    <input type="number" required value={minStock} onChange={e => setMinStock(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest mt-2 shadow-lg shadow-indigo-500/20">
                  Register Item
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center gap-10 opacity-20 grayscale">
          <ArrowUpRight className="w-5 h-5 text-emerald-500" />
          <RotateCcw className="w-5 h-5 text-slate-400" />
          <ArrowDownLeft className="w-5 h-5 text-rose-500" />
        </div>
      </div>
    </div>
  );
}