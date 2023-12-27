/**
 * Countries page
 * 
 * This file fetches the countries from the server and
 * the flags from the restcountries API. then it combines
 * each country with its flag and passes it to the Country
 * component to be rendered.
 * The component then stores the fetched countries in the
 * state of the App component. to avoid fetching the data
 * again if the user leaves and comes back to the countries page.
 * 
 * It also add an onClick event to each country to open
 * the wikipedia page of that country on a new page.
 * 
 * Additionally, it has a search bar to filter the countries
 * based on the user input.
 * 
 * @uses Search, Country, FetchFunctions.jsx Buttons.jsx and NotFound
 * @author Ghulam Hassan Hassani <w20017074>
 */

import Search from '../pageFractions/Search'
import Country from '../pageFractions/Country'
import { fetchCountries, preloadFlags } from '../utils/FetchFunctions'
import { useEffect, useState } from 'react'
import NotFound from './NotFound'

function Countries(props) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.loadedCountries.length > 0) {
          props.setCountries(props.loadedCountries)
        } else {
          const data = await fetchCountries()
          const countriesWithFlags = await preloadFlags(data)
          props.setLoadedCountries(countriesWithFlags)
        }
      } catch (error) {
        <ErrorComponent message={error.message} />
      }
    }
    fetchData()
  }, [props.loadedCountries, props.setCountries, props.setLoadedCountries])

  const searchCountry = (country) => {
    const foundInTitle = country.country.toLowerCase().includes(search.toLowerCase())
    return foundInTitle
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const openWikipedia = (countryName) => {
    window.open(`https://en.wikipedia.org/wiki/${countryName}`, '_blank')
  }

  const countriesJSX = props.loadedCountries
    .filter(searchCountry)
    .map((country, index) => (
      <div key={index} onClick={() => openWikipedia(country.country)}>
        <Country country={country} />
      </div>
    ))
  
  const errorMessage = "Sorry, your given country either does not exist or does not have " +
    "individuals or institutes affliating CHI2023 yet"
  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mt-4 mb-6">Countries Affiliated with CHI 2023</h2>
      <Search search={search} handleContentSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 gap-4">
        {countriesJSX.length > 0 && countriesJSX }
      </div>
      <div >
        {countriesJSX.length === 0 && <NotFound message={errorMessage} />}
      </div>
    </div>
  )
}

export default Countries