import React, { useState, useEffect,useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Navbar from "./Navbar";
// import ReactMarkdownComponent from "./ReactMarkdownComponent";
import { NavLink } from "react-router-dom";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/comment/comment";
import "codemirror/keymap/sublime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "codemirror/theme/abbott.css";
import {
  faPlay,
  faArrowDown,
  faTrash,
  faPlus,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import HtmlOutput from "./HtmlOutput";

const Notebook = () => {
  const [cells, setCells] = useState([
    {
      code: "This is a doc cell, you can write html or plain text here. Double click to edit. Below is a code cell.",
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "htmlmixed",
      show: true,
    },
    {
      code: "//Write your code here and test",
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "javascript",
      show: false,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none"; // Hide the iframe
      document.body.appendChild(iframe);
      iframeRef.current = iframe;
    }
  }, []);

  const addCell = (index) => {
    const newCells = [...cells];
    newCells.splice(index + 1, 0, {
      code: "//Write your code here and test",
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "javascript",
      show: false,
    });
    setCells(newCells);
  };

  const removeCell = (index) => {
    const newCells = cells.filter((_, i) => i !== index);
    setCells(newCells);
  };

  const clearNotebook = () => {
    localStorage.removeItem("notebook");
    setCells([
      {
        code: "//Write your code here and test",
        output: [],
        runCount: 0,
        runTime: 0,
        mode: "javascript",
        show: false,
      },
    ]);
  };

  const executionContext = {};

  const runCode = (index) => {
    console.log(executionContext);
    
    const newCells = [...cells];
    newCells[index].output = [];
    newCells[index].runCount += 1;

    const startTime = performance.now();

    if (newCells[index].mode === "javascript") {
      try {

        const sandboxWindow = iframeRef.current.contentWindow;

        sandboxWindow.show = (value) => {
          newCells[index].output.push(String(value));
          setCells([...newCells]);
        };

        sandboxWindow.eval(newCells[index].code);  

        const endTime = performance.now();
        newCells[index].runTime = Math.round(endTime - startTime);

        setCells([...newCells]);
      } catch (error) {
        newCells[index].output.push(`Error: ${error.message}`);
        setCells([...newCells]);
      }
    } else {
      newCells[index].show = true;
      // const html = marked(newCells[index].code);
      // newCells[index].code = html;
      setCells([...newCells]);
    }
  };

  const shiftDown = (index) => {
    if (index === cells.length - 1) return;
    const newCells = [...cells];
    [newCells[index], newCells[index + 1]] = [
      newCells[index + 1],
      newCells[index],
    ];
    setCells(newCells);
  };

  const shiftUp = (index) => {
    if (index === 0) return;
    const newCells = [...cells];
    [newCells[index], newCells[index - 1]] = [
      newCells[index - 1],
      newCells[index],
    ];
    setCells(newCells);
  };

  const downloadAsHTML = () => {
    // Generate HTML content for the notebook cells
    const htmlContent = cells
      .map((cell) => {
        if (cell.show) {
          return `<div class="relative mb-4 p-4 text-white">${cell.code}</div>`;
        } else if (cell.mode === "javascript") {
          return `<div class="cell relative mb-4 shadow-lg p-4">
        <div class="code">${cell.code}</div>
        <div class="mt-2 p-2 bg-[#11191f] text-white text-[0.8rem]">
          ${cell.output.map((line) => `<div>${line}</div>`).join("")}
        </div>
      </div>`;
        }
      })
      .join("");

    // HTML boilerplate including styles and scripts
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ScriptStation Notebook</title>
         <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/codemirror.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/theme/abbott.min.css" rel="stylesheet">
        <style>
          body {
            background: #11191f;
          }
          .cell { margin-bottom: 20px; }
          .code { background: #11191f; color: #fff; padding: 10px; font-family: monospace; }
          pre { background: #11191f; color: #fff; padding: 10px; font-size: 0.85rem; }
        </style>
      </head>
      <body>
        <div class="max-w-5xl mx-auto p-6">
          ${htmlContent}
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/codemirror.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/mode/javascript/javascript.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.63.1/mode/htmlmixed/htmlmixed.min.js"></script>
        <script>
          document.querySelectorAll('.cell').forEach((editor) => {
            const evalue = editor.querySelector('.code').textContent;
            const cm = CodeMirror(editor, {
              value: evalue,
              mode: 'javascript',
              theme: 'abbott',
              lineNumbers: true,
              readOnly: true
            });

            
            const code = editor.querySelector('.code');
            editor.removeChild(code);

            const cmWrapper = document.createElement("div");
            cmWrapper.appendChild(cm.getWrapperElement());

            editor.insertBefore(cmWrapper, editor.firstChild);
          });
          

        </script>
      </body>
      </html>
    `;

    // Create a Blob from the HTML string
    const blob = new Blob([fullHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notebook.html"; // Name of the file
    link.click(); // Trigger the download
  };

  const downloadAsHTMLOnlyOutput = () => {
    const htmlContent = cells
      .map((cell) => {
        if (cell.show === false && cell.mode === "javascript") {
          return `<div class="relative mb-4 shadow-lg p-4">
          <div class="mt-2 p-2 bg-[#11191f] text-white text-[0.8rem]">
          ${cell.output.map((line) => `<div>${line}</div>`).join("")}
          </div>
        </div>`;
        }
        if (cell.show) {
          return `<div class="relative mb-4 p-4 text-white">${cell.code}</div>`;
        }
      })
      .join("");

    // HTML boilerplate including styles and scripts
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ScriptStation Notebook</title>
         <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            background: #11191f;
          }
        </style>
      </head>
      <body>
        <div class="max-w-5xl mx-auto p-6">
          ${htmlContent}
        </div>
      </body>
      </html>
    `;

    // Create a Blob from the HTML string
    const blob = new Blob([fullHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notebook.html"; // Name of the file
    link.click(); // Trigger the download
  };

  const downloadAsJS = () => {
    let jsContent = `/*Generated by JSNB: ScriptStation*/ \n\n`;
    jsContent += cells
      .map((cell) => {
        if (cell.mode === "javascript") {
          return cell.code;
        }
      })
      .join("\n/*---------*/\n\n");

    const blob = new Blob([jsContent], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notebook.js"; // Name of the file
    link.click(); // Trigger the download
  };

  const runAll = () => {
    cells.forEach((_, index) => runCode(index));
  };

  const insertCodeCell = () => {
    const newCells = [...cells];
    newCells.push({
      code: "//Write your code here and test",
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "javascript",
      show: false,
    });
    setCells(newCells);
  };

  const insertDocCell = () => {
    const newCells = [...cells];
    newCells.push({
      code: "//Write your code here and test",
      output: [],
      runCount: 0,
      mode: "htmlmixed",
      show: false,
    });
    setCells(newCells);
  };

  const saveLocally = () => {
    setLoading(true);
    localStorage.setItem("notebook", JSON.stringify(cells));
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const loadLocal = () => {
    const storedNotebook = localStorage.getItem("notebook");
    if (storedNotebook) {
      setCells(JSON.parse(storedNotebook));
    }
  };

  return (
    <div>
      <Navbar
        onDownloadasHTML={downloadAsHTML}
        onDownloadasHTMLOnlyOutput={downloadAsHTMLOnlyOutput}
        onDownloadasJS={downloadAsJS}
        onRunAll={runAll}
        onInsertCodeCell={insertCodeCell}
        onInsertDocCell={insertDocCell}
        onSaveLocally={saveLocally}
        onLoadLocal={loadLocal}
      />
      <div className="relative max-w-5xl mx-auto p-6">
        <h1 className="mb-10 text-2xl text-amber-300 font-bold text-center">
          Welcome to ScriptStation
        </h1>
        <div className="absolute top-15 right-10 flex z-10 items-center space-x-1">
          {loading && <div className="w-4 h-4 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
          }
          <button 
            onClick={runAll}
            className="p-2 text-white rounded-full  cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlay} color="lightgrey" size="sm" />
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
            <NavLink to={'#'} target="_blank" ><FontAwesomeIcon icon={faPlus} color="lightgrey" size="sm" /> NB</NavLink>
          </button>
        </div>

        <div className="container mt-20">
        {cells.map((cell, index) =>
          cell.show ? (
            <HtmlOutput
              code={cell.code}
              setShowFalse={() => {
                const newCells = [...cells];
                newCells[index].show = false;
                setCells(newCells);
              }}
            />
          ) : (
            <div key={index} className="relative mb-6 shadow-lg p-4">
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
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    color="lightgrey"
                    size="sm"
                    />
                </button>
                <button
                  onClick={() => shiftUp(index)}
                  className="p-2 text-white rounded-full cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    color="lightgrey"
                    size="sm"
                  />
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

                  // setTimeout(() => {
                  //   editor.setSize(null, "auto");
                  // }, 0);
                }}
                editorDidMount={(editor) => {
                  editor.setSize(null, "auto");
                }}
                />
              <pre className="mt-2 p-2 bg-[#11191f] text-[#bbc6ce] text-[0.8rem] flex space-x-2">
                <div className="counter">
                  <div>
                    {cell.runCount > 0 && `[${cell.runCount}]`}
                  </div>
                  <div>
                    {`${cell.runTime}ms`}
                  </div>
                </div>
                <div className="output">
                  {cell.mode === "javascript" &&
                    cell.output.map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </pre>
            </div>
          )
        )}
        </div>
      </div>
    </div>
  );
};

export default Notebook;
