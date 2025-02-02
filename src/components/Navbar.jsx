import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
const Navbar = ({
  onDownloadasHTML,
  onDownloadasHTMLOnlyOutput,
  onDownloadasJS,
  onRunAll,
  onInsertCodeCell,
  onInsertDocCell,
  onSaveLocally,
  onLoadLocal
}) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className="bg-[#11191f] text-[#bbc6ce] text-sm flex space-x-2 items-center">
      <div className="logo">
        <img src="/logo.png" alt="" width={30} />
      </div>
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
              <li
                className="px-4 py-2 cursor-pointer hover:text-[#fede02] "
              >
              <NavLink to={'#'} target="_blank" >New Blank NB</NavLink>
              </li>
              <li
                className="px-4 py-2 cursor-pointer hover:text-[#fede02] "
                onClick={onSaveLocally}
              >
                Save Locally (Ctrl+S)
              </li>
              <li
                className="px-4 py-2 cursor-pointer hover:text-[#fede02] "
                onClick={onLoadLocal}
              >
                Load Local NB
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
              <li className="px-4 py-2 cursor-pointer hover:text-[#fede02] ">
                Download as HTML+JS
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
          <div className="text-sm absolute left-0 mt-1 bg-[#1b2832]  shadow-lg rounded w-40">
            <ul className="p-2">
              <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]"
                onClick={onInsertCodeCell}
              >
                Insert code cell
              </li>
              <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]"
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
          <div className="text-sm absolute left-0 mt-1 bg-[#1b2832]  shadow-lg rounded w-25">
            <ul className="p-1">
              <li className="px-4 py-2 cursor-pointer hover:text-[#fede02]"
                onClick={onRunAll}
              >
                Run All
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
