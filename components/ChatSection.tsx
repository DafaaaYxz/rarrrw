
import React, { useState, useEffect, useRef } from 'react';
import { getAdmins, saveChatMessage, getChatMessages } from '../services/storage';
import { Admin, ChatMessage } from '../types';

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeAdmin, setActiveAdmin] = useState<Admin | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const admins = getAdmins();

  const userIdentifier = useRef(`USER${Math.floor(Math.random() * 9999) + 1}`);

  useEffect(() => {
    setMessages(getChatMessages());
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: userIdentifier.current,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAdmin: false
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    saveChatMessage(newMsg);
    setInputText('');

    // Simulated Auto Reply
    if (activeAdmin) {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: activeAdmin.name,
          text: `Halo ${userIdentifier.current}, pesan Anda sudah diterima oleh ${activeAdmin.role}. Silakan tunggu sebentar.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAdmin: true
        };
        const nextMsgs = [...updated, reply];
        setMessages(nextMsgs);
        saveChatMessage(reply);
      }, 1500);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
        <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm">💬</span>
        <span>CHAT SYSTEM</span>
      </h2>

      {!activeAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {admins.map(admin => (
            <div key={admin.id} className="glass-card rounded-[2.5rem] p-6 border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={admin.photoUrl} alt={admin.name} className="w-12 h-12 rounded-full border-2 border-red-600" />
                <div>
                  <h3 className="font-bold text-lg">{admin.name}</h3>
                  <p className="text-xs text-green-500">● Online</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveAdmin(admin)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors"
              >
                CHAT {admin.role.toUpperCase()}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-[2.5rem] border-zinc-800 flex flex-col h-[400px]">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={activeAdmin.photoUrl} alt={activeAdmin.name} className="w-8 h-8 rounded-full" />
              <span className="font-bold">{activeAdmin.name}</span>
            </div>
            <button onClick={() => setActiveAdmin(null)} className="text-zinc-500 hover:text-white">Close</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
            {messages.length === 0 && (
              <p className="text-center text-zinc-600 text-sm italic">Mulai percakapan dengan {activeAdmin.name}...</p>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.isAdmin ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-[1.5rem] ${m.isAdmin ? 'bg-zinc-800 rounded-bl-none' : 'bg-red-600 rounded-br-none'}`}>
                  <p className="text-sm font-bold opacity-70 mb-1">{m.sender}</p>
                  <p className="text-sm">{m.text}</p>
                  <p className="text-[10px] text-right mt-1 opacity-50">{m.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-zinc-800 flex space-x-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ketik pesan..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-red-600"
            />
            <button 
              onClick={handleSend}
              className="bg-red-600 hover:bg-red-700 p-2 rounded-full w-10 h-10 flex items-center justify-center"
            >
              🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
