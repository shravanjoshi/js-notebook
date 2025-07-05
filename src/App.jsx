import Notebook from './components/Notebook.jsx'
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <>
      <Toaster />
      <Notebook />
      <Analytics />
    </>
  )
}

export default App
