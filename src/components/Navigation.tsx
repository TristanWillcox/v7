import React from 'react';
import { Link } from 'react-router-dom';
import { Infinity, Search } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

export function Navigation() {
  const { activeColor, activeFont } = useProject();

  return (
    <nav
      className={`bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-50 transition-colors duration-700 rounded-b-lg ${activeFont}`}
      style={{
        borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : '',
        backgroundColor: activeColor ? `rgba(${activeColor}, 0.02)` : ''
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <Infinity className="h-8 w-8 text-white" />
          <span className={`text-2xl font-light tracking-wider text-white ${activeFont}`}>
            SYNCREOS
          </span>
        </Link>

        <div className="flex-1 max-w-2xl mx-auto px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search projects, creatives, or skills..."
              className={`w-full pl-10 pr-4 py-2 bg-zinc-800/50 border-0 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white transition-colors duration-700 rounded-lg ${activeFont}`}
              style={{
                backgroundColor: activeColor ? `rgba(${activeColor}, 0.1)` : ''
              }}
            />
          </div>
        </div>

        <div className="w-[136px]"></div>
      </div>
    </nav>
  );
}
