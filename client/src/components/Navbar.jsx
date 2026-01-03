import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TopButtons from "./TopButtons";

const Navbar = ({
  onDownloadasHTML,
  onDownloadasHTMLOnlyOutput,
  onDownloadasJS,
  onRunAll,
  onInsertCodeCell,
  onInsertDocCell,
  onSave,
  onLoad,
  title,
  onTitleChange,
  clearNotebook
}) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate('/login');
  };

  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }


    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSave]);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
  };


  return (
    <nav className="bg-[#11191f] text-[#bbc6ce] text-sm flex items-center sticky top-0 z-50 px-4 py-2">
      <div className="logo cursor-pointer" onClick={() => navigate('/')}>
        <img src="/logo.png" alt="" width={30} />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="ml-auto lg:hidden p-2 hover:text-[#fede02]"
      >
        <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} size="lg" />
      </button>

      {/* Desktop Menu */}
      <div ref={menuRef} className="hidden lg:flex items-center flex-1 ml-4">

        <div className="relative">
          <button
            onClick={() => toggleMenu("file")}
            className="px-4 py-2 hover:text-[#fede02] rounded cursor-pointer font-bold"
          >
            File
            <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
          </button>
          {openMenu === "file" && (
            <div className="text-sm absolute left-0 mt-1 bg-[#1b2832] shadow-lg rounded w-60 z-10">
              <ul className="p-2">
                <li className="px-4 py-2 cursor-pointer hover:text-[#fede02] ">
                  <NavLink to={'#'} target="_blank">New NB</NavLink>
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:text-[#fede02] "
                  onClick={onSave}
                >
                  Save
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:text-[#fede02] "
                  onClick={onLoad}
                >
                  Load NB
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:text-[#fede02] "
                  onClick={onDownloadasHTML}
                >
                  Download as HTML(NB view)
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:text-[#fede02] "
                  onClick={onDownloadasHTMLOnlyOutput}
                >
                  Download as HTML(only output)
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:text-[#fede02] "
                  onClick={onDownloadasJS}
                >
                  Download as JS
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => toggleMenu("edit")}
            className="px-4 py-2 hover:text-[#fede02] rounded cursor-pointer font-bold"
          >
            Edit
            <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
          </button>
          {openMenu === "edit" && (
            <div className="text-sm absolute left-0 mt-1 bg-[#1b2832] shadow-lg rounded w-40 z-10">
              <ul className="p-2">
                <li
                  className="px-4 py-2 cursor-pointer hover:text-[#fede02]"
                  onClick={onInsertCodeCell}
                >
                  Insert code cell
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:text-[#fede02]"
                  onClick={onInsertDocCell}
                >
                  Insert Doc cell
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => toggleMenu("run")}
            className="px-4 py-2 hover:text-[#fede02] rounded cursor-pointer font-bold"
          >
            Run
            <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
          </button>
          {openMenu === "run" && (
            <div className="text-sm absolute left-0 mt-1 bg-[#1b2832] shadow-lg rounded w-28 z-10">
              <ul className="p-1">
                <li
                  className="px-4 py-2 cursor-pointer hover:text-[#fede02]"
                  onClick={onRunAll}
                >
                  Run All
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="ml-3 w-64">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled"
            aria-label="Notebook title"
            className="w-full bg-[#11191f] text-[#bbc6ce] border rounded px-3 py-1 focus:outline-none focus:border-[#fede02]"
            style={{ borderColor: 'rgba(187, 198, 206, 0.25)' }}
          />
        </div>
        <div className="ml-auto flex items-center gap-8">

          <TopButtons
            clearNotebook={clearNotebook}
            insertCodeCell={onInsertCodeCell}
            runAll={onRunAll}
            onSave={onSave}
          />

          <div className="flex items-center gap-2">
            {auth.user ? (
              <>
                <span className="hidden xl:block text-[#bbc6ce]">Welcome, {auth.user.name}</span>
                <Link
                  to="/profile"
                  className="px-3 py-1 hover:text-[#fede02] rounded cursor-pointer"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-[#1b2832] hover:bg-[#fede02] hover:text-[#11191f] rounded cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 hover:text-[#fede02] rounded cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 bg-[#1b2832] hover:bg-[#fede02] hover:text-[#11191f] rounded cursor-pointer transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#11191f] border-t border-[#1b2832] shadow-lg z-40">
          <div className="p-4 space-y-4">
            {/* Title Input */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Untitled"
                aria-label="Notebook title"
                className="w-full bg-[#1b2832] text-[#bbc6ce] border rounded px-3 py-2 focus:outline-none focus:border-[#fede02]"
                style={{ borderColor: 'rgba(187, 198, 206, 0.25)' }}
              />
            </div>

            {/* File Menu */}
            <div>
              <button
                onClick={() => toggleMenu("file")}
                className="w-full text-left px-4 py-2 hover:text-[#fede02] rounded cursor-pointer font-bold flex justify-between items-center"
              >
                File
                <FontAwesomeIcon icon={faChevronDown} className={`transform transition-transform ${openMenu === "file" ? 'rotate-180' : ''}`} />
              </button>
              {openMenu === "file" && (
                <div className="bg-[#1b2832] rounded mt-1">
                  <ul className="p-2">
                    <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]" onClick={closeMobileMenu}>
                      <NavLink to={'#'} target="_blank">New NB</NavLink>
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]" onClick={() => { onSave(); closeMobileMenu(); }}>
                      Save
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]" onClick={() => { onLoad(); closeMobileMenu(); }}>
                      Load NB
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]" onClick={() => { onDownloadasHTML(); closeMobileMenu(); }}>
                      Download as HTML(NB view)
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]" onClick={() => { onDownloadasHTMLOnlyOutput(); closeMobileMenu(); }}>
                      Download as HTML(only output)
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]" onClick={() => { onDownloadasJS(); closeMobileMenu(); }}>
                      Download as JS
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Edit Menu */}
            <div>
              <button
                onClick={() => toggleMenu("edit")}
                className="w-full text-left px-4 py-2 hover:text-[#fede02] rounded cursor-pointer font-bold flex justify-between items-center"
              >
                Edit
                <FontAwesomeIcon icon={faChevronDown} className={`transform transition-transform ${openMenu === "edit" ? 'rotate-180' : ''}`} />
              </button>
              {openMenu === "edit" && (
                <div className="bg-[#1b2832] rounded mt-1">
                  <ul className="p-2">
                    <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]" onClick={() => { onInsertCodeCell(); closeMobileMenu(); }}>
                      Insert code cell
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]" onClick={() => { onInsertDocCell(); closeMobileMenu(); }}>
                      Insert Doc cell
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Run Menu */}
            <div>
              <button
                onClick={() => toggleMenu("run")}
                className="w-full text-left px-4 py-2 hover:text-[#fede02] rounded cursor-pointer font-bold flex justify-between items-center"
              >
                Run
                <FontAwesomeIcon icon={faChevronDown} className={`transform transition-transform ${openMenu === "run" ? 'rotate-180' : ''}`} />
              </button>
              {openMenu === "run" && (
                <div className="bg-[#1b2832] rounded mt-1">
                  <ul className="p-2">
                    <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]" onClick={() => { onRunAll(); closeMobileMenu(); }}>
                      Run All
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Top Buttons */}
            <div className="pt-4 border-t border-[#1b2832]">
              <TopButtons
                clearNotebook={clearNotebook}
                insertCodeCell={onInsertCodeCell}
                runAll={onRunAll}
                onSave={onSave}
              />
            </div>

            {/* User Menu */}
            <div className="pt-4 border-t border-[#1b2832] space-y-2">
              {auth.user ? (
                <>
                  <div className="px-4 py-2 text-[#bbc6ce]">Welcome, {auth.user.name}</div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:text-[#fede02] rounded"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => { handleLogout(); closeMobileMenu(); }}
                    className="w-full text-left px-4 py-2 bg-[#1b2832] hover:bg-[#fede02] hover:text-[#11191f] rounded transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:text-[#fede02] rounded"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-[#1b2832] hover:bg-[#fede02] hover:text-[#11191f] rounded transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;