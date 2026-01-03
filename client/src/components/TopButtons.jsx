import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faTrash,
  faPlus,
  faSave,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";


function TopButtons({ runAll, onSave, clearNotebook, insertCodeCell }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAction = (action) => {
    action();
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex z-10 items-center space-x-1 relative">
      {/* Mobile dropdown menu button */}
      <div className="xl:hidden">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 p-2 text-white rounded-full cursor-pointer"
        >
          <span>Options</span>
          <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} color="lightgrey" size="md" />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-gray-800 rounded-lg shadow-lg py-2 min-w-[150px]">
            <div
              onClick={() => handleAction(runAll)}
              className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faPlay} color="lightgrey" size="sm" />
              <span>Run All</span>
            </div>
            <div
              onClick={() => handleAction(onSave)}
              className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faSave} color="lightgrey" size="sm" />
              <span>Save</span>
            </div>
            <div
              onClick={() => handleAction(clearNotebook)}
              className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faTrash} color="lightgrey" size="sm" />
              <span>Clear</span>
            </div>
            <div
              onClick={() => handleAction(insertCodeCell)}
              className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faPlus} color="lightgrey" size="sm" />
              <span>Add Cell</span>
            </div>
            <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">
              <NavLink to={"#"} target="_blank" className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faPlus} color="lightgrey" size="sm" />
                <span>New NB</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>

      {/* Desktop buttons - hidden on mobile */}
      <div className="hidden xl:flex items-center space-x-1">
        <div
          onClick={runAll}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlay} color="lightgrey" size="md" />
        </div>
        <div
          onClick={onSave}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faSave} color="lightgrey" size="md" />
        </div>
        <div
          onClick={clearNotebook}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faTrash} color="lightgrey" size="md" />
        </div>
        <div
          className="p-2 text-white rounded-full cursor-pointer"
          onClick={insertCodeCell}
        >
          <FontAwesomeIcon icon={faPlus} color="lightgrey" size="md" /> Cell
        </div>
        <div
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <NavLink to={"#"} target="_blank">
            <FontAwesomeIcon icon={faPlus} color="lightgrey" size="md" /> NB
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default TopButtons;
