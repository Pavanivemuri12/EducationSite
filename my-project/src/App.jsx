import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
//import Services from "./components/Services/Services";
//import Subscribe from "./components/Subscribe/Subscribe";
import Navbar from "./components/Navbar/Navbar";
import WebLayout from "./Layout/WebLayout";
import Courses from "./Pages/Courses";
import Notes from "./Pages/Notes";
import Chatbot from "./Pages/Chatbot";
import Contact from "./Pages/Contact";

const App = () => {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <BrowserRouter>
        {/* Navbar should be outside Routes so it stays visible on all pages */}
        <Navbar />

        <Routes>
          {/* WebLayout should use <Outlet /> inside it */}
          <Route element={<WebLayout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/notes" element={<Notes/>}/>
            <Route path="/chatbot" element={<Chatbot/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Route>
        </Routes>

        {/* These sections stay static below */}
        
      </BrowserRouter>
      
       
       
    </main>
  );
};

export default App;
