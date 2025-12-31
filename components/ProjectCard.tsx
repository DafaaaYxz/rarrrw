
import React from 'react';
import { Link } from 'react-router-dom';
import { Project, ProjectType } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`} className="block group">
      <div className="glass-card rounded-[2.5rem] p-6 mb-4 flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 hover:scale-[1.02] border-zinc-800 red-glow-hover overflow-hidden relative">
        {/* Animated Slide Bar */}
        <div className="absolute left-0 top-0 w-1 h-full bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.type === ProjectType.CODE ? 'bg-zinc-800 text-red-500' : 'bg-red-600 text-white'}`}>
              {project.type}
            </span>
            <span className="text-zinc-500 font-mono-tech text-xs">{project.language}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold group-hover:text-red-500 transition-colors">
            {project.name}
          </h3>
        </div>

        <div className="flex items-center space-x-6 mt-4 md:mt-0 text-zinc-400">
          <div className="flex items-center space-x-2">
            <span className="text-red-500">❤️</span>
            <span className="font-mono-tech">{project.likes}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-500">⬇️</span>
            <span className="font-mono-tech">{project.downloads}</span>
          </div>
          <div className="hidden md:block">
             <span className="text-red-600 group-hover:translate-x-2 transition-transform inline-block">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
