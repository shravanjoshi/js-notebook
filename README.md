# ScriptStation

**ScriptStation** is a cloud-based JavaScript notebook that allows you to write, execute, and share code alongside documentation—all within an interactive and secure environment.

## Overview

ScriptStation offers a unique, browser-based interface where developers can:
- **Toggle Between Code and Documentation:** Seamlessly switch between JavaScript code cells and HTML-based documentation cells.
- **Secure Execution:** Run user-defined functions and scripts in a sandboxed iframe, ensuring that code executes in isolation without affecting the host application.
- **Manage Cells Easily:** Add, remove, and reorder cells to tailor your workflow and organize your projects efficiently.
- **Local Persistence & Export:** Save notebooks in local storage and export them as HTML or JavaScript files for offline use or sharing.

## Features

- **Integrated Code Editor:**  
  - Utilizes CodeMirror to provide an intuitive code editing experience with syntax highlighting and customization.
  
- **Secure Sandbox Execution:**  
  - Employs sandboxed iframes to execute code safely, preserving global state between cells without compromising security.
  
- **Dynamic Cell Management:**  
  - Easily add, remove, or reorder cells for both code and documentation to streamline the coding and testing workflow.
  
- **Local Storage Persistence:**  
  - Automatically saves your progress locally, ensuring that your work is not lost upon refreshing or closing the browser.
  
- **Export Options:**  
  - Export your entire notebook as HTML or JavaScript files for easy sharing and offline access.
  
- **Modern UI:**  
  - Built with React and styled with Tailwind CSS to deliver a responsive and user-friendly interface.

## Future Enhancements

- **Real-Time Collaboration:**  
  - Enable multiple users to work concurrently on the same notebook, fostering a collaborative development environment.
  
- **Database Integration:**  
  - Integrate a robust backend database to provide persistent storage for notebooks, enhancing data security and accessibility.

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
