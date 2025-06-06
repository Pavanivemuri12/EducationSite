import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { TbCube3dSphere } from "react-icons/tb";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const NavbarMenu = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Courses", path: "/Courses" },
    { id: 3, title: "Notes", path: "/Notes" },
    { id: 4, title: "Chatbot", path: "/Chatbot" },
    { id: 5, title: "Contact Us", path: "/Contact" },
  ];

  const { user } = useUser();
  const navigate = useNavigate();

  const handleTeacherModeClick = () => {
    if (user?.publicMetadata?.role === "admin") {
      navigate("/admin");
      alert("Welcome to StudentSphere Admin Page.");
    } else {
      alert("Access denied. You are not an admin.");
    }
  };

  return (
    <nav className="relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-6 px-4 flex justify-between items-center"
      >
        {/* Logo */}
        <div>
          <h1 className="font-bold text-3xl flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
            <TbCube3dSphere className="text-orange-600" />
            STUDENT SPHERE
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5">
          <ul className="flex items-center gap-5">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    `inline-block py-2 px-3 transition duration-300 ${
                      isActive
                        ? "text-secondary font-semibold"
                        : "text-gray-700 hover:text-secondary"
                    }`
                  }
                >
                  {menu.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Teacher Mode Button */}
          <SignedIn>
            <button
              onClick={handleTeacherModeClick}
              className="primary-btn w-29 h-8 flex items-center justify-center"
            >
              Teacher mode
            </button>
          </SignedIn>

          {/* Auth Buttons */}
          <div>
            <SignedOut>
              <SignInButton>
                <button className="primary-btn">Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <IoMdMenu className="text-4xl text-gray-800" />
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white shadow-md rounded-xl mx-4 mt-2 p-4 space-y-4"
          >
            {NavbarMenu.map((menu) => (
              <NavLink
                key={menu.id}
                to={menu.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-md transition ${
                    isActive
                      ? "bg-orange-100 text-orange-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {menu.title}
              </NavLink>
            ))}

            <SignedIn>
              <button
                onClick={() => {
                  handleTeacherModeClick();
                  setMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                Teacher mode
              </button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="w-full text-left py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-md">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
