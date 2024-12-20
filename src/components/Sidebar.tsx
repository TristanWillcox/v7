import React, { useState } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import {
      Home,
      Compass,
      UserRound,
      MessageSquare,
      Bell,
      User,
      Plus
    } from 'lucide-react';
    import { useProject } from '../contexts/ProjectContext';

    export function Sidebar() {
      const location = useLocation();
      const { activeColor } = useProject();
      const [isExpanded, setIsExpanded] = useState(false);
      const isActive = (path: string) => location.pathname === path;

      const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/explore', icon: Compass, label: 'Explore' },
        { path: '/friends', icon: UserRound, label: 'Friends' },
        { path: '/notifications', icon: Bell, label: 'Notifications' },
        { path: '/profile', icon: User, label: 'Profile' },
      ];

      return (
        <div
          className={`w-20 hover:w-64 bg-zinc-900/80 backdrop-blur-sm border-r border-zinc-800 min-h-[calc(100vh-4rem)] p-4 sticky top-16 transition-all duration-300 ${isExpanded ? 'w-64' : ''}`}
          style={{
            borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : '',
            backgroundColor: activeColor ? `rgba(${activeColor}, 0.02)` : ''
          }}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <Link
            to="/new-project"
            className="w-full bg-zinc-800/50 text-white py-3 px-4 flex items-center justify-center gap-2 mb-8 hover:bg-zinc-700 transition rounded-lg group"
            style={{
              backgroundColor: activeColor ? `rgba(${activeColor}, 0.1)` : '',
              borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : ''
            }}
          >
            <Plus className="h-5 w-5 flex-shrink-0" />
            <span className={`font-light tracking-wider ${isExpanded ? 'block' : 'hidden group-hover:block'} whitespace-nowrap transition-all duration-300`}>
              NEW PROJECT
            </span>
          </Link>

          <nav className="space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 transition-all duration-700 rounded-lg group ${
                  isActive(path)
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
                style={{
                  backgroundColor: isActive(path)
                    ? activeColor
                      ? `rgba(${activeColor}, 0.1)`
                      : 'rgba(255, 255, 255, 0.05)'
                    : 'transparent',
                  boxShadow: isActive(path) && activeColor
                    ? `0 0 20px rgba(${activeColor}, 0.1)`
                    : 'none'
                }}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className={`font-light tracking-wider ${isExpanded ? 'block' : 'hidden group-hover:block'} whitespace-nowrap transition-all duration-300`}>
                  {label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      );
    }
