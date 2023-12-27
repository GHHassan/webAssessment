/**
 * App component 
 * 
 * This component is used to manage the ChI2023 website.
 * It is the parent component of all other components.
 * It is used for routing and passing props to the child components
 * to avoid unnecessary fetching and re-rendering of the child 
 * components.
 * It also fetches the random content to display on the home page
 * to avoid unnecessary fetching and re-rendering of the random
 * content on the home page after every re-rendering of the home page.
 * Its dependencies are: all the components in the components folder
 * 
 * @uses google JavaScript style guide {@link https://google.github.io/styleguide/jsguide.html}
 * @usedBy index.jsx
 * @param {signedIn userID} props
 * @author Ghulam Hassan Hassani <w20017074>
 */

import React from 'react'
import Header from './components/pageFractions/Header'
import Home from './components/pages/Home'
import Countries from './components/pages/Countries'
import Contents from './components/pages/Contents'
import NotFound from './components/pages/NotFound'
import Footer from './components/pageFractions/Footer'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchRandomContent } from './components/utils/FetchFunctions'

function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [userID, setUserID] = useState('')
  const [countries, setCountries] = useState([])
  const [contents, setContents] = useState([])
  const [awards, setAwards] = useState([])
  const [loadedCountries, setLoadedCountries] = useState([])
  const [homeContent, setHomeContent] = useState([])
  const [embed, setEmbed] = useState("")
  const [types, setTypes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRandomContent()
        setHomeContent(data)
        const videoKey = extractVideoKey(data[0].preview_video)
        setEmbed(`https://www.youtube.com/embed/${videoKey}`)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const extractVideoKey =(url) => {
    const regex = /[?&]v=([^#&]*)/i
    const match = url.match(regex)
    return match ? match[1] : null
  }

  return (
    <div className='App'>
      <Header
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        userID={userID}
        setUserID={setUserID}
      />
      <Routes>
        <Route path="/" element={<Home
          homeContent={homeContent}
          embed={embed}
        />}
        />
        <Route
          path="/countries"
          element={<Countries
            countries={countries}
            setCountries={setCountries}
            loadedCountries={loadedCountries}
            setLoadedCountries={setLoadedCountries}
          />}
        />
        <Route
          path="/contents"
          element={<Contents
            contents={contents}
            setContents={setContents}
            awards={awards}
            setAwards={setAwards}
            signedIn={signedIn}
            types={types}
            setTypes={setTypes}
          />}
        />
        <Route path="*" element={<NotFound code={404} message={'Page Not found'}/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App