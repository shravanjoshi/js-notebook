import React from 'react'
import ReactMarkdown from "react-markdown";

function ReactMarkdownComponent({ code, setShowFalse }) {
  return (
      <div className="prose bg-[#11191f] text-white relative mb-4 p-4" onDoubleClick={setShowFalse}><ReactMarkdown>{code}</ReactMarkdown>
      </div>
  )
}

export default ReactMarkdownComponent
