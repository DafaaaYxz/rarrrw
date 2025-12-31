
import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/storage';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import ChatSection from '../components/ChatSection';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {/* Search Section */}
      <div className="mb-10 relative">
        <input 
          type="text"
          placeholder="Cari proyek atau bahasa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] px-8 py-5 text-lg font-medium focus:outline-none focus:border-red-600 transition-all red-glow-hover"
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500">
          🔍
        </div>
      </div>

      {/* Projects Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-zinc-400">PROJECT FEED</h2>
          <span className="text-xs font-mono-tech text-red-600">LATEST UPDATES</span>
        </div>
        
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="glass-card rounded-[2.5rem] p-12 text-center text-zinc-500 border-zinc-800 italic">
            Proyek tidak ditemukan.
          </div>
        )}
      </div>

      {/* Chat Admin Section */}
      <ChatSection />
    </div>
  );
};

export default Home;
