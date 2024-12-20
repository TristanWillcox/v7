import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Music2, Paintbrush, Film, BookOpen, Upload, Plus, Link as LinkIcon, UserPlus } from 'lucide-react';
    import { useProject } from '../contexts/ProjectContext';

    const projectTypes = [
      { id: 'music', icon: Music2, label: 'Music' },
      { id: 'visual', icon: Paintbrush, label: 'Visual Art' },
      { id: 'film', icon: Film, label: 'Film & Video' },
      { id: 'writing', icon: BookOpen, label: 'Writing' }
    ];

    export function NewProject() {
      const navigate = useNavigate();
      const { activeColor, addProject } = useProject();
      const [selectedType, setSelectedType] = useState('');
      const [formData, setFormData] = useState({
        title: '',
        description: '',
        isPrivate: false,
        neededDisciplines: [],
        coverImage: '',
        audioUrl: '',
        videoUrl: '',
        invitedUsers: []
      });
      const [disciplineInput, setDisciplineInput] = useState('');
      const [inviteUserInput, setInviteUserInput] = useState('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addProject({
          ...formData,
          tags: [selectedType, ...formData.neededDisciplines],
          color: "147, 51, 234",
          font: "font-sans",
          milestones: [],
          collaborators: 1,
          projectType: selectedType,
          isPublic: !formData.isPrivate
        });
        navigate('/');
      };

      const handleAddDiscipline = () => {
        if (disciplineInput.trim() && !formData.neededDisciplines.includes(disciplineInput.trim())) {
          setFormData({
            ...formData,
            neededDisciplines: [...formData.neededDisciplines, disciplineInput.trim()]
          });
          setDisciplineInput('');
        }
      };

      const handleRemoveDiscipline = (disciplineToRemove: string) => {
        setFormData({
          ...formData,
          neededDisciplines: formData.neededDisciplines.filter(discipline => discipline !== disciplineToRemove)
        });
      };

      const handleAddInvitedUser = () => {
        if (inviteUserInput.trim() && !formData.invitedUsers.includes(inviteUserInput.trim())) {
          setFormData({
            ...formData,
            invitedUsers: [...formData.invitedUsers, inviteUserInput.trim()]
          });
          setInviteUserInput('');
        }
      };

      const handleRemoveInvitedUser = (userToRemove: string) => {
        setFormData({
          ...formData,
          invitedUsers: formData.invitedUsers.filter(user => user !== userToRemove)
        });
      };

      return (
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-light">Create New Project</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
              style={{
                borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
              }}
            >
              <h2 className="text-xl font-light mb-4">Project Type</h2>
              <div className="grid grid-cols-4 gap-4">
                {projectTypes.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedType(id)}
                    className={`p-4 rounded-xl border border-zinc-800 flex flex-col items-center gap-2 transition-all duration-300 ${
                      selectedType === id ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
              style={{
                borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
              }}
            >
              <h2 className="text-xl font-light mb-4">Project Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Project Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white h-32"
                    placeholder="Describe your project"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                    className="bg-zinc-800 border-0 rounded-lg focus:ring-1 focus:ring-white"
                  />
                  <label htmlFor="isPrivate" className="text-sm text-zinc-400">Private Project</label>
                </div>
              </div>
            </div>

            <div
              className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
              style={{
                borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
              }}
            >
              <h2 className="text-xl font-light mb-4">Needed Creative Disciplines</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={disciplineInput}
                  onChange={(e) => setDisciplineInput(e.target.value)}
                  className="flex-1 bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                  placeholder="Enter discipline"
                />
                <button
                  type="button"
                  onClick={handleAddDiscipline}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.neededDisciplines.map((discipline) => (
                  <span
                    key={discipline}
                    className="px-3 py-1 text-zinc-300 text-sm font-light tracking-wider transition-colors duration-700 rounded-full bg-zinc-800"
                  >
                    {discipline}
                    <button
                      type="button"
                      onClick={() => handleRemoveDiscipline(discipline)}
                      className="ml-1 text-zinc-500 hover:text-zinc-400"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {formData.isPrivate && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Invite Users</h2>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={inviteUserInput}
                    onChange={(e) => setInviteUserInput(e.target.value)}
                    className="flex-1 bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                    placeholder="Enter username"
                  />
                  <button
                    type="button"
                    onClick={handleAddInvitedUser}
                    className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700"
                  >
                    <UserPlus className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.invitedUsers.map((user) => (
                    <span
                      key={user}
                      className="px-3 py-1 text-zinc-300 text-sm font-light tracking-wider transition-colors duration-700 rounded-full bg-zinc-800"
                    >
                      {user}
                      <button
                        type="button"
                        onClick={() => handleRemoveInvitedUser(user)}
                        className="ml-1 text-zinc-500 hover:text-zinc-400"
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedType === 'music' && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Add Audio Files</h2>
                <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-zinc-400" />
                    <p className="text-zinc-400">Drag and drop your audio files or</p>
                    <input
                      type="text"
                      value={formData.audioUrl}
                      onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                      className="text-white underline bg-transparent"
                      placeholder="browse files"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedType === 'visual' && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Add Visual Art</h2>
                <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-zinc-400" />
                    <p className="text-zinc-400">Drag and drop your visual art files or</p>
                    <input
                      type="text"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="text-white underline bg-transparent"
                      placeholder="browse files"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedType === 'film' && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Add Video Link</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Video Link</label>
                    <input
                      type="text"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                      placeholder="Enter video link"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedType === 'writing' && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Add Writing Files</h2>
                <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-zinc-400" />
                    <p className="text-zinc-400">Drag and drop your writing files or</p>
                    <button type="button" className="text-white underline">browse files</button>
                  </div>
                </div>
              </div>
            )}

            <div
              className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
              style={{
                borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
              }}
            >
              <h2 className="text-xl font-light mb-4">Project Cover</h2>
              <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-zinc-400" />
                  <p className="text-zinc-400">Drag and drop your cover image or</p>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="text-white underline bg-transparent"
                    placeholder="browse files"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-white text-black hover:bg-zinc-200"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      );
    }
