import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Tostify from './components/Tostify'
import View from './components/view'
import 'react-toastify/ReactToastify.css'
function App() {

  return (
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<Tostify/>} />
    <Route path='/:id' element={<Tostify/>} />
    <Route path='/view' element={<View/>} />
  </Routes>
    </BrowserRouter>
  )
}

export default App
