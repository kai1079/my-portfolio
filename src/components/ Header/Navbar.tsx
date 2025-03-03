import { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"; // Install heroicons if needed


export const Navbar: React.FC = () => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="relative flex justify-between items-center px-12 py-4 max-w-7xl mx-auto bg-transparent bg-opacity-50">
      <div className="relative text-indigo-0 text-3xl font-bold">K</div>
      <div className="relative flex-1 justify-start">
        <ul className="inline-flex max-sm:flex-row justify-center flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center  w-[90%] max-sm:w-[400px] sm:w-[400px] max-w-[400px] lg:gap-6 bg-gray-100 bg-opacity-75 px-6 py-0.5 rounded-lg">
          <li
            className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <a href="#about" className="flex items-center, text-gray-900">
              About
            </a>
          </li>
          <li
            className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <a href="#skills" className="flex items-center, text-gray-900">
              Skills
            </a>
          </li>
          <li
            className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <a href="#skills" className="flex items-center, text-gray-900">
              Experience
            </a>
          </li>
          <li
            className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <a href="#skills" className="flex items-center, text-gray-900">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-6">
        {/* Light/Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 transition">
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
          )}
        </button>
      </div>
    </nav>
  )
};  