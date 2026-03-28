'use client';
import { useState, useEffect, useRef } from 'react';
import { 
  ImageIcon, Download, AlignCenter, AlignLeft, AlignRight, 
  Sparkles, Palette, Maximize, CheckCircle2
} from 'lucide-react';

const PATTERNS = [
  { id: 'none', label: 'Clean' },
  { id: 'dots', label: 'Dots' },
  { id: 'grid', label: 'Grid' },
  { id: 'glass', label: 'Glass' },
  { id: 'mesh', label: 'Mesh' }
];

const GRADIENTS = [
  { name: "Aurora", value: "linear-gradient(215deg, #4f46e5 0%, #a855f7 50%, #ec4899 100%)" },
  { name: "Midnight", value: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" },
  { name: "Hyper", value: "linear-gradient(to right, #00c6ff, #0072ff)" },
  { name: "Lush", value: "linear-gradient(to right, #11998e, #38ef7d)" },
];

const FlyerGenerator = () => {
  const [title, setTitle] = useState("ULTIMATE FLYER");
  const [subtitle, setSubtitle] = useState("Professional Modern Design");
  const [body, setBody] = useState("Add your detailed information here. Ensure there is enough space for readability.");
  const [activeGradient, setActiveGradient] = useState(GRADIENTS[0].value);
  const [textColor, setTextColor] = useState("#ffffff");
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>("center");
  const [pattern, setPattern] = useState('mesh');
  const [image, setImage] = useState<string | null>(null);
  const [alert, setAlert] = useState({ show: false, msg: '' });

  const [canvasWidth, setCanvasWidth] = useState(450);
  const [canvasHeight, setCanvasHeight] = useState(630);
  const [zoom, setZoom] = useState(0.8);

  const flyerRef = useRef<HTMLDivElement>(null);

  // Script loading logic updated for Next.js compatibility
  useEffect(() => {
    const scriptId = "html2canvas-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const downloadFlyer = async () => {
    const flyer = flyerRef.current;
    const h2c = (window as any).html2canvas;
    
    if (!flyer || !h2c) {
      setAlert({ show: true, msg: 'Library loading, please wait...' });
      setTimeout(() => setAlert({ show: false, msg: '' }), 2000);
      return;
    }

    try {
      const canvas = await h2c(flyer, { 
        scale: 3, 
        useCORS: true,
        backgroundColor: null,
        logging: false
      });
      const link = document.createElement("a");
      link.download = `Flyer_Shan_${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setAlert({ show: true, msg: 'Export Success!' });
      setTimeout(() => setAlert({ show: false, msg: '' }), 3000);
    } catch (e) { 
      console.error(e);
      setAlert({ show: true, msg: 'Export Failed!' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 text-slate-900 dark:text-slate-100 relative font-sans">
      
      {alert.show && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">{alert.msg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Editor Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm border-b-4 border-b-indigo-600">
            <h2 className="flex items-center gap-2 mb-6 text-indigo-600 font-black uppercase tracking-[0.2em] text-[10px]">
                <Palette size={18} /> Design Controls
            </h2>

            <div className="space-y-4">
              <input type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:border-indigo-500" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:border-indigo-500" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
              <textarea rows={3} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none resize-none focus:border-indigo-500" value={body} onChange={(e) => setBody(e.target.value)}></textarea>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[9px] font-black opacity-40 uppercase ml-1 flex items-center gap-1"><Maximize size={10}/> Width</label>
                    <input type="number" value={canvasWidth} onChange={(e)=>setCanvasWidth(Number(e.target.value))} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold" />
                </div>
                <div className="space-y-1">
                    <label className="text-[9px] font-black opacity-40 uppercase ml-1 flex items-center gap-1"><Maximize size={10}/> Height</label>
                    <input type="number" value={canvasHeight} onChange={(e)=>setCanvasHeight(Number(e.target.value))} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[9px] font-black opacity-40 uppercase ml-1">Alignment</label>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                      {(['left', 'center', 'right'] as const).map((a) => (
                        <button key={a} onClick={() => setTextAlign(a)} className={`flex-1 p-2 rounded transition-all ${textAlign === a ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400 opacity-40'}`}>
                          {a === 'left' ? <AlignLeft size={14} className="mx-auto"/> : a === 'center' ? <AlignCenter size={14} className="mx-auto"/> : <AlignRight size={14} className="mx-auto"/>}
                        </button>
                      ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-black opacity-40 uppercase ml-1">Pattern</label>
                    <select className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold outline-none" value={pattern} onChange={(e)=>setPattern(e.target.value)}>
                        {PATTERNS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                    </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black opacity-40 uppercase ml-1">Gradients & Text Color</label>
                <div className="flex items-center gap-3">
                    <div className="flex gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl flex-1 overflow-x-auto no-scrollbar">
                        {GRADIENTS.map((g, i) => (
                            <button key={i} onClick={() => setActiveGradient(g.value)} className={`w-6 h-6 shrink-0 rounded-full border-2 transition-transform active:scale-90 ${activeGradient === g.value ? 'border-indigo-600 scale-110 shadow-lg' : 'border-transparent opacity-60'}`} style={{ background: g.value }} title={g.name}></button>
                        ))}
                    </div>
                    <input type="color" value={textColor} onChange={(e)=>setTextColor(e.target.value)} className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-none p-0" />
                </div>
              </div>

              <label className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 transition-all group">
                <ImageIcon size={16} className="group-hover:text-indigo-600"/>
                <span className="text-[10px] font-bold uppercase tracking-widest">Upload Banner</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e)=>{
                    const file = e.target.files?.[0];
                    if(file){
                        const r = new FileReader();
                        r.onload=(ev)=>setImage(ev.target?.result as string);
                        r.readAsDataURL(file);
                    }
                }} />
              </label>

              <button onClick={downloadFlyer} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-[0.2em] shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
                <Download size={16} /> Export Masterpiece
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Preview Side */}
        <div className="lg:col-span-7 flex flex-col items-center">
            <div className="mb-4 flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border dark:border-slate-800 shadow-sm">
                <input type="range" min="0.3" max="1.2" step="0.1" value={zoom} onChange={(e)=>setZoom(Number(e.target.value))} className="w-24 accent-indigo-600" />
                <span className="text-[10px] font-black opacity-30">{Math.round(zoom*100)}%</span>
            </div>

            <div className="bg-slate-100/50 dark:bg-slate-950/40 p-10 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800 w-full flex justify-center overflow-auto min-h-[700px]">
                <div 
                  ref={flyerRef}
                  style={{ 
                    transform: `scale(${zoom})`, 
                    transformOrigin: 'top center',
                    width: `${canvasWidth}px`, height: `${canvasHeight}px`,
                    background: activeGradient,
                    color: textColor, padding: '55px', borderRadius: '40px',
                    display: 'flex', flexDirection: 'column', textAlign: textAlign,
                    alignItems: textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center',
                  }}
                  className="shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden shrink-0"
                >
                    {/* Patterns Layer */}
                    {pattern === 'dots' && <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>}
                    {pattern === 'grid' && <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>}
                    {pattern === 'glass' && <div className="absolute inset-0 bg-white/10 backdrop-blur-[80px]"></div>}
                    {pattern === 'mesh' && (
                        <>
                            <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-white/15 blur-[100px] rounded-full -mr-40 -mt-40"></div>
                            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-black/20 blur-[80px] rounded-full -ml-20 -mb-20"></div>
                        </>
                    )}

                    {image && (
                        <div className="relative z-10 mb-10 rounded-[28px] overflow-hidden shadow-2xl border border-white/10 w-full">
                            <img src={image} className="w-full h-52 object-cover" alt="Banner" crossOrigin="anonymous"/>
                        </div>
                    )}

                    <div className="relative z-10 w-full">
                        <h2 className="leading-[1.0] font-black mb-6 tracking-tighter uppercase italic break-words" style={{ fontSize: `52px` }}>
                            {title.split(' ').map((t, i) => <span key={i} className={i%2!==0?'opacity-40':''}>{t} </span>)}
                        </h2>
                        <div className="h-1.5 w-20 bg-current opacity-40 mb-8 rounded-full" style={{ marginLeft: textAlign === 'center' ? 'auto' : '0', marginRight: textAlign === 'center' ? 'auto' : '0' }}></div>
                        
                        <h4 className="font-black uppercase tracking-[0.3em] mb-8 leading-snug" style={{ fontSize: `16px` }}>{subtitle}</h4>
                        <p className="opacity-80 leading-relaxed font-medium" style={{ fontSize: `15px`, whiteSpace: 'pre-wrap' }}>{body}</p>
                    </div>

                    <div className="mt-auto pt-8 border-t border-current/10 w-full flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10"><Sparkles size={16}/></div>
                            <div className="text-left">
                                <p className="text-[7px] font-black uppercase tracking-[0.3em] opacity-40">Authorized</p>
                                <p className="text-[10px] font-black">TOOLSBD STUDIO</p>
                            </div>
                        </div>
                        <div className="text-[20px] font-black italic opacity-20">ULTRA</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerGenerator;