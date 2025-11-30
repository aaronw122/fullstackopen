import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'

const exclude = 'minutely,hourly,daily,alerts'

const APIKey = import.meta.env.VITE_API_KEY;

console.log('apikey,', APIKey)

const units = 'imperial';

const getWeather = (lat, lon) => {
    console.log({ baseUrl, lat, lon, exclude, units, APIKey });
    const url = `${baseUrl}lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${APIKey}`
    console.log('url:', url)
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${APIKey}`)
    console.log('request', request)
    const parsed = request.then(response => response.data)
    console.log('parsed,', parsed)
    return parsed
}

export default {getWeather}



