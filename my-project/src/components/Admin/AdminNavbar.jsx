import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
//import Courses from "../../Pages/Courses";


const Navbar = () => {
    

const NavbarMenu = [
    {
        id:1,
        title:"Home",
        path: "/Admin",
    },
    {
        id:2,
        title:"Courses",
        path: "/Admin/Courses"
    },
    {
        id:3,
        title:"Notes",
        path: "/Admin/Notes",
    },
    {
        id:4,
        title:"Chatbot",
        path: "/Admin/Chatbot",
    },
    {
        id:5,
        title:"Contact Us",
        path: "/Admin/Contact",
    },

];

  return (
    <nav className="relative z-20">
        <motion.div
        initial={{ opacity:0, y:-50}}
        animate={{ opacity:1, y:0 }}
         className="container py-10 flex justify-between items-center">
            {/* Logo section */}
            <div>
                <h1 className="font-bold text-2xl">
                    CSE WEB
                </h1>
            </div>
            {/* Menu section */}
            <div className="hidden lg:block">
                <ul className="flex items-center gap-3">
                {
  NavbarMenu.map((menu) => (
    <li key={menu.id}>
      <NavLink
        to={menu.path}
        className={({ isActive }) =>
          `inline-block py-2 px-3 relative group ${
            isActive ? "text-secondary" : "hover:text-secondary"
          }`
        }
      >
        <div className="w-2 h-2 bg-secondary absolute mt-2 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 hidden group-hover:block"></div>
        {menu.title}
      </NavLink>
    </li>
  ))
}
                    <button className="primary-btn">Sign In</button>
                </ul>

            </div>
            {/* Mobile Hamburger menu section*/}
            <div className="lg:hidden">
                <IoMdMenu className="text-4xl"/>
                </div>    
        </motion.div>
    </nav>
  )
}

export default Navbar