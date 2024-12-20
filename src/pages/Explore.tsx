import React, { useState } from 'react';
    import { Search, Filter, Compass, Heart, MessageSquare } from 'lucide-react';
    import { useProject } from '../contexts/ProjectContext';
    import { ProjectCard } from '../components/ProjectCard';

    const categories = [
      "All Projects", "Music", "Visual Art", "Writing", "Film", "Photography", "Game Dev"
    ];

    export function Explore() {
      const { activeColor, projects } = useProject();
      const [activeCategory, setActiveCategory] = useState("All Projects");
      const [searchQuery, setSearchQuery] = useState('');
      const [filterOpenPrivate, setFilterOpenPrivate] = useState('All');
      const [likedProjects, setLikedProjects] = useState<number[]>([]);
      const [comments, setComments] = useState<{ [projectId: number]: { user: string, text: string }[] }>({});
      const [newComment, setNewComment] = useState('');
      const [activeCommentProject, setActiveCommentProject] = useState<number | null>(null);

      const filteredProjects = projects.filter(project => {
        const categoryMatch = activeCategory === "All Projects" || project.tags.includes(activeCategory);
        const searchMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
        const openPrivateMatch = filterOpenPrivate === 'All' || (filterOpenPrivate === 'Open' ? project.isPublic : !project.isPublic);
        return categoryMatch && searchMatch && openPrivateMatch;
      });

      const handleLike = (projectId: number) => {
        if (likedProjects.includes(projectId)) {
          setLikedProjects(likedProjects.filter(id => id !== projectId));
        } else {
          setLikedProjects([...likedProjects, projectId]);
        }
      };

      const handleAddComment = (projectId: number) => {
        if (newComment.trim()) {
          const newCommentObj = { user: 'CurrentUser', text: newComment };
          setComments(prevComments => ({
            ...prevComments,
            [projectId]: [...(prevComments[projectId] || []), newCommentObj]
          }));
          setNewComment('');
          setActiveCommentProject(null);
        }
      };

      return (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="h-8 w-8" />
              <h1 className="text-3xl font-light tracking-wider">Explore Projects</h1>
            </div>
            <div className="flex gap-2">
              <select
                value={filterOpenPrivate}
                onChange={(e) => setFilterOpenPrivate(e.target.value)}
                className="bg-zinc-800 border-0 rounded-lg px-4 py-2 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-white transition-colors duration-700"
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="Private">Private</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-700 ${
                  activeCategory === category ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeCategory === category
                    ? activeColor
                      ? `rgba(${activeColor}, 0.1)`
                      : 'rgba(255, 255, 255, 0.05)'
                    : 'transparent',
                  boxShadow: activeCategory === category && activeColor
                    ? `0 0 20px rgba(${activeColor}, 0.1)`
                    : 'none'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search projects..."
                className={`w-full pl-10 pr-4 py-2 bg-zinc-800/50 border-0 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white transition-colors duration-700 rounded-lg`}
                style={{
                  backgroundColor: activeColor ? `rgba(${activeColor}, 0.1)` : ''
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="space-y-4">
                <ProjectCard
                  {...project}
                  onHover={() => {}}
                  onLeave={() => {}}
                  isActive={false}
                  font={project.font}
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(project.id)}
                    className={`flex items-center gap-1 text-zinc-400 hover:text-white ${likedProjects.includes(project.id) ? 'text-red-500' : ''}`}
                  >
                    <Heart className="h-5 w-5" />
                    <span>{likedProjects.filter(id => id === project.id).length}</span>
                  </button>
                  <button
                    onClick={() => setActiveCommentProject(activeCommentProject === project.id ? null : project.id)}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>{comments[project.id]?.length || 0}</span>
                  </button>
                </div>
                {activeCommentProject === project.id && (
                  <div className="space-y-2">
                    <div className="space-y-2">
                      {(comments[project.id] || []).map((comment, index) => (
                        <div key={index} className="bg-zinc-800/50 rounded-lg p-3">
                          <p className="text-sm text-zinc-400">{comment.user}: {comment.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                        placeholder="Add a comment..."
                      />
                      <button
                        onClick={() => handleAddComment(project.id)}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg p-2 transition-colors duration-700"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
