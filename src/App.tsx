import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { AppRoutes } from './components/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProjectProvider } from './contexts/ProjectContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <ProjectProvider>
            <div className="min-h-screen bg-black text-white transition-colors duration-700">
              <Navigation />
              <div className="flex">
                <Sidebar />
                <main className="flex-1 p-8">
                  <AppRoutes />
                </main>
              </div>
            </div>
          </ProjectProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}
