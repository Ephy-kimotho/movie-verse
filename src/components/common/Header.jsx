import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prevToggle) => !prevToggle);
  }

  return (
    <header className="bg-gray py-4 px-2 sm:py-3 sm:px-8 flex justify-between items-center flex-wrap">
      <h1 className="text-2xl sm:text-4xl text-tomato font-karla font-bold drop-shadow-lg">
        MovieVerse
      </h1>

      <button onClick={() => handleToggle()} className="sm:hidden">
        {isOpen ? (
          <FaXmark className="text-tomato w-8" />
        ) : (
          <FaBars className="w-8 text-darkBlue" />
        )}
      </button>

      <nav className="w-full sm:w-max sm:mr-10">
        <ul
          className={`list-none flex flex-col items-center gap-4 w-full  ${
            isOpen ? "h-32" : "h-0 overflow-hidden"
          } sm:w-max sm:h-auto  sm:flex-row sm:gap-16`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-tomato font-bold text-lg sm:text-xl tracking-wide"
                  : "text-night font-bold text-lg sm:text-xl tracking-wide"
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="movies"
              className={({ isActive }) =>
                isActive
                  ? "text-tomato font-bold text-lg sm:text-xl tracking-wide"
                  : "text-night font-bold text-lg sm:text-xl tracking-wide"
              }
              onClick={() => setIsOpen(false)}
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="contact"
              className={({ isActive }) =>
                isActive
                  ? "text-tomato font-bold text-lg sm:text-xl tracking-wide"
                  : "text-night font-bold text-lg sm:text-xl tracking-wide"
              }
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
