import React, { useState, useEffect } from 'react';
    import { User, Edit2, MapPin, Link as LinkIcon, Twitter, Github, Trophy, Star, Upload, Plus } from 'lucide-react';
    import { useProject } from '../contexts/ProjectContext';

    const initialProfile = {
      name: "Alex Chen",
      bio: "Sound Designer & Music Producer",
      location: "San Francisco, CA",
      website: "alexchen.com",
      twitter: "@alexchen",
      github: "alexchen",
      specializations: ["Sound Design", "Music Production", "Mixing"],
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      coverImage: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80"
    };

    const projects = [
      {
        title: "Neon Nights",
        role: "Sound Designer",
        status: "In Progress",
        collaborators: 4,
        image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80",
        milestones: [
          { name: "Concept Development", completed: true },
          { name: "Sound Design", completed: false },
          { name: "Mixing", completed: false },
          { name: "Mastering", completed: false }
        ]
      },
      {
        title: "Urban Stories",
        role: "Project Lead",
        status: "Completed",
        collaborators: 6,
        image: "https://images.unsplash.com/photo-1515462250-33bd709cbe85?auto=format&fit=crop&q=80",
        milestones: [
          { name: "Storyboarding", completed: true },
          { name: "Illustration", completed: true },
          { name: "Animation", completed: true },
          { name: "Post-Production", completed: true }
        ]
      }
    ];

    const achievements = [
      {
        title: "Top Contributor",
        description: "Awarded for being the top contributor in the month of January.",
        icon: Trophy
      },
      {
        title: "Innovator of the Year",
        description: "Recognized for innovative contributions to multiple projects.",
        icon: Star
      }
    ];

    const creatorScore = 1500;

    export function Profile() {
      const { activeColor } = useProject();
      const [activeTab, setActiveTab] = useState('overview');
      const [profile, setProfile] = useState(initialProfile);
      const [isEditing, setIsEditing] = useState(false);
      const [editProfile, setEditProfile] = useState({ ...initialProfile });
      const [specializationInput, setSpecializationInput] = useState('');
      const [newProfilePicture, setNewProfilePicture] = useState('');
      const [newCoverImage, setNewCoverImage] = useState('');

      useEffect(() => {
        const storedProfile = localStorage.getItem('profile');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
          setEditProfile(JSON.parse(storedProfile));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('profile', JSON.stringify(profile));
      }, [profile]);

      const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'score', label: 'Creator Score' }
      ];

      const calculateProgress = (milestones) => {
        const completed = milestones.filter(milestone => milestone.completed).length;
        return (completed / milestones.length) * 100;
      };

      const handleEditProfile = () => {
        setIsEditing(true);
      };

      const handleCancelEdit = () => {
        setIsEditing(false);
        setEditProfile(profile);
        setNewProfilePicture('');
        setNewCoverImage('');
      };

      const handleSaveProfile = () => {
        setProfile(prevProfile => ({
          ...editProfile,
          profilePicture: newProfilePicture || prevProfile.profilePicture,
          coverImage: newCoverImage || prevProfile.coverImage
        }));
        setIsEditing(false);
        setNewProfilePicture('');
        setNewCoverImage('');
      };

      const handleAddSpecialization = () => {
        if (specializationInput.trim() && !editProfile.specializations.includes(specializationInput.trim()) && editProfile.specializations.length < 3) {
          setEditProfile({
            ...editProfile,
            specializations: [...editProfile.specializations, specializationInput.trim()]
          });
          setSpecializationInput('');
        }
      };

      const handleRemoveSpecialization = (specializationToRemove: string) => {
        setEditProfile({
          ...editProfile,
          specializations: editProfile.specializations.filter(specialization => specialization !== specializationToRemove)
        });
      };

      return (
        <div className="space-y-8">
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img
              src={newCoverImage || profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            {isEditing && (
              <div className="absolute top-4 right-4">
                <div
                  className="bg-zinc-900/50 rounded-xl p-2 border border-zinc-800"
                  style={{
                    borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                  }}
                >
                  <Upload
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => {
                      const url = prompt('Enter image URL');
                      if (url) setNewCoverImage(url);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="relative -mt-20 space-y-6">
            <div className="flex items-end justify-between">
              <div className="flex items-end gap-6">
                <img
                  src={newProfilePicture || profile.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-xl border-4 border-black object-cover"
                />
                {isEditing && (
                  <div className="absolute bottom-0 left-24">
                    <div
                      className="bg-zinc-900/50 rounded-xl p-2 border border-zinc-800"
                      style={{
                        borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                      }}
                    >
                      <Upload
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => {
                          const url = prompt('Enter image URL');
                          if (url) setNewProfilePicture(url);
                        }}
                      />
                    </div>
                  </div>
                )}
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                      className="text-3xl font-light bg-transparent border-b border-zinc-700 focus:outline-none"
                    />
                  ) : (
                    <h1 className="text-3xl font-light">{profile.name}</h1>
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      value={editProfile.bio}
                      onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                      className="text-zinc-400 bg-transparent border-b border-zinc-700 focus:outline-none"
                    />
                  ) : (
                    <p className="text-zinc-400">{profile.bio}</p>
                  )}
                </div>
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditProfile}
                  className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-700"
                  style={{
                    backgroundColor: activeColor
                      ? `rgba(${activeColor}, 0.1)`
                      : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>

            <div className="flex gap-6 text-sm text-zinc-400">
              {isEditing ? (
                <input
                  type="text"
                  value={editProfile.location}
                  onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
                  className="flex items-center gap-2 bg-transparent border-b border-zinc-700 focus:outline-none"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editProfile.website}
                  onChange={(e) => setEditProfile({ ...editProfile, website: e.target.value })}
                  className="flex items-center gap-2 bg-transparent border-b border-zinc-700 focus:outline-none"
                />
              ) : (
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  <LinkIcon className="h-4 w-4" />
                  {profile.website}
                </a>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editProfile.twitter}
                  onChange={(e) => setEditProfile({ ...editProfile, twitter: e.target.value })}
                  className="flex items-center gap-2 bg-transparent border-b border-zinc-700 focus:outline-none"
                />
              ) : (
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  <Twitter className="h-4 w-4" />
                  {profile.twitter}
                </a>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editProfile.github}
                  onChange={(e) => setEditProfile({ ...editProfile, github: e.target.value })}
                  className="flex items-center gap-2 bg-transparent border-b border-zinc-700 focus:outline-none"
                />
              ) : (
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  <Github className="h-4 w-4" />
                  {profile.github}
                </a>
              )}
            </div>
            {isEditing && (
              <div
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Creative Specializations</h2>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={specializationInput}
                    onChange={(e) => setSpecializationInput(e.target.value)}
                    className="flex-1 bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                    placeholder="Enter specialization"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpecialization}
                    className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editProfile.specializations.map((specialization) => (
                    <span
                      key={specialization}
                      className="px-3 py-1 text-zinc-300 text-sm font-light tracking-wider transition-colors duration-700 rounded-full bg-zinc-800"
                    >
                      {specialization}
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialization(specialization)}
                        className="ml-1 text-zinc-500 hover:text-zinc-400"
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
                {editProfile.specializations.length < 3 && (
                  <p className="text-zinc-500 text-sm">Select up to 3 specializations</p>
                )}
              </div>
            )}
            <div className="flex gap-4 border-b border-zinc-800 pb-4">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
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
                  {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTab === 'overview' && (
                <>
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800 transition-all duration-700 hover:border-opacity-50 group"
                      style={{
                        borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : ''
                      }}
                    >
                      <div className="relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-xl font-light mb-1">{project.title}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-zinc-300">{project.role}</span>
                            <span className="text-zinc-400">•</span>
                            <span className="text-zinc-400">{project.collaborators} collaborators</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-4">
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
                        <div className="w-full bg-zinc-700 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${calculateProgress(project.milestones)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 transition-all duration-700"
                      style={{
                        borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                      }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <achievement.icon className="h-8 w-8 text-zinc-400" />
                        <h3 className="text-xl font-light">{achievement.title}</h3>
                      </div>
                      <p className="text-zinc-400">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'score' && (
                <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 transition-all duration-700"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
                >
                  <h2 className="text-2xl font-light mb-4">Creator Score</h2>
                  <p className="text-zinc-400 mb-6">Your creator score is determined by the number of contributions you have made across various projects.</p>
                  <div className="text-4xl font-bold text-center">{creatorScore}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
