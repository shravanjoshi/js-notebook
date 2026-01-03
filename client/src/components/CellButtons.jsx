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
      <div className="absolute top-[-25px] md:top-[-20px] right-4 flex z-10">
        <select
          className="p-2 text-gray-300 text-sm rounded-full cursor-pointer focus:outline-none"
          value={cell.mode}
          onChange={(e) => {
            const newCells = [...cells];
            newCells[index].mode = e.target.value;
            setCells(newCells);
          }}
          aria-label="Mode"
        >
          <option className="bg-[#11191f]" value="javascript">Code</option>
          <option className="bg-[#11191f]" value="htmlmixed">Doc</option>
        </select>
        <div onClick={() => runCode(index)} className="p-2 rounded-full  cursor-pointer">
          <FontAwesomeIcon icon={faPlay} color="lightgrey" size="sm" />
        </div>
        <div
          onClick={() => shiftDown(index)}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowDown} color="lightgrey" size="sm" />
        </div>
        <div
          onClick={() => shiftUp(index)}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowUp} color="lightgrey" size="sm" />
        </div>
        <div
          onClick={() => removeCell(index)}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faTrash} color="lightgrey" size="sm" />
        </div>
        <div
          onClick={() => addCell(index)}
          className="p-2 text-white rounded-full cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} color="lightgrey" size="sm" />
        </div>
      </div>
    </>
  );
}

export default CellButtons;
