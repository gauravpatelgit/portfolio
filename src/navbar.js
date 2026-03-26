import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  Award,
  User,
  Briefcase,
  Code,
  Layers,
} from "lucide-react";

const Navbar = ({
  isDarkMode: externalIsDarkMode,
  toggleDarkMode: externalToggleDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "About", href: "#about", id: "about", icon: <User size={18} /> },
    { name: "Skills", href: "#skills", id: "skills", icon: <Code size={18} /> },
    {
      name: "Services",
      href: "#services",
      id: "services",
      icon: <Layers size={18} />,
    },
    {
      name: "Experience",
      href: "#experience",
      id: "experience",
      icon: <Award size={18} />,
    },
    {
      name: "Projects",
      href: "#projects",
      id: "projects",
      icon: <Briefcase size={18} />,
    },
  ];

  const handleToggle = () => {
    externalToggleDarkMode();
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        "home",
        "about",
        "skills",
        "services",
        "experience",
        "projects",
        "contact",
      ];
      const currentActive = sectionIds.find((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 400;
        }
        return false;
      });
      if (currentActive) setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    setIsOpen(false);

    if (elem) {
      const offset = 80;
      window.scrollTo({
        top: elem.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="group flex items-center space-x-3 text-xl font-bold text-gray-900 dark:text-white"
            >
              <div className="flex items-center justify-center bg-indigo-600 text-white w-10 h-10 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-200 dark:shadow-none font-sans">
                G
              </div>
              <span className="hidden sm:inline-block tracking-tight font-display">
                Gaurav P.
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-4">
            <div className="flex items-center space-x-1 border-r border-gray-200 dark:border-gray-800 pr-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 group flex items-center space-x-2 ${
                    activeSection === link.id
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`transition-all duration-300 ${activeSection === link.id ? "scale-110 opacity-100" : "opacity-0 group-hover:opacity-100 scale-100"}`}
                  >
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                  <span
                    className={`absolute inset-x-4 bottom-0 h-0.5 bg-indigo-600 transition-transform duration-300 ${
                      activeSection === link.id
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Actions Area (Desktop) */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleToggle}
                className="p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-90"
                title="Toggle Theme"
              >
                {externalIsDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile and Tablet Menu Actions */}
          <div className="flex xl:hidden items-center space-x-3">
            <button
              onClick={handleToggle}
              className="p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 transition-all"
            >
              {externalIsDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-500 ease-in-out shadow-2xl overflow-hidden ${
          isOpen
            ? "max-h-[80vh] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`flex items-center space-x-4 px-5 py-4 text-lg font-bold rounded-2xl transition-all ${
                activeSection === link.id
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <span
                className={
                  activeSection === link.id
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-400"
                }
              >
                {link.icon}
              </span>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
