import React from 'react'

function HtmlOutput({code, setShowFalse}) {
    
  return (
    <div id='output' className='bg-[#11191f] text-white relative mb-6 p-4' dangerouslySetInnerHTML={{ __html: code }} onDoubleClick={setShowFalse} />
  )
}

export default HtmlOutput
