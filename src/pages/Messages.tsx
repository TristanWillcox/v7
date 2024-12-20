// src/pages/Messages.tsx
import React, { useState } from 'react';
import { MessageSquare, Search, Phone, Video, MoreVertical, Send } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const conversations = [
  {
    id: 1,
    name: "Alex Chen",
    lastMessage: "The latest track is sounding great! I think we should...",
    time: "2m ago",
    unread: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Sarah Williams",
    lastMessage: "I've uploaded the new concept art to the project folder",
    time: "1h ago",
    unread: false,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  }
];

export function Messages() {
  const { activeColor } = useProject();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending the message
      setMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <div className="w-80 border-r border-zinc-800 pr-4">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-8 w-8" />
          <h1 className="text-3xl font-light tracking-wider">Messages</h1>
        </div>

        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-700 ${
                conversation.unread ? 'bg-zinc-800/50' : 'hover:bg-zinc-800/30'
              }`}
              style={{
                backgroundColor: conversation.unread && activeColor
                  ? `rgba(${activeColor}, 0.1)`
                  : undefined
              }}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{conversation.name}</h3>
                    <span className="text-xs text-zinc-400">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex-1 p-4 border-b border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <h2 className="text-xl font-light">{selectedConversation.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-zinc-400 hover:text-white">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="text-zinc-400 hover:text-white">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="text-zinc-400 hover:text-white">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {/* Messages will be displayed here */}
              </div>
            </div>
            <div className="p-4 border-t border-zinc-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white transition-colors duration-700"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MessageSquare className="h-12 w-12 mx-auto text-zinc-600" />
              <h2 className="text-xl font-light">Select a conversation</h2>
              <p className="text-zinc-400">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
