import { useState } from "react"

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '38864ed5d1b8aa2e401cfd1430ef04d6'
    const difKelvin = 273.5

    const [ciudad, setCiudad] = useState('')
    const [dataClima,setDataClima]=useState(null)

    const handleCambioCiudad = (e) =>{
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try{
            const response = await fetch (`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        }catch(error){
            console.error('Ocurrio un error: ', error)
        }
    }

  return (
    <div>
      <div className="container">
        <h1>Aplicación de clima</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={ciudad} onChange={handleCambioCiudad} />
            <button type="button">Buscar</button>
        </form>
        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                    <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                </div>
            )
        }
      </div>
    </div>
  )
}


