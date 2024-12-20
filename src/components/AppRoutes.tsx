import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import { Home } from '../pages/Home';
    import { Explore } from '../pages/Explore';
    import { Friends } from '../pages/Friends';
    import { Notifications } from '../pages/Notifications';
    import { Profile } from '../pages/Profile';
    import { Project } from '../pages/Project';
    import { NewProject } from '../pages/NewProject';

    export function AppRoutes() {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/new-project" element={<NewProject />} />
        </Routes>
      );
    }
