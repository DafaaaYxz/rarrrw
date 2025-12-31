
import React from 'react';
import { getAdmins } from '../services/storage';

const Profile: React.FC = () => {
  const admins = getAdmins();

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      <header className="text-center">
        <h2 className="text-3xl font-bold mb-2">ADMIN & OWNER</h2>
        <p className="text-zinc-500">Keluarga Besar Source Code Hub</p>
      </header>

      {admins.map((admin, idx) => (
        <div key={admin.id} className="glass-card rounded-[2.5rem] p-8 md:p-12 border-zinc-800 flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-10 relative overflow-hidden">
          {/* Subtle rank tag */}
          <div className="absolute top-6 right-8 text-xs font-mono-tech text-red-600 bg-red-600/10 px-4 py-1 rounded-full border border-red-900/50">
            {admin.role.toUpperCase()}
          </div>

          <div className="shrink-0">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] border-4 border-red-600 overflow-hidden red-glow">
              {/* Fix: Property 'admin_1' does not exist on type 'Admin'. Comparing id to 'admin_1' string instead. */}
              <img src={admin.id === 'admin_1' ? 'https://picsum.photos/seed/silver/400/400' : admin.photoUrl} alt={admin.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-bold mb-4">{admin.name}</h3>
            <div className="relative mb-6">
               <span className="text-red-600 text-4xl absolute -top-4 -left-6 opacity-30">"</span>
               <p className="text-zinc-300 text-lg italic leading-relaxed">
                {admin.quote}
               </p>
               <span className="text-red-600 text-4xl absolute -bottom-8 -right-4 opacity-30">"</span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-8">
              {admin.hashtags.map(tag => (
                <span key={tag} className="text-sm font-mono-tech bg-zinc-900 text-red-500 px-4 py-1 rounded-full border border-zinc-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
