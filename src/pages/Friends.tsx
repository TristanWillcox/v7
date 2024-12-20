import React, { useState, useEffect } from 'react';
    import { MessageSquare, Search, Phone, Video, MoreVertical, Send, UserPlus, Paperclip, UserRound } from 'lucide-react';
    import { useProject } from '../contexts/ProjectContext';

    const initialFriends = [
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

    export function Friends() {
      const { activeColor } = useProject();
      const [friends, setFriends] = useState(initialFriends);
      const [selectedFriend, setSelectedFriend] = useState(null);
      const [message, setMessage] = useState('');
      const [addFriendUsername, setAddFriendUsername] = useState('');
      const [messages, setMessages] = useState<{ id: number, sender: string, text: string, type: 'text' | 'attachment' }[]>([]);
      const [attachment, setAttachment] = useState<File | null>(null);

      useEffect(() => {
        const storedFriends = localStorage.getItem('friends');
        if (storedFriends) {
          setFriends(JSON.parse(storedFriends));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('friends', JSON.stringify(friends));
      }, [friends]);

      const handleSendMessage = () => {
        if (message.trim()) {
          setMessages([...messages, { id: Date.now(), sender: 'me', text: message, type: 'text' }]);
          setMessage('');
        }
        if (attachment) {
          setMessages([...messages, { id: Date.now(), sender: 'me', text: attachment.name, type: 'attachment' }]);
          setAttachment(null);
        }
      };

      const handleAddFriend = () => {
        if (addFriendUsername.trim()) {
          const newFriend = {
            id: Date.now(),
            name: addFriendUsername,
            lastMessage: "New Friend",
            time: "now",
            unread: false,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
          };
          setFriends([...friends, newFriend]);
          setAddFriendUsername('');
        }
      };

      const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          setAttachment(e.target.files[0]);
        }
      };

      return (
        <div className="flex h-[calc(100vh-8rem)]">
          {/* Sidebar */}
          <div className="w-80 border-r border-zinc-800 pr-4">
            <div className="flex items-center gap-3 mb-6">
              <UserRound className="h-8 w-8" />
              <h1 className="text-3xl font-light tracking-wider">Friends</h1>
            </div>

            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Add friend by username"
                className="flex-1 bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white transition-colors duration-700"
                value={addFriendUsername}
                onChange={(e) => setAddFriendUsername(e.target.value)}
              />
              <button
                className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700"
                onClick={handleAddFriend}
              >
                <UserPlus className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-700 ${
                    friend.unread ? 'bg-zinc-800/50' : 'hover:bg-zinc-800/30'
                  }`}
                  style={{
                    backgroundColor: friend.unread && activeColor
                      ? `rgba(${activeColor}, 0.1)`
                      : undefined
                  }}
                  onClick={() => setSelectedFriend(friend)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{friend.name}</h3>
                        <span className="text-xs text-zinc-400">{friend.time}</span>
                      </div>
                      <p className="text-sm text-zinc-400 truncate">{friend.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Box */}
          <div className="flex-1 flex flex-col">
            {selectedFriend ? (
              <>
                <div className="flex-1 p-4 border-b border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedFriend.avatar}
                        alt={selectedFriend.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <h2 className="text-xl font-light">{selectedFriend.name}</h2>
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
                    {messages.map(msg => (
                      <div key={msg.id} className={`p-3 rounded-lg ${msg.sender === 'me' ? 'bg-zinc-800/50 ml-auto w-fit' : 'bg-zinc-800/30 mr-auto w-fit'}`}>
                        {msg.type === 'text' ? (
                          <p className="text-sm">{msg.text}</p>
                        ) : (
                          <p className="text-sm text-blue-400">Attachment: {msg.text}</p>
                        )}
                      </div>
                    ))}
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
                  <input
                    type="file"
                    id="attachment"
                    className="hidden"
                    onChange={handleAttachmentChange}
                  />
                  <label htmlFor="attachment">
                    <Paperclip className="h-5 w-5 text-zinc-400 hover:text-white cursor-pointer" />
                  </label>
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
                  <h2 className="text-xl font-light">Select a friend</h2>
                  <p className="text-zinc-400">Choose a friend from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
