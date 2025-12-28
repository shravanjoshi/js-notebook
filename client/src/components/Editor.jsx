import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/comment/comment";
import "codemirror/keymap/sublime";
import "codemirror/theme/abbott.css";

function Editor({ cell, cells, setCells, index }) {
  return (
    <>
      <CodeMirror
        value={cell.code}
        options={{
          mode: cell.mode,
          theme: "abbott",
          lineNumbers: true,
          keyMap: "sublime",
          lineWrapping: true,
          extraKeys: {
            "Ctrl-/": (cm) => cm.execCommand("toggleComment"),
          },
          viewportMargin: Infinity,
        }}
        className="text-[0.95rem]"
        onBeforeChange={(editor, data, value) => {
          const newCells = [...cells];
          newCells[index].code = value;
          setCells(newCells);
        }}
        editorDidMount={(editor) => {
          editor.setSize(null, "auto");
        }}
      />
      {cell.mode === "javascript" && 
      <pre className="mt-2 p-2 bg-[#11191f] text-[#bbc6ce] text-[0.8rem] flex space-x-2">
        <div className="counter">
          <div>{`[${cell.runCount}]`}</div>
          <div>{`${cell.runTime}ms`}</div>
        </div>
        <div className="output ml-1">
          {cell.mode === "javascript" &&
            cell.output.length > 0 ? cell.output.map((line, i) => <div key={i}>{line}</div>)
            : cell.runCount>0 ? 'undefined': ''}
        </div>
      </pre>
          }
    </>
  );
}

export default Editor;
