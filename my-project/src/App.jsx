// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Courses from "./Pages/Courses";
import Notes from "./Pages/Notes";
import Chatbot from "./Pages/Chatbot";
import Contact from "./Pages/Contact";
import AdminCourses from "./Pages/Admin/AdminCourses";
import AdminHero from "./components/Admin/AdminHero";
import AdminNotes from "./Pages/Admin/AdminNotes";
import AdminChatbot from "./Pages/Admin/AdminChatbot";
import AdminContact from "./Pages/Admin/AdminContact";

import WebLayout from "./Layout/WebLayout";
import AdminLayout from "./Layout/AdminLayout";

import UserProtectedRoute from "./components/UserProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import RedirectCleanHash from "./components/RedirectCleanHash";

import Login from "./Pages/routes/login";
import Signup from "./Pages/routes/signup";
import VideoCourse from "./components/VideoCard/VideoCard";

const App = () => {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/sign-in" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Add this */}
          <Route path="/sign-up" element={<Signup />} />{" "}
          {/* Keep this for Clerk default */}
          <Route path="/sign-up/*" element={<RedirectCleanHash />} />
          
          {/* User protected routes */}
          <Route element={<UserProtectedRoute />}>
            <Route element={<WebLayout />}>
              <Route index element={<Hero />} />
              <Route path="courses" element={<Courses />} />
          
              <Route path="/video/:id" element={<VideoCourse />} />
              <Route path="notes" element={<Notes />} />
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Route>
          {/* Admin protected routes */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminHero />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="notes" element={<AdminNotes />} />
              <Route path="chatbot" element={<AdminChatbot />} />
              <Route path="contact" element={<AdminContact />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
