# ScriptStation

**ScriptStation** is a cloud-based JavaScript notebook that allows you to write, execute, alongside documentation—all within an interactive and secure environment.

## Overview

ScriptStation offers a unique, browser-based interface where developers can:
- **Toggle Between Code and Documentation:** Seamlessly switch between JavaScript code cells and HTML-based documentation cells.
- **Secure Execution:** Run user-defined functions and scripts in a sandboxed iframe, ensuring that code executes in isolation without affecting the host application.
- **Manage Cells Easily:** Add, remove, and reorder cells to tailor your workflow and organize your projects efficiently.
- **Local Persistence & Export:** Save notebooks in local storage and export them as HTML or JavaScript files for offline use.

## Features

- **Integrated Code Editor:**  
  - Utilizes CodeMirror to provide an intuitive code editing experience.
  
- **Secure Sandbox Execution:**  
  - Employs sandboxed iframes to execute code safely, preserving global state between cells without compromising security.
  
- **Dynamic Cell Management:**  
  - Easily add, remove, or reorder cells for both code and documentation to streamline the coding and testing workflow.
  
- **Local Storage Persistence:**  
  - Allows the user to save their work in browsers local storage to keep their work saved for future use.
  
- **Export Options:**  
  - Export your entire notebook as HTML or JavaScript files for offline access.
  
- **Modern UI:**  
  - Built with React and styled with Tailwind CSS to deliver a responsive and user-friendly interface.

## Technologies Used

- **React:** For building the dynamic, interactive user interface.
- **CodeMirror:** As the integrated code editor with support for multiple programming modes.
- **Tailwind CSS:** For creating a clean, responsive, and modern design.
- **JavaScript:** For core functionality and secure code execution via sandboxed iframes.

## Installation

To set up ScriptStation locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/scriptstation.git
   cd scriptstation
