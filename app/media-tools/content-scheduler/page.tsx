'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Layout, 
  CheckCircle2, 
  AlertCircle,
  X,
  Send
} from 'lucide-react';

interface ScheduledPost {
  id: string;
  datetime: string;
  text: string;
  imageData: string | null;
}

const ContentScheduler = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [datetime, setDatetime] = useState('');
  const [postText, setPostText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });

  // Load posts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('shan_scheduled_posts');
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever posts change
  const savePosts = (updatedPosts: ScheduledPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('shan_scheduled_posts', JSON.stringify(updatedPosts));
  };

  const triggerAlert = (msg: string, type: 'success' | 'error' = 'success') => {
    setAlert({ show: true, msg, type });
    setTimeout(() => setAlert({ show: false, msg: '', type: 'success' }), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addPost = () => {
    if (!datetime || !postText.trim()) {
      triggerAlert("Please fill in both time and content", "error");
      return;
    }

    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      datetime,
      text: postText,
      imageData: previewUrl
    };

    const updatedPosts = [...posts, newPost].sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );

    savePosts(updatedPosts);
    setDatetime('');
    setPostText('');
    setImageFile(null);
    setPreviewUrl(null);
    triggerAlert("Post scheduled successfully!");
  };

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(p => p.id !== id);
    savePosts(updatedPosts);
    triggerAlert("Post removed", "error");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100 relative">
      
      {/* --- ALERT SYSTEM --- */}
      {alert.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xs animate-in fade-in zoom-in slide-in-from-top-10 duration-300">
          <div className={`backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center justify-between border ${alert.type === 'error' ? 'bg-red-600/90 border-red-400/50' : 'bg-indigo-600/95 border-indigo-400/50'}`}>
            <div className="flex items-center gap-2.5">
              {alert.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
              <span className="text-[10px] font-black uppercase tracking-widest">{alert.msg}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: COMPOSER (Purple Focus) --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm border-b-4 border-b-purple-600">
            <div className="flex items-center gap-2 text-purple-600 mb-6">
              <Layout size={20} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Post Composer</span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block flex items-center gap-2">
                  <Clock size={12} /> Schedule Time
                </label>
                <input 
                  type="datetime-local" 
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block flex items-center gap-2">
                  <Send size={12} /> Content
                </label>
                <textarea 
                  placeholder="Write your post content here..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium outline-none focus:border-purple-500 transition-all min-h-[120px] resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block flex items-center gap-2">
                  <ImageIcon size={12} /> Attachment (Optional)
                </label>
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all relative overflow-hidden group">
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-[9px] font-black uppercase tracking-widest">Change Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <Plus size={24} className="mx-auto text-slate-300 mb-2" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Add Image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>

              <button 
                onClick={addPost}
                className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                <Plus size={18} /> Schedule Post
              </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT: CALENDAR FEED (Indigo Focus) --- */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2 text-indigo-600">
                <Calendar size={20} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Upcoming Feed</span>
              </div>
              <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[9px] font-bold opacity-60">
                {posts.length} Posts Total
              </span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {posts.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                  <Calendar size={48} className="mx-auto text-slate-200 mb-4 opacity-20" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No scheduled posts yet</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="group relative bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl hover:border-indigo-500 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-indigo-600">
                        <Clock size={12} />
                        <span className="text-[10px] font-black tracking-tighter">
                          {new Date(post.datetime).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex gap-4">
                      {post.imageData && (
                        <img 
                          src={post.imageData} 
                          alt="Post" 
                          className="w-20 h-20 rounded-xl object-cover shadow-sm border border-white dark:border-slate-700" 
                        />
                      )}
                      <p className="flex-1 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                        {post.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <p className="text-center text-[8px] font-black uppercase tracking-[0.6em] opacity-20">Local Scheduler Engine v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default ContentScheduler;