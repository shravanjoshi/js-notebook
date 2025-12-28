import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faTrash,
    faPlus,
    faArrowDown,
    faArrowUp,
  } from "@fortawesome/free-solid-svg-icons";

function CellButtons({ cell, cells, setCells, index, runCode, shiftDown, shiftUp, removeCell, addCell }) {
  return (
    <>
      <div className="absolute top-[-20px] right-4 flex z-10">
        <select
          className="p-2 text-gray-300 text-sm rounded-full cursor-pointer"
          value={cell.mode}
          onChange={(e) => {
            const newCells = [...cells];
            newCells[index].mode = e.target.value;
            setCells(newCells);
          }}
        >
          <option value="javascript">Code</option>
          <option value="htmlmixed">Doc</option>
        </select>
        <button
          onClick={() => runCode(index)}
          className="p-2 text-white rounded-full  cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlay} color="lightgrey" size="sm" />
        </button>
        <button
          onClick={() => shiftDown(index)}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowDown} color="lightgrey" size="sm" />
        </button>
        <button
          onClick={() => shiftUp(index)}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowUp} color="lightgrey" size="sm" />
        </button>
        <button
          onClick={() => removeCell(index)}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faTrash} color="lightgrey" size="sm" />
        </button>
        <button
          onClick={() => addCell(index)}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} color="lightgrey" size="sm" />
        </button>
      </div>
    </>
  );
}

export default CellButtons;
