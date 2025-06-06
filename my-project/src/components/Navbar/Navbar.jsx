import { NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Navbar = () => {
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
        className="container py-10 flex justify-between items-center"
      >
        {/* Logo */}
        <div>
          <h1 className="font-bold text-2xl">CSE WEB</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5">
          <ul className="flex items-center gap-5">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    `inline-block py-2 px-3 relative no-underline transition-colors duration-300 ${
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

          {/* Teacher mode button */}
          <SignedIn>
            <button
              onClick={handleTeacherModeClick}
              className="primary-btn w-29 h-8 flex items-center justify-center"
            >
              Teacher mode
            </button>
          </SignedIn>

          {/* Sign In / User Icon */}
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

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
