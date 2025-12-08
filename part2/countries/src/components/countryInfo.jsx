import weatherService from '../services/weather'
import {useEffect, useState} from 'react'

const CountryInfo = ({country}) => {
    const [weatherRes, setWeatherRes] = useState(null)

    const iconURL = 'https://openweathermap.org/img/wn/'

    console.log('weather data', weatherRes)

    console.log('capitalinfo', country.capitalInfo.latlng[0])

    useEffect(() => {
        weatherService
            .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
            .then(weatherRes => {
                console.log('weather data', weatherRes)
                setWeatherRes(weatherRes)
            })
            .catch(error => {
                console.log('error', error)
        })
    }, [country])

    const renderWeatherData = () => {
        if (weatherRes) {
            const imageURL = `${iconURL}${weatherRes.current.weather[0].icon}.png`
            console.log("img url,", imageURL)
            const altDes = `${weatherRes.current.weather[0].description}`
            console.log("alt des,", altDes)
            return (
                <div>
                    <p> temperature: {weatherRes.current.temp} </p>
                    <p> wind: {weatherRes.current.wind_speed} mph</p>
                    <img
                        src={imageURL}
                        alt={altDes}/>
                </div>
            )
        }
        else{
            return null
        }
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages ?? {}).map(lang => (
                    <li key={lang}> {lang} </li>
                    ))
                }
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}/>
            <h2>weather in {country.capital[0]}</h2>
            {renderWeatherData()}
        </div>
    )

    /* icon url: https://openweathermap.org/img/wn/{response.weather.icon} alt=https://openweathermap.org/img/wn/{response.weather.description}*/


}

export default CountryInfo
/* countries, name, capital, area, languages, flag */