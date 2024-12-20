import React, { useState } from 'react';
    import { useParams } from 'react-router-dom';
    import { Users, MessageSquare, Calendar, Link as LinkIcon, Settings, Music2, Paintbrush, BookOpen, Video, ArrowUp, UserPlus, Check } from 'lucide-react';
    import { useProject } from '../contexts/ProjectContext';

    type Tab = 'overview' | 'hangout' | 'team' | 'contributions' | 'board';
    type SubTab = 'visual' | 'audio' | 'story';

    export function Project() {
      const { id } = useParams();
      const { activeColor, projects } = useProject();
      const [activeTab, setActiveTab] = useState<Tab>('overview');
      const [activeSubTab, setActiveSubTab] = useState<SubTab | null>(null);
      const [messages, setMessages] = useState([
        { id: 1, user: 'User1', text: 'First message', votes: 0 },
        { id: 2, user: 'User2', text: 'Second message', votes: 0 },
      ]);
      const project = projects.find(p => p.id === Number(id));
      const [newMessage, setNewMessage] = useState('');
      const [isJoined, setIsJoined] = useState(false);
      const [isOwner, setIsOwner] = useState(true);
      const [teamMembers, setTeamMembers] = useState<string[]>([]);

      if (!project) return <div>Project not found</div>;

      const tabs = [
        { id: 'overview' as Tab, label: 'Overview', icon: Calendar },
        { id: 'hangout' as Tab, label: 'Hangout', icon: Video },
        { id: 'team' as Tab, label: 'Team', icon: Users },
        { id: 'contributions' as Tab, label: 'Contributions', icon: Paintbrush },
        { id: 'board' as Tab, label: 'Message Board', icon: MessageSquare },
      ];

      const subTabs = [
        { id: 'visual' as SubTab, label: 'Visual', icon: Paintbrush },
        { id: 'audio' as SubTab, label: 'Audio', icon: Music2 },
        { id: 'story' as SubTab, label: 'Story', icon: BookOpen },
      ];

      const calculateProgress = (milestones) => {
        const completed = milestones.filter(milestone => milestone.completed).length;
        return (completed / milestones.length) * 100;
      };

      const handleAddMessage = () => {
        if (newMessage.trim()) {
          setMessages([...messages, { id: Date.now(), user: 'CurrentUser', text: newMessage, votes: 0 }]);
          setNewMessage('');
        }
      };

      const handleUpvote = (messageId: number) => {
        setMessages(messages.map(msg =>
          msg.id === messageId ? { ...msg, votes: msg.votes + 1 } : msg
        ));
      };

      const handleJoinProject = () => {
        setIsJoined(true);
        setTeamMembers(prevMembers => [...prevMembers, 'New User']);
        setIsOwner(false);
      };

      const handleBecomeOwner = () => {
        setIsOwner(true);
      };

      return (
        <div className="space-y-8">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img
              src={project.coverImage || project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h1 className="text-4xl font-light mb-2">{project.title}</h1>
              <p className="text-zinc-300">{project.description}</p>
            </div>
          </div>

          <div className="flex gap-4 border-b border-zinc-800 pb-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  if (id !== 'contributions') {
                    setActiveSubTab(null);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === id ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === id
                    ? activeColor
                      ? `rgba(${activeColor}, 0.1)`
                      : 'rgba(255, 255, 255, 0.05)'
                    : 'transparent',
                  boxShadow: activeTab === id && activeColor
                    ? `0 0 20px rgba(${activeColor}, 0.1)`
                    : 'none'
                }}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'contributions' && (
            <div className="flex gap-4 border-b border-zinc-800 pb-4">
              {subTabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSubTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSubTab === id ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: activeSubTab === id
                      ? activeColor
                        ? `rgba(${activeColor}, 0.1)`
                        : 'rgba(255, 255, 255, 0.05)'
                      : 'transparent',
                    boxShadow: activeSubTab === id && activeColor
                      ? `0 0 20px rgba(${activeColor}, 0.1)`
                      : 'none'
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Project Overview</h2>
                    <div className="flex flex-col space-y-2">
                      {project.milestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className={`text-sm ${milestone.completed ? 'text-green-500' : 'text-zinc-400'}`}>
                            {milestone.name}
                          </span>
                          <span className={`text-sm ${milestone.completed ? 'text-green-500' : 'text-zinc-400'}`}>
                            {milestone.completed ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2.5 mt-4">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${calculateProgress(project.milestones)}%` }}
                      ></div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-light mb-2">Project Goals</h3>
                      <ul className="list-disc list-inside text-zinc-400">
                        <li>Complete sound design by end of next week</li>
                        <li>Finalize mixing by end of the month</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-light mb-2">Project Deadlines</h3>
                      <ul className="list-disc list-inside text-zinc-400">
                        <li>Sound Design: 2024-07-15</li>
                        <li>Mixing: 2024-07-30</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hangout' && (
                <div className="space-y-6">
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Project Hangout</h2>
                    <p className="text-zinc-400">This is the hangout section of the project. You can add more details here.</p>
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="space-y-6">
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Project Team</h2>
                    <ul className="list-disc list-inside text-zinc-400">
                      {teamMembers.map((member, index) => (
                        <li key={index}>{member}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'contributions' && activeSubTab === 'visual' && (
                <div className="space-y-6">
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Visual Assets</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-video bg-zinc-800 rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contributions' && activeSubTab === 'audio' && (
                <div className="space-y-6">
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Audio Tracks</h2>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                          <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                            <Music2 className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="h-4 w-1/3 bg-zinc-700 rounded mb-2"></div>
                            <div className="h-2 w-full bg-zinc-700 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contributions' && activeSubTab === 'story' && (
                <div className="space-y-6">
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Story Elements</h2>
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="p-4 bg-zinc-800/50 rounded-lg">
                          <div className="h-4 w-1/4 bg-zinc-700 rounded mb-2"></div>
                          <div className="space-y-2">
                            <div className="h-2 w-full bg-zinc-700 rounded"></div>
                            <div className="h-2 w-5/6 bg-zinc-700 rounded"></div>
                            <div className="h-2 w-4/6 bg-zinc-700 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'board' && (
                <div className="space-y-6">
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Message Board</h2>
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div key={message.id} className="bg-zinc-800/50 rounded-lg p-4 flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                            <Users className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{message.user}</span>
                              <button
                                onClick={() => handleUpvote(message.id)}
                                className="text-zinc-400 hover:text-white flex items-center gap-1"
                              >
                                <ArrowUp className="h-4 w-4" />
                                <span className="text-xs">{message.votes}</span>
                              </button>
                            </div>
                            <p className="text-zinc-400">{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                        placeholder="Type a message..."
                      />
                      <button
                        onClick={handleAddMessage}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Project Links</h2>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-white">
                    <LinkIcon className="h-4 w-4" />
                    Project Documentation
                  </a>
                  <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-white">
                    <LinkIcon className="h-4 w-4" />
                    Resource Library
                  </a>
                </div>
              </div>

              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <button
                  onClick={handleJoinProject}
                  className={`w-full flex items-center justify-center gap-2 text-white rounded-lg p-2 transition-colors duration-700 ${
                    isJoined ? 'bg-green-500 hover:bg-green-600' : 'bg-zinc-700 hover:bg-zinc-600'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="h-4 w-4" />
                      Joined
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Join Project
                    </>
                  )}
                </button>
              </div>

              {!isOwner && (
                <button
                  onClick={handleBecomeOwner}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700"
                >
                  Become Owner
                </button>
              )}

              {isOwner && (
                <div
                  className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                  style={{
                    borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                  }}
                >
                  <h2 className="text-xl font-light mb-4">Project Settings</h2>
                  <button className="flex items-center gap-2 text-zinc-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                    Manage Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
