import Notebook from '../components/Notebook.jsx'
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/react"

function Home() {

  return (
    <>
      <Toaster />
      <Notebook />
      <Analytics />
    </>
  )
}

export default Home
