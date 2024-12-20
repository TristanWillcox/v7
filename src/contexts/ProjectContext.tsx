import React, { createContext, useContext, useState } from 'react';

      interface ProjectContextType {
        activeProject: number | null;
        activeColor: string;
        activeFont: string;
        setActiveProject: (index: number | null) => void;
        projects: Project[];
        addProject: (project: Omit<Project, 'id'>) => void;
      }

      interface Milestone {
        name: string;
        completed: boolean;
      }

      interface Project {
        id: number;
        title: string;
        description: string;
        image: string;
        collaborators: number;
        tags: string[];
        color: string;
        audioUrl?: string;
        font: string;
        milestones: Milestone[];
        duration?: string;
        progress?: number;
        projectType: string;
        neededDisciplines: string[];
        isPublic: boolean;
        invitedUsers: string[];
        coverImage?: string;
        videoUrl?: string;
      }

      const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

      export function ProjectProvider({ children }: { children: React.ReactNode }) {
        const [activeProject, setActiveProject] = useState<number | null>(null);
        const [activeColor, setActiveColor] = useState('');
        const [activeFont, setActiveFont] = useState('font-sans');
        const [projects, setProjects] = useState<Project[]>(featuredProjects);

        const handleSetActiveProject = (index: number | null) => {
          setActiveProject(index);
          setActiveColor(index !== null ? featuredProjects[index]?.color : '');
          setActiveFont(index !== null ? featuredProjects[index]?.font : 'font-sans');
        };

        const addProject = (project: Omit<Project, 'id'>) => {
          const newProject = { ...project, id: Date.now() };
          setProjects(prevProjects => [...prevProjects, newProject]);
        };

        return (
          <ProjectContext.Provider
            value={{
              activeProject,
              activeColor,
              activeFont,
              setActiveProject: handleSetActiveProject,
              projects,
              addProject
            }}
          >
            {children}
          </ProjectContext.Provider>
        );
      }

      export function useProject() {
        const context = useContext(ProjectContext);
        if (context === undefined) {
          throw new Error('useProject must be used within a ProjectProvider');
        }
        return context;
      }

      export const featuredProjects: Project[] = [
        {
          id: 1,
          title: "ETHEREAL SOUNDSCAPES",
          description: "A collaborative music project combining ambient sounds with visual art.",
          image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80",
          collaborators: 8,
          tags: ["Music", "Art"],
          color: "147, 51, 234",
          audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
          font: "font-serif",
          milestones: [
            { name: "Concept Development", completed: true },
            { name: "Sound Design", completed: false },
            { name: "Mixing", completed: false },
            { name: "Mastering", completed: false }
          ],
          duration: "3 months",
          progress: 40,
          projectType: "music",
          neededDisciplines: ["Sound Design", "Visual Art"],
          isPublic: true,
          invitedUsers: [],
        },
        {
          id: 2,
          title: "DIGITAL DREAMS",
          description: "3D artists and animators creating an immersive virtual gallery.",
          image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
          collaborators: 12,
          tags: ["3D", "Animation"],
          color: "59, 130, 246",
          font: "font-techno",
          milestones: [
            { name: "Storyboarding", completed: true },
            { name: "Illustration", completed: true },
            { name: "Animation", completed: true },
            { name: "Post-Production", completed: true }
          ],
          duration: "6 months",
          progress: 80,
          projectType: "visual",
          neededDisciplines: ["3D Modeling", "Animation"],
          isPublic: false,
          invitedUsers: [],
        },
        {
          id: 3,
          title: "STORY WEAVERS",
          description: "Writers and illustrators crafting an interactive children's book.",
          image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80",
          collaborators: 5,
          tags: ["Writing", "Illustration"],
          color: "236, 72, 153",
          font: "font-serif",
          milestones: [
            { name: "Concept Development", completed: true },
            { name: "Writing", completed: false },
            { name: "Illustration", completed: false },
            { name: "Publishing", completed: false }
          ],
          duration: "4 months",
          progress: 20,
          projectType: "writing",
          neededDisciplines: ["Writing", "Illustration"],
          isPublic: true,
          invitedUsers: [],
        },
        {
          id: 4,
          title: "PHOTOGRAPHY MOUNTAINS",
          description: "A photography project capturing the beauty of mountains.",
          image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&q=80",
          collaborators: 7,
          tags: ["Photography", "Nature"],
          color: "34, 197, 94",
          font: "font-graffiti",
          milestones: [
            { name: "Location Scouting", completed: true },
            { name: "Photography", completed: false },
            { name: "Editing", completed: false },
            { name: "Publishing", completed: false }
          ],
          duration: "2 months",
          progress: 60,
          projectType: "photography",
          neededDisciplines: ["Photography", "Editing"],
          isPublic: true,
          invitedUsers: [],
        }
      ];
