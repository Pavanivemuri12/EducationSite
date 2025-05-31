import { NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

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

  // Handler for Teacher mode button click
  const handleTeacherModeClick = () => {
    if (user?.publicMetadata?.role === "admin") {
      navigate("/admin");
      alert("Welcome to StudentSphere Admin Page.")
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
        {/* Logo section */}
        <div>
          <h1 className="font-bold text-2xl">CSE WEB</h1>
        </div>

        {/* Menu section */}
        <div className="hidden lg:flex items-center gap-5">
          <ul className="flex items-center gap-5">
            {NavbarMenu.map((menu) => (
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
            ))}
          </ul>

          {/* Teacher mode button - only visible if user is signed in */}
          <SignedIn>
            <button
              onClick={handleTeacherModeClick}
              className="primary-btn w-29 h-8 flex items-center justify-center"
            >
              Teacher mode
            </button>
          </SignedIn>

          {/* Clerk Sign In / User Button */}
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

        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
