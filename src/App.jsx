import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Layout from './pages/Layout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/layout" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
