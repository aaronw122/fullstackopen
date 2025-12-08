
const Country = ({countries, onClick}) => {
    return(
        countries.map(country => (
            <div style={{display:'flex'}} key={country.cca3}>
                <p> {country.name.common} </p>
                <button onClick={() => onClick(country)}>show</button>
            </div>
        ))
    )
}

export default Country