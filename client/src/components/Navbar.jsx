import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  onTitleChange
}) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate('/login');
  };

  const [openMenu, setOpenMenu] = useState(null);
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



  return (
    <nav className="bg-[#11191f] text-[#bbc6ce] text-sm flex space-x-1 items-center sticky top-0 z-50 px-4">
      <div className="logo cursor-pointer" onClick={() => navigate('/')}>
        <img src="/logo.png" alt="" width={30} />
      </div>
      <div ref={menuRef} className="flex items-center flex-1">

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
        <div className="ml-auto flex items-center gap-4">
          {auth.user ? (
            <>
              <span className="text-[#bbc6ce]">Welcome, {auth.user.name}</span>
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
    </nav>
  );
};

export default Navbar;