import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import WebLayout from "./Layout/WebLayout";
import Courses from "./Pages/Courses";
import Notes from "./Pages/Notes";
import Chatbot from "./Pages/Chatbot";
import Contact from "./Pages/Contact";
import AdminLayout from "./Layout/AdminLayout";
import AdminCourses from "./Pages/Admin/AdminCourses";
import AdminNavbar from "./components/Admin/AdminNavbar";
import AdminHero from "./components/Admin/AdminHero";
import AdminNotes from "./Pages/Admin/AdminNotes";
import AdminChatbot from "./Pages/Admin/AdminChatbot";
import AdminContact from "./Pages/Admin/AdminContact";


const App = () => {
  return (
    
      <main className="overflow-x-hidden bg-white text-dark">
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route element={<WebLayout />}>
                      <Route index element={<Hero />} />
                      <Route path="courses" element={<Courses />} />
                      <Route path="notes" element={<Notes />} />
                      <Route path="chatbot" element={<Chatbot />} />
                      <Route path="contact" element={<Contact />} />
                    </Route>
                  </Routes>
                </>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <>
                  <AdminNavbar />
                  <Routes>
                    <Route element={<AdminLayout />}>
                      <Route index element={<AdminHero />} />
                      <Route path="courses" element={<AdminCourses />} />
                      <Route path="notes" element={<AdminNotes />} />
                      <Route path="chatbot" element={<AdminChatbot />} />
                      <Route path="contact" element={<AdminContact />} />
                    </Route>
                  </Routes>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </main>
   
  );
};

export default App;
