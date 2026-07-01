import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './NavBar.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>
)
