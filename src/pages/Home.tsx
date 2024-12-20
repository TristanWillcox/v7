import React from 'react';
      import { useProject } from '../contexts/ProjectContext';
      import { ProjectCard } from '../components/ProjectCard';

      export function Home() {
        const { activeProject, setActiveProject, activeColor, activeFont, projects } = useProject();

        return (
          <div
            className={`space-y-12 transition-colors duration-700 ${activeFont}`}
            style={{
              backgroundColor: activeColor ? `rgba(${activeColor}, 0.03)` : 'transparent',
            }}
          >
            <section className="space-y-8">
              <div
                className={`flex justify-between items-center border-b border-zinc-800 pb-4 transition-colors duration-700 ${activeFont}`}
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : '',
                }}
              >
                <h2 className="text-3xl font-light tracking-wider">Featured Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    onHover={() => setActiveProject(index)}
                    onLeave={() => setActiveProject(null)}
                    isActive={activeProject === index}
                    font={project.font}
                  />
                ))}
              </div>
            </section>
          </div>
        );
      }
