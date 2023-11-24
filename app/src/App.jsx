import React from 'react'
import Home from './components/pages/Home'
import Content from './components/pages/Content'
import Country from './components/pages/Country'
import Menue from './components/Menue'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <nav>
        <Menue/>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contents" element={<Content />} />
        <Route path="/countries" element={<Country />} />
        <Route path="*" element={<p>Not found 404</p>} />
      </Routes>
    </>
  )
}

export default App
