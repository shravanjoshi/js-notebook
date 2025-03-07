import React,{useState} from "react";
import {NavLink} from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faTrash,
    faPlus,
    faSave
  } from "@fortawesome/free-solid-svg-icons";


function TopButtons({runAll, saveLocally, clearNotebook, insertCodeCell}) {
  return (
    <div className="absolute top-4 right-10 flex z-10 items-center space-x-1">
      <button
        onClick={runAll}
        
        className="p-2 text-white rounded-full  cursor-pointer"
      >
        <FontAwesomeIcon icon={faPlay} color="lightgrey" size="sm" />
      </button>
      <button
        onClick={saveLocally}

        className="p-2 text-white rounded-full  cursor-pointer"
      >
        <FontAwesomeIcon icon={faSave} color="lightgrey" size="sm" />
      </button>
      <button
        onClick={clearNotebook}
        className="p-2 text-white rounded-full cursor-pointer"
      >
        <FontAwesomeIcon icon={faTrash} color="lightgrey" size="sm" />
      </button>
      <button
        className="p-2 text-white rounded-full cursor-pointer"
        onClick={insertCodeCell}

      >
        <FontAwesomeIcon icon={faPlus} color="lightgrey" size="sm" /> Cell
      </button>
      <button
       className="p-2 text-white rounded-full cursor-pointer"
      >
        <NavLink to={"#"} target="_blank">
          <FontAwesomeIcon icon={faPlus} color="lightgrey" size="sm" /> NB
        </NavLink>
      </button>
    </div>
  );
}

export default TopButtons;
