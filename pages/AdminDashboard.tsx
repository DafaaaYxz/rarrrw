
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectType, Admin } from '../types';
import { getProjects, saveProject, deleteProject, getAdmins, updateAdmin } from '../services/storage';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'UPLOAD' | 'MANAGE' | 'PROFILE'>('UPLOAD');
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // Form states
  const [pName, setPName] = useState('');
  const [pLang, setPLang] = useState('');
  const [pType, setPType] = useState<ProjectType>(ProjectType.CODE);
  const [pContent, setPContent] = useState('');
  const [pNotes, setPNotes] = useState('');
  const [pPreview, setPPreview] = useState('');

  // Profile Edit states
  const [editName, setEditName] = useState('');
  const [editQuote, setEditQuote] = useState('');
  const [editHash, setEditHash] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('hub_auth_session');
    if (!session) {
      navigate('/admin');
      return;
    }
    const { username } = JSON.parse(session);
    const admins = getAdmins();
    const currentAdmin = admins.find(a => a.username === username);
    if (currentAdmin) {
      setAdmin(currentAdmin);
      setEditName(currentAdmin.name);
      setEditQuote(currentAdmin.quote);
      setEditHash(currentAdmin.hashtags.join(', '));
      setProjects(getProjects().filter(p => p.authorId === currentAdmin.id));
    }
  }, [navigate]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin) return;

    const newProj: Project = {
      id: Date.now().toString(),
      name: pName,
      language: pLang,
      type: pType,
      content: pContent,
      notes: pNotes,
      previewUrl: pPreview,
      likes: 0,
      downloads: 0,
      authorId: admin.id,
      createdAt: new Date().toISOString()
    };

    saveProject(newProj);
    alert('Project published successfully!');
    // Reset
    setPName(''); setPLang(''); setPContent(''); setPNotes(''); setPPreview('');
    setProjects([newProj, ...projects]);
  };

  const handleLogout = () => {
    localStorage.removeItem('hub_auth_session');
    navigate('/admin');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus proyek ini?')) {
      deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin) return;
    const updated = {
      ...admin,
      name: editName,
      quote: editQuote,
      hashtags: editHash.split(',').map(s => s.trim())
    };
    updateAdmin(updated);
    setAdmin(updated);
    alert('Profile updated!');
  };

  if (!admin) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold">DASHBOARD</h2>
          <p className="text-zinc-500">Welcome, {admin.name}</p>
        </div>
        <button onClick={handleLogout} className="text-zinc-500 hover:text-red-500 font-mono-tech text-xs border border-zinc-800 px-4 py-2 rounded-full">TERMINATE_SESSION</button>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto hide-scrollbar pb-2">
        {['UPLOAD', 'MANAGE', 'PROFILE'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-red-600 text-white red-glow' : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'UPLOAD' && (
        <form onSubmit={handleUpload} className="glass-card rounded-[2.5rem] p-8 md:p-12 border-zinc-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono-tech text-zinc-500 uppercase">Project Name</label>
              <input value={pName} onChange={e => setPName(e.target.value)} required className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono-tech text-zinc-500 uppercase">Language / Tech</label>
              <input value={pLang} onChange={e => setPLang(e.target.value)} required placeholder="e.g. React, Python" className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono-tech text-zinc-500 uppercase">Project Type</label>
            <div className="flex space-x-4">
              <button type="button" onClick={() => setPType(ProjectType.CODE)} className={`flex-1 py-3 rounded-full border ${pType === ProjectType.CODE ? 'bg-red-600 border-red-600' : 'bg-zinc-900 border-zinc-800'}`}>CODE</button>
              <button type="button" onClick={() => setPType(ProjectType.FILE)} className={`flex-1 py-3 rounded-full border ${pType === ProjectType.FILE ? 'bg-red-600 border-red-600' : 'bg-zinc-900 border-zinc-800'}`}>FILE</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono-tech text-zinc-500 uppercase">{pType === ProjectType.CODE ? 'Paste Source Code' : 'Download URL / Link'}</label>
            <textarea value={pContent} onChange={e => setPContent(e.target.value)} required rows={6} className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] px-6 py-4 font-mono-tech text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono-tech text-zinc-500 uppercase">Preview URL (Optional)</label>
            <input value={pPreview} onChange={e => setPPreview(e.target.value)} placeholder="Image or Demo URL" className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono-tech text-zinc-500 uppercase">Developer Notes</label>
            <textarea value={pNotes} onChange={e => setPNotes(e.target.value)} rows={3} className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] px-6 py-4" />
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full transition-all">PUBLISH TO REPOSITORY</button>
        </form>
      )}

      {activeTab === 'MANAGE' && (
        <div className="space-y-4">
          {projects.map(p => (
            <div key={p.id} className="glass-card rounded-[2.5rem] p-6 border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-xs text-zinc-500">{p.language} | {p.type}</p>
              </div>
              <button onClick={() => handleDelete(p.id)} className="bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white p-3 rounded-full transition-colors">🗑️</button>
            </div>
          ))}
          {projects.length === 0 && <p className="text-center text-zinc-500 py-10">Belum ada proyek yang diunggah.</p>}
        </div>
      )}

      {activeTab === 'PROFILE' && (
        <form onSubmit={handleUpdateProfile} className="glass-card rounded-[2.5rem] p-8 border-zinc-800 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono-tech text-zinc-500 uppercase">Display Name</label>
            <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono-tech text-zinc-500 uppercase">Quote</label>
            <textarea value={editQuote} onChange={e => setEditQuote(e.target.value)} rows={3} className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] px-6 py-4" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono-tech text-zinc-500 uppercase">Hashtags (Comma separated)</label>
            <input value={editHash} onChange={e => setEditHash(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3" />
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full transition-all">UPDATE PROFILE</button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
