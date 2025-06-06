import { useNavigate, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavbarMenu = [
    { id: 1, title: "Home", path: "/Admin" },
    { id: 2, title: "Courses", path: "/Admin/Courses" },
    { id: 3, title: "Notes", path: "/Admin/Notes" },
    // Future:
    // { id: 4, title: "Chatbot", path: "/Admin/Chatbot" },
    // { id: 5, title: "Contact", path: "/Admin/Contact" },
  ];

  const handleTeacherModeClick = () => {
    if (user?.publicMetadata?.role === "admin") {
      navigate("/");
      alert("Back to StudentSphere (Student Page).");
    } else {
      alert("Access denied. You are not an admin.");
    }
  };

  return (
    <nav className="relative z-20 bg-white shadow">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        {/* Logo */}
        <div>
          <h1 className="font-bold text-2xl">CSE WEB (Admin)</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    `inline-block py-2 px-3 relative group ${
                      isActive ? "text-secondary font-semibold" : "text-gray-700 hover:text-secondary"
                    }`
                  }
                >
                  <div className="w-2 h-2 bg-secondary absolute mt-2 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 hidden group-hover:block"></div>
                  {menu.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Student Mode Button */}
          <SignedIn>
            <button
              onClick={handleTeacherModeClick}
              className="primary-btn px-4 py-1 ml-4"
            >
              Student Mode
            </button>
          </SignedIn>

          {/* Auth Buttons */}
          <div className="ml-4">
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

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <IoMdMenu
            className="text-3xl cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </motion.div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <ul className="flex flex-col gap-3 p-4">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <NavLink
                    to={menu.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${
                        isActive ? "text-secondary font-semibold" : "text-gray-700 hover:text-secondary"
                      }`
                    }
                  >
                    {menu.title}
                  </NavLink>
                </li>
              ))}

              <SignedIn>
                <button
                  onClick={() => {
                    handleTeacherModeClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="primary-btn w-full text-center"
                >
                  Student Mode
                </button>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <button className="primary-btn w-full">Sign In</button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
