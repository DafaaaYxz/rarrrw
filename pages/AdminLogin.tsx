
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_CREDENTIALS } from '../config';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = AUTH_CREDENTIALS.find(u => u.username === username && u.password === password);
    
    if (user) {
      localStorage.setItem('hub_auth_session', JSON.stringify({
        username: user.username,
        timestamp: Date.now()
      }));
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials access denied.');
    }
  };

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="glass-card rounded-[2.5rem] p-10 md:p-12 border-zinc-800 w-full max-w-md red-glow">
        <h2 className="text-3xl font-bold mb-8 text-center">SYSTEM ACCESS</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono-tech text-zinc-500 mb-2 uppercase tracking-widest">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3 focus:outline-none focus:border-red-600 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono-tech text-zinc-500 mb-2 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3 focus:outline-none focus:border-red-600 transition-all"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full transition-all shadow-lg hover:shadow-red-900/50"
          >
            INITIALIZE SESSION
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
