
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjects, saveProject } from '../services/storage';
import { Project, ProjectType } from '../types';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const projects = getProjects();
    const found = projects.find(p => p.id === id);
    if (found) {
      setProject(found);
    }
  }, [id]);

  if (!project) return null;

  const handleLike = () => {
    if (isLiked) return;
    const updated = { ...project, likes: project.likes + 1 };
    setProject(updated);
    saveProject(updated);
    setIsLiked(true);
  };

  const handleDownload = () => {
    const updated = { ...project, downloads: project.downloads + 1 };
    setProject(updated);
    saveProject(updated);

    if (project.type === ProjectType.CODE) {
      const blob = new Blob([project.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.name.replace(/\s+/g, '_')}.txt`;
      link.click();
    } else {
      window.open(project.content, '_blank');
    }
  };

  return (
    <div className="animate-fade-in pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 text-zinc-500 hover:text-red-500 transition-colors flex items-center space-x-2"
      >
        <span>← BACK TO REPOSITORY</span>
      </button>

      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-zinc-800 relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full"></div>
        
        <header className="mb-10">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase">
              {project.type}
            </span>
            <span className="text-zinc-500 font-mono-tech">{project.language}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.name}</h1>
          <p className="text-zinc-400 leading-relaxed text-lg max-w-2xl">
            {project.notes || "No additional developer notes provided for this project."}
          </p>
        </header>

        {/* Content Preview */}
        <div className="mb-10">
          {project.type === ProjectType.CODE ? (
            <div className="bg-[#0c0c0c] rounded-[2rem] p-6 border border-zinc-800 font-mono-tech text-sm overflow-x-auto hide-scrollbar">
              <pre className="text-red-500/80 leading-6">
                <code>{project.content}</code>
              </pre>
            </div>
          ) : (
            <div className="aspect-video bg-zinc-900 rounded-[2rem] border border-zinc-800 flex items-center justify-center overflow-hidden">
              {project.previewUrl ? (
                <img src={project.previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
              ) : (
                <div className="text-zinc-600 flex flex-col items-center">
                  <span className="text-4xl mb-2">📁</span>
                  <span>PREVIEW NOT AVAILABLE</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats and Interaction */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-800 pt-10 space-y-6 md:space-y-0">
          <div className="flex space-x-12">
            <div className="text-center">
              <p className="text-xs font-mono-tech text-zinc-500 mb-1">LIKES</p>
              <p className="text-2xl font-bold">{project.likes}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-mono-tech text-zinc-500 mb-1">DOWNLOADS</p>
              <p className="text-2xl font-bold">{project.downloads}</p>
            </div>
          </div>

          <div className="flex space-x-4 w-full md:w-auto">
            <button 
              onClick={handleLike}
              className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-8 py-4 rounded-[2.5rem] font-bold transition-all ${isLiked ? 'bg-zinc-800 text-zinc-500 cursor-default' : 'bg-white text-black hover:bg-zinc-200'}`}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{isLiked ? 'LIKED' : 'LIKE'}</span>
            </button>
            <button 
              onClick={handleDownload}
              className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-8 py-4 rounded-[2.5rem] bg-red-600 hover:bg-red-700 text-white font-bold transition-all red-glow"
            >
              <span>⬇️</span>
              <span>DOWNLOAD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
