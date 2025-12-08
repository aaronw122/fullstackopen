import { useState, useEffect } from 'react'
import './App.css'
import countryService from './services/countries'
import Country from './components/country.jsx'
import CountryInfo from "./components/countryInfo.jsx";

function App() {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)


    useEffect(() => {
        countryService
            .getAll()
            .then(allCountries => {
                console.log("all countries:", allCountries)
                setCountries(allCountries)
            })
    }, [] )

    useEffect(() => {
        if (searchText === '') {
            setFilteredCountries(null);
        }
        else{
            setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase())))
        }
        console.log('filtered country', filteredCountries)
    }, [searchText])

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearchText(event.target.value)
        setSelectedCountry(null)
    }

    const renderResults = () => {
        if (!filteredCountries) return null
        if(selectedCountry){
            return <CountryInfo country={selectedCountry}/>
        }
        if (filteredCountries.length === 1){
            return <CountryInfo country={filteredCountries[0]}/>
        }
        if (filteredCountries.length <= 10){
            return <Country countries={filteredCountries} onClick={showCountryInfo}/>
        }

        return <p>too many matches, be more specific</p>
    }

    const showCountryInfo = (country) => {
        console.log("country:", country)
        console.log('countries,', filteredCountries)
        setSelectedCountry(country)
    }

    return (
        <div>
            <form>
                find countries: <input value={searchText} onChange={handleSearchChange}/>
            </form>
            {renderResults()}
        </div>
    )
}

export default App
