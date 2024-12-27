import React, { useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import {
      Users,
      MessageSquare,
      Calendar,
      Link as LinkIcon,
      Settings,
      Music2,
      Paintbrush,
      BookOpen,
      Video,
      ArrowUp,
      UserPlus,
      Check,
      Edit2,
      Trash2,
      PlusCircle,
      GitFork,
    } from 'lucide-react';
    import { useProject } from '../contexts/ProjectContext';

    type Tab = 'overview' | 'hangout' | 'team' | 'contributions' | 'board';
    type SubTab = 'visual' | 'audio' | 'story';

    interface ProjectForm {
      title: string;
      description: string;
      isPublic: boolean;
    }

    interface Track {
      id: number;
      userId: number;
      userName: string;
      audioUrl: string; // Placeholder for now
      volume: number;
      isMuted: boolean;
    }

    interface StoryElement {
      id: number;
      originalText: string;
      contributions: { userId: number; userName: string; text: string }[];
    }

    interface VisualAsset {
      id: number;
      userId: number;
      userName: string;
      assetUrl: string;
    }

    export function Project() {
      const { id } = useParams();
      const navigate = useNavigate();
      const { activeColor, projects, addProject } = useProject();
      const [activeTab, setActiveTab] = useState<Tab>('overview');
      const [activeSubTab, setActiveSubTab] = useState<SubTab | null>(null);
      const [messages, setMessages] = useState([
        { id: 1, user: 'User1', text: 'First message', votes: 0 },
        { id: 2, user: 'User2', text: 'Second message', votes: 0 },
      ]);
      const project = projects.find((p) => p.id === Number(id));
      const [newMessage, setNewMessage] = useState('');
      const [isJoined, setIsJoined] = useState(false);
      const [isOwner, setIsOwner] = useState(true);
      const [teamMembers, setTeamMembers] = useState<string[]>([]);
      const [showModal, setShowModal] = useState(false);
      const [projectForm, setProjectForm] = useState<ProjectForm>(
        project
          ? {
              title: project.title,
              description: project.description,
              isPublic: project.isPublic,
            }
          : {
              title: '',
              description: '',
              isPublic: true,
            },
      );
      const [showBranchModal, setShowBranchModal] = useState(false);
      const [newBranchName, setNewBranchName] = useState('');

      // Placeholder tracks for now
      const [tracks, setTracks] = useState<Track[]>([
        {
          id: 1,
          userId: 1,
          userName: 'User 1',
          audioUrl: '',
          volume: 1,
          isMuted: false,
        },
        {
          id: 2,
          userId: 2,
          userName: 'User 2',
          audioUrl: '',
          volume: 1,
          isMuted: false,
        },
      ]);

      const [storyElements, setStoryElements] = useState<StoryElement[]>([
        {
          id: 1,
          originalText: 'The quick brown [animal] jumps over the lazy [animal].',
          contributions: [
            { userId: 1, userName: 'User 1', text: 'fox' },
            { userId: 2, userName: 'User 2', text: 'dog' },
          ],
        },
        {
          id: 2,
          originalText: 'In a [place], there lived a [person].',
          contributions: [
            { userId: 1, userName: 'User 1', text: 'forest' },
            { userId: 2, userName: 'User 2', text: 'wizard' },
          ],
        },
      ]);
      const [newContribution, setNewContribution] = useState('');

      const [visualAssets, setVisualAssets] = useState<VisualAsset[]>([
        {
          id: 1,
          userId: 1,
          userName: 'User 1',
          assetUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80',
        },
        {
          id: 2,
          userId: 2,
          userName: 'User 2',
          assetUrl: 'https://images.unsplash.com/photo-1515462250-33bd709cbe85?auto=format&fit=crop&q=80',
        },
      ]);

      if (!project) return <div>Project not found</div>;

      const tabs = [
        { id: 'overview' as Tab, label: 'Overview', icon: Calendar },
        { id: 'hangout' as Tab, label: 'Hangout', icon: Video },
        { id: 'team' as Tab, label: 'Team', icon: Users },
        {
          id: 'contributions' as Tab,
          label: 'Contributions',
          icon: Paintbrush,
        },
        { id: 'board' as Tab, label: 'Message Board', icon: MessageSquare },
      ];

      const subTabs = [
        { id: 'visual' as SubTab, label: 'Visual', icon: Paintbrush },
        { id: 'audio' as SubTab, label: 'Audio', icon: Music2 },
        { id: 'story' as SubTab, label: 'Story', icon: BookOpen },
      ];

      const calculateProgress = (milestones) => {
        const completed = milestones.filter(
          (milestone) => milestone.completed,
        ).length;
        return (completed / milestones.length) * 100;
      };

      const handleAddMessage = () => {
        if (newMessage.trim()) {
          setMessages([
            ...messages,
            { id: Date.now(), user: 'CurrentUser', text: newMessage, votes: 0 },
          ]);
          setNewMessage('');
        }
      };

      const handleUpvote = (messageId: number) => {
        setMessages(
          messages.map((msg) =>
            msg.id === messageId ? { ...msg, votes: msg.votes + 1 } : msg,
          ),
        );
      };

      const handleJoinProject = () => {
        setIsJoined(true);
        setTeamMembers((prevMembers) => [...prevMembers, 'New User']);
        setIsOwner(false);
      };

      const handleBecomeOwner = () => {
        setIsOwner(true);
      };

      const handleOpenModal = () => {
        setShowModal(true);
      };

      const handleCloseModal = () => {
        setShowModal(false);
      };

      const handleFormChange = (
        field: keyof ProjectForm,
        value: string | boolean,
      ) => {
        setProjectForm({
          ...projectForm,
          [field]: value,
        });
      };

      const handleSaveProject = () => {
        addProject({
          ...project,
          ...projectForm,
        });
        setShowModal(false);
      };

      const handleDeleteProject = () => {
        // Implement delete project logic here
        navigate('/');
      };

      const handleAddTrack = () => {
        // Placeholder for adding a new track
        console.log('Add Track clicked');
      };

      const handleAddContribution = (elementId: number) => {
        if (newContribution.trim()) {
          setStoryElements(prevElements =>
            prevElements.map(element =>
              element.id === elementId ? { ...element, contributions: [...element.contributions, { userId: Date.now(), userName: 'CurrentUser', text: newContribution }] } : element
            )
          );
          setNewContribution('');
        }
      };

      const handleAddVisualAsset = () => {
        // Placeholder for adding a new visual asset
        console.log('Add Visual Asset clicked');
      };

      const handleBranchProject = () => {
        setShowBranchModal(true);
      };

      const handleConfirmBranch = () => {
        if (newBranchName.trim() && project) {
          const branchedProject = {
            ...project,
            id: Date.now(),
            title: newBranchName,
            parentProjectId: project.id,
          };
          addProject(branchedProject);
          setNewBranchName('');
          setShowBranchModal(false);
          navigate(`/project/${branchedProject.id}`);
        }
      };

      const handleCancelBranch = () => {
        setNewBranchName('');
        setShowBranchModal(false);
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

          <div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  if (id !== 'contributions') {
                    setActiveSubTab(null);
                  } else {
                    setActiveSubTab('audio');
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === id
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === id
                    ? activeColor
                      ? `rgba(${activeColor}, 0.1)`
                      : 'rgba(255, 255, 255, 0.05)'
                    : 'transparent',
                  boxShadow:
                    activeTab === id && activeColor
                      ? `0 0 20px rgba(${activeColor}, 0.1)`
                      : 'none',
                }}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
            <button
              onClick={handleJoinProject}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-700 ${
                isJoined ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-zinc-700 hover:bg-zinc-600 text-white'
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
            {isOwner && (
              <>
                <button
                  onClick={handleOpenModal}
                  className="px-3 py-1 rounded-lg flex items-center gap-2 transition-colors duration-700 text-sm"
                  style={{
                    backgroundColor: activeColor ? `rgba(${activeColor}, 0.1)` : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={handleBranchProject}
                  className="px-3 py-1 rounded-lg flex items-center gap-2 transition-colors duration-700 text-sm"
                  style={{
                    backgroundColor: activeColor ? `rgba(${activeColor}, 0.1)` : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <GitFork className="h-4 w-4" />
                  Branch
                </button>
              </>
            )}
          </div>

          {activeTab === 'contributions' && (
            <div className="flex gap-4 border-b border-zinc-800 pb-4">
              {subTabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSubTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSubTab === id
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: activeSubTab === id
                      ? activeColor
                        ? `rgba(${activeColor}, 0.1)`
                        : 'rgba(255, 255, 255, 0.05)'
                      : 'transparent',
                    boxShadow:
                      activeSubTab === id && activeColor
                        ? `0 0 20px rgba(${activeColor}, 0.1)`
                        : 'none',
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 relative"
                style={{
                  borderColor: activeColor
                    ? `rgba(${activeColor}, 0.2)`
                    : undefined,
                }}
              >
                <div className="mb-4">
                  <h2 className="text-xl font-light">Project Overview</h2>
                </div>
                <div className="flex flex-col space-y-2">
                  {project.milestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span
                        className={`text-sm ${
                          milestone.completed
                            ? 'text-green-500'
                            : 'text-zinc-400'
                        }`}
                      >
                        {milestone.name}
                      </span>
                      <span
                        className={`text-sm ${
                          milestone.completed
                            ? 'text-green-500'
                            : 'text-zinc-400'
                        }`}
                      >
                        {milestone.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2.5 mt-4">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{
                      width: `${calculateProgress(project.milestones)}%`,
                    }}
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
                  <h3 className="text-lg font-light mb-2">
                    Project Deadlines
                  </h3>
                  <ul className="list-disc list-inside text-zinc-400">
                    <li>Sound Design: 2024-07-15</li>
                    <li>Mixing: 2024-07-30</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-light mb-2">Project Links</h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-zinc-400 hover:text-white"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Project Documentation
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-zinc-400 hover:text-white"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Resource Library
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Hangout Tab Content */}
            {activeTab === 'hangout' && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor
                    ? `rgba(${activeColor}, 0.2)`
                    : undefined,
                }}
              >
                <h2 className="text-xl font-light mb-4">Project Hangout</h2>
                <p className="text-zinc-400">
                  This is the hangout section of the project. You can add more
                  details here.
                </p>
              </div>
            )}

            {/* Team Tab Content */}
            {activeTab === 'team' && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor
                    ? `rgba(${activeColor}, 0.2)`
                    : undefined,
                }}
              >
                <h2 className="text-xl font-light mb-4">Project Team</h2>
                <ul className="list-disc list-inside text-zinc-400">
                  {teamMembers.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contributions Tab Content */}
            {activeTab === 'contributions' && (
              <div className="space-y-6">
                {/* Visual Subtab */}
                {activeSubTab === 'visual' && (
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor
                        ? `rgba(${activeColor}, 0.2)`
                        : undefined,
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Visual Assets</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-light mb-2">
                          Base Visual
                        </h3>
                        <div className="w-full h-48 bg-zinc-800 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-light mb-2">
                          Visual Assets
                        </h3>
                        {visualAssets.map((asset) => (
                          <div
                            key={asset.id}
                            className="flex items-center justify-between p-2 border border-zinc-800 rounded-lg"
                          >
                            <span className="text-zinc-300">
                              {asset.userName}
                            </span>
                            <div className="w-48 h-10 bg-zinc-800 rounded">
                              <img src={asset.assetUrl} alt="Visual Asset" className="w-full h-full object-cover rounded" />
                            </div>
                            <div className="flex gap-2">
                              <button className="text-zinc-400 hover:text-white">
                                <PlusCircle className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button onClick={handleAddVisualAsset} className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-colors duration-700">Add Visual Asset</button>
                    </div>
                  </div>
                )}

                {/* Audio Subtab */}
                {activeSubTab === 'audio' && (
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor
                        ? `rgba(${activeColor}, 0.2)`
                        : undefined,
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Audio Tracks</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-light mb-2">
                          Master Track
                        </h3>
                        <audio controls className="w-full"></audio>
                      </div>
                      <div>
                        <h3 className="text-lg font-light mb-2">
                          Master + Selected Contribution
                        </h3>
                        <audio controls className="w-full"></audio>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-light mb-2">Tracks</h3>
                        {tracks.map((track) => (
                          <div
                            key={track.id}
                            className="flex items-center justify-between p-2 border border-zinc-800 rounded-lg"
                          >
                            <span className="text-zinc-300">
                              {track.userName}
                            </span>
                            <div className="w-48 h-10 bg-zinc-800 rounded"></div>
                            <div className="flex gap-2">
                              <button className="text-zinc-400 hover:text-white">
                                <PlusCircle className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleAddTrack}
                        className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-colors duration-700"
                      >
                        Add Track
                      </button>
                    </div>
                  </div>
                )}

                {/* Story Subtab */}
                {activeSubTab === 'story' && (
                  <div
                    className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                    style={{
                      borderColor: activeColor
                        ? `rgba(${activeColor}, 0.2)`
                        : undefined,
                    }}
                  >
                    <h2 className="text-xl font-light mb-4">Story Elements</h2>
                    <div className="space-y-4">
                      {storyElements.map((element) => (
                        <div key={element.id} className="p-4 bg-zinc-800/50 rounded-lg">
                          <p className="text-zinc-400">
                            {element.originalText.split(/\[.*?\]/).map((text, index, array) => {
                              const match = element.originalText.match(/\[(.*?)\]/g)?.[index];
                              if (match) {
                                const contributions = element.contributions.filter(c => c.userName === 'CurrentUser');
                                const contribution = contributions.length > 0 ? contributions[contributions.length - 1].text : null;
                                return (
                                  <React.Fragment key={index}>
                                    {text}
                                    <span className="text-white">{contribution || match.slice(1, -1)}</span>
                                  </React.Fragment>
                                );
                              }
                              return text;
                            })}
                          </p>
                          <div className="flex gap-2 mt-4">
                            <input
                              type="text"
                              value={newContribution}
                              onChange={(e) => setNewContribution(e.target.value)}
                              className="flex-1 bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                              placeholder="Add a contribution..."
                            />
                            <button onClick={() => handleAddContribution(element.id)} className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700">Add</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Board Tab Content */}
            {activeTab === 'board' && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor
                    ? `rgba(${activeColor}, 0.2)`
                    : undefined,
                }}
              >
                <h2 className="text-xl font-light mb-4">Message Board</h2>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="bg-zinc-800/50 rounded-lg p-4 flex items-start gap-4"
                    >
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
            )}

            {!isOwner && (
              <button
                onClick={handleBecomeOwner}
                className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700 w-full"
              >
                Become Owner
              </button>
            )}

            {/* Project Settings Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-lg space-y-4">
                  <h2 className="text-xl font-light">Manage Project</h2>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) =>
                        handleFormChange('title', e.target.value)
                      }
                      className="w-full bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Description
                    </label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) =>
                        handleFormChange('description', e.target.value)
                      }
                      className="w-full bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white h-32"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={projectForm.isPublic}
                      onChange={(e) =>
                        handleFormChange('isPublic', e.target.checked)
                      }
                      className="bg-zinc-800 border-0 rounded-lg focus:ring-1 focus:ring-white"
                    />
                    <label htmlFor="isPublic" className="text-sm text-zinc-400">
                      Public Project
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProject}
                      className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Branch Project Modal */}
            {showBranchModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-lg space-y-4">
                  <h2 className="text-xl font-light">Create a Branch</h2>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      value={newBranchName}
                      onChange={(e) => setNewBranchName(e.target.value)}
                      className="w-full bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                      placeholder="Enter branch name"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleCancelBranch}
                      className="px-4 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmBranch}
                      className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200"
                    >
                      Create Branch
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
