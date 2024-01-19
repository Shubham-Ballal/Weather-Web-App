import React, { useState } from 'react'
import './weatherApp.css'
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import hummidity_icon from "../Assets/humidity.png"
import rain_icon from "../Assets/rain.png"
import search_icon from "../Assets/search.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"

const WeatherApp = () => {
  const [Wicon, setWicon] = useState(cloud_icon)
  let api_key="19312f9fcdb0ba79bbf3ba5d58cae340";
  const search=async()=>{
    console.log("s 1")
    const element = document.getElementsByClassName("cityInput")[0]
    console.log(element)
    if(element.value=="") return 0;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&appid=${api_key}`;

    console.log("s 2")
    let response= await fetch(url)
    let data = await response.json()
    console.log("s 3"+data)
    const humidity=document.getElementsByClassName("humidity")[0]
    const wind=document.getElementsByClassName("wind-speed")[0]
    const temp=document.getElementsByClassName("weather-temp")[0]
    const location=document.getElementsByClassName("weather-locations")[0]
    
    humidity.innerHTML=data.main.humidity+" %";
    wind.innerHTML=data.wind.speed+" Km/h";
    // temp.innerHTML=(data.main.temp-273.15)
    temp.innerHTML = (data.main.temp - 273.15).toFixed(2)+"°c";
    location.innerHTML=data.name

    if(data.weather.icon=="01d" || data.weather.icon=="01n"){setWicon(clear_icon);}
    else if(data.weather.icon=="02d" || data.weather.icon=="02n"){setWicon(cloud_icon);}
    else if(data.weather.icon=="03d" || data.weather.icon=="03n"){setWicon(drizzle_icon);}
    else if(data.weather.icon=="04d" || data.weather.icon=="04n"){setWicon(drizzle_icon);}
    else if(data.weather.icon=="09d" || data.weather.icon=="09n"){setWicon(rain_icon);}
    else if(data.weather.icon=="10d" || data.weather.icon=="10n"){setWicon(rain_icon);}
    else if(data.weather.icon=="13d" || data.weather.icon=="13n"){setWicon(snow_icon);}
    else {setWicon(clear_icon)}



  }
  return (
    <>
    <div className='container'>
      <div className='top-bar'>
          <input type='text' className='cityInput' placeholder='Search'/>
          <div className='search-icon' onClick={()=>search()}>
              <img src={search_icon} alt="SearchImg" />
          </div>
      </div>
      <div className='weather-img'>
        <img src={Wicon} alt="cloud"/>
      </div>
      <div className='weather-temp'>24 °c</div>
      <div className='weather-locations'>Japan</div>
      <div className='data-container'>
        <div className='element'>
          <img src={hummidity_icon} alt=" " className='icon'/>
          <div className='data'>
            <div className="humidity">64</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt="" className='icon'/>
          <div className='data'>
            <div className="wind-speed">18 Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default WeatherApp