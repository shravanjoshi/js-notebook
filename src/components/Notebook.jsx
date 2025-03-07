import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "./Navbar";
import CellButtons from "./CellButtons";
import TopButtons from "./TopButtons";
import Editor from "./Editor";
import { toast } from 'react-hot-toast';

const Notebook = () => {
  const [cells, setCells] = useState([
    {
      code: `<div style="background-color: #11191f; padding: 10px 15px; color: #f8fafc; font-family: Arial, sans-serif;">
      <h2 style="font-size: 1.8rem; color: #facc15; font-weight: bold; text-align: center; margin-bottom: 10px;">
    Welcome to ScriptStation
  </h2>
      <p style="font-size: 1rem; line-height: 1.5;">
        This notebook allows you to write and execute JavaScript code interactively. You can also add documentation alongside your code.
      </p>
      <ul style="margin-top: 10px; padding-left: 20px;">
        <li style="margin: 5px 0;">&#8226; &#160; Create new code or documentation cells.</li>
        <li style="margin: 5px 0;">&#8226; &#160; Run JavaScript code directly within the notebook.</li>
        <li style="margin: 5px 0;">&#8226; &#160; Save and download your work as HTML or JavaScript files.</li>
        <li style="margin: 5px 0;">&#8226; &#160; Style your HTML cells with custom CSS.</li>
      </ul>
      <p style="font-size: 1rem; line-height: 1.5; margin-top: 20px;">
        Double click on the cell to edit the content.
      </p>
    </div>
`,
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "htmlmixed",
      show: true,
    },
    {
      code: `show("Hello !");
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
show("Sum of first 10 numbers: " + sum);`,
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "javascript",
      show: false,
    },
    {
      code: `function square(n) {
  return n * n;
} 
//Run it once!, to call the function in other cells.`,
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "javascript",
      show: false,
    },
    {
      code: `console.log('Hello !');
show("Square of 5: " + square(5));`,
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "javascript",
      show: false,
    },
  ]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const iframeRef = useRef(null);
  const savedCellsStringRef = useRef("");


  useEffect(() => {
    const storedNotebook = localStorage.getItem("notebook");
    if (storedNotebook) {
      const parsedCells = JSON.parse(storedNotebook);
      setCells(parsedCells);
      // Store the stringified version for comparison
      savedCellsStringRef.current = storedNotebook;
    } else {
      // If no stored notebook, set the current cells as the saved state
      savedCellsStringRef.current = JSON.stringify(cells);
    }
    
    if (!iframeRef.current) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      iframeRef.current = iframe;
    }
    runAll();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        // Standard way to show a confirmation dialog before page unload
        e.preventDefault();
        e.returnValue = "Unsaved changes will be erased. Are you sure you want to reload?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);


  useEffect(() => {
    if (!savedCellsStringRef.current) return;
    
    const cleanCells = cells.map(cell => ({
      code: cell.code,
      mode: cell.mode,
    }));
    
    const currentCellsJSON = JSON.stringify(cleanCells);
    

    const savedCells = JSON.parse(savedCellsStringRef.current);
    const cleanSavedCells = savedCells.map(cell => ({
      code: cell.code,
      mode: cell.mode,
    }));
    const savedCellsJSON = JSON.stringify(cleanSavedCells);
    
    setHasUnsavedChanges(currentCellsJSON !== savedCellsJSON);
  }, [cells]);

  const addCell = (index) => {
    const newCells = [...cells];
    newCells.splice(index + 1, 0, {
      code: "",
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
    const newCells = [{
      code: "//Write your code here and test",
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "javascript",
      show: false,
    }];
    
    localStorage.removeItem("notebook");
    savedCellsStringRef.current = JSON.stringify(newCells);
    setCells(newCells);
    setHasUnsavedChanges(false);
  };

  const runCode = useCallback(
    (index) => {
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
        setCells([...newCells]);
      }
    },
    [cells]
  );

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

    const blob = new Blob([fullHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notebook.html";
    link.click();
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

    const blob = new Blob([fullHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notebook.html";
    link.click();
  };

  const downloadAsJS = () => {
    let jsContent = `/*Generated by JSNB: ScriptStation*/`;
    jsContent += cells
      .map((cell) => {
        if (cell.mode === "javascript") {
          return cell.code;
        }
      })
      .join("\n\n/*---------*/\n\n");

    const blob = new Blob([jsContent], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notebook.js";
    link.click();
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
      code: "This is a doc cell, you can write html or plain text here",
      output: [],
      runCount: 0,
      runTime: 0,
      mode: "htmlmixed",
      show: false,
    });
    setCells(newCells);
  };

  const saveLocally = () => {

    const cellsToSave = JSON.stringify(cells);
    localStorage.setItem("notebook", cellsToSave);
    

    savedCellsStringRef.current = cellsToSave;
    
    setHasUnsavedChanges(false);

    toast.success('Notebook saved', {
      duration: 3000,
      position: 'bottom-right',
    });

  };

  const loadLocal = () => {
    const storedNotebook = localStorage.getItem("notebook");
    if (storedNotebook) {
      const parsedCells = JSON.parse(storedNotebook);
      setCells(parsedCells);
      savedCellsStringRef.current = storedNotebook;
      setHasUnsavedChanges(false);
      toast.success('Notebook loaded', {
        duration: 3000,
        position: 'bottom-right',
      });
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
      <div className="relative max-w-5xl mx-auto p-6 pt-3">
        <TopButtons
          clearNotebook={clearNotebook}
          insertCodeCell={insertCodeCell}
          runAll={runAll}
          saveLocally={saveLocally}
        />

        <div className="container mt-15">
          {cells.map((cell, index) =>
            cell.show ? (
              <div
                key={index}
                id="output"
                className="bg-[#11191f] text-white relative mb-6 p-4"
                dangerouslySetInnerHTML={{ __html: cell.code }}
                onDoubleClick={() => {
                  const newCells = [...cells];
                  newCells[index].show = false;
                  setCells(newCells);
                }}
              />
            ) : (
              <div key={index} className="relative mb-8 shadow-lg p-4">
                <CellButtons
                  cell={cell}
                  cells={cells}
                  addCell={addCell}
                  setCells={setCells}
                  index={index}
                  runCode={runCode}
                  shiftDown={shiftDown}
                  shiftUp={shiftUp}
                  removeCell={removeCell}
                />
                <Editor
                  cell={cell}
                  cells={cells}
                  index={index}
                  setCells={setCells}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Notebook;