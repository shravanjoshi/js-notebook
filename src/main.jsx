import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NewNB from './components/NewNB.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' >
            <Route path='' element={<App/>} />
            <Route path='#' element={<NewNB/>} />
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
