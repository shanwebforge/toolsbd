'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Trash2, 
  Tag, 
  Layers, 
  BarChart3, 
  X, 
  Edit3, 
  Zap,
  Box,
  ShoppingCart
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Out of Stock' | 'Digital';
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(0);
  const [status, setStatus] = useState<'In Stock' | 'Out of Stock' | 'Digital'>('In Stock');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('shan_products_list');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const saveToLocal = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('shan_products_list', JSON.stringify(updatedProducts));
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      category,
      price,
      stock,
      status
    };

    saveToLocal([newProduct, ...products]);
    setIsModalOpen(false);
    // Reset Form
    setName(''); setCategory(''); setPrice(''); setStock(0); setStatus('In Stock');
  };

  const deleteProduct = (id: string) => {
    const filtered = products.filter(p => p.id !== id);
    saveToLocal(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-3">
              <Package className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Inventory Console</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase">
              Product <span className="text-purple-600">Inventory</span>
            </h1>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add New Item
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Items</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">{products.length < 10 ? `0${products.length}` : products.length}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Digital Goods</p>
            <p className="text-xl font-bold text-purple-600">{products.filter(p => p.status === 'Digital').length}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Out of Stock</p>
            <p className="text-xl font-bold text-rose-500">{products.filter(p => p.status === 'Out of Stock').length}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Categories</p>
            <p className="text-xl font-bold text-emerald-500">{new Set(products.map(p => p.category)).size}</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-lg p-20 text-center">
              <Box className="w-10 h-10 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Warehouse is empty</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden group hover:border-purple-300 transition-all">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 dark:bg-zinc-800 rounded-md">
                      <Tag className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                      product.status === 'In Stock' ? 'text-emerald-600 border-emerald-100 bg-emerald-50' : 
                      product.status === 'Digital' ? 'text-indigo-600 border-indigo-100 bg-indigo-50' : 
                      'text-rose-600 border-rose-100 bg-rose-50'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1 uppercase tracking-tight">{product.name}</h3>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mb-4">{product.category || 'Uncategorized'}</p>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Unit Price</p>
                      <p className="text-lg font-black text-slate-800 dark:text-white font-mono">৳{product.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Stock</p>
                      <p className="text-sm font-bold text-slate-600 dark:text-zinc-400">{product.stock} Units</p>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50/50 dark:bg-zinc-800/30 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                  <div className="flex gap-3">
                    <button className="text-slate-400 hover:text-purple-600 transition-colors"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => deleteProduct(product.id)} className="text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <button className="p-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-md text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-lg shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-[0.2em]">New Product Entry</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              
              <form onSubmit={addProduct} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Product Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Category</label>
                    <input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Software" className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Price (৳)</label>
                    <input required value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all font-mono" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Stock Count</label>
                    <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Type</label>
                    <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none appearance-none">
                      <option value="In Stock">Physical</option>
                      <option value="Digital">Digital</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-purple-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-[0.2em] mt-4 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                  Register Product
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-12 flex items-center justify-center gap-6 opacity-30 grayscale">
           <Layers className="w-5 h-5" />
           <BarChart3 className="w-5 h-5" />
           <Zap className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}