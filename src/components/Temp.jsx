import ReactMarkdown from "react-markdown";

const markdown = `
Welcome to Scribbler
====================

A Javascript Compiler and Notebook Tool
--------------------------

[Gallery](https://scribbler.live/samples.html) • [Tutorials](https://scribbler.live/tutorials) • [Docs](https://scribbler.live/docs) • [Discussions](https://github.com/gopi-suvanam/scribbler/discussions/) • [Github](https://github.com/gopi-suvanam/scribbler/)

* * *

### Double-click this cell to edit

Scribbler is an interactive environment for experimenting in javascript using a simple interface (without servers and backend deployment) - essentially an easy-to-use online compiler. Scribbler can be used for:

*   Scientific Computation
*   Data Science/Machine Learning
*   Dashboard Development
*   Experimenting With new Code/Libraries

Please feel free to send in pull requests/issues on Github. Next few cells give you the "hello world" notebook.
`;

const markdown2 = `# Markdown in React
- **Bold**
- *Italic*
`;

export default function MarkdownComponent() {
  return <div className="prose text-white"><ReactMarkdown>{markdown}</ReactMarkdown></div>;
}