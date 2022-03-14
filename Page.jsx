import React, { useEffect, useState } from 'react'
import { WiCelsius, WiHumidity, WiTsunami } from "react-icons/wi";
import { BsThermometerSun, BsCloudSun, BsSearch } from "react-icons/bs";


export default function Page() {
    const [city, setcity] = useState(null)
    const [search, setsearch] = useState("ujjain")

    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=3fa05990ec60a9fed7b01f8a392884b5`
            const res = await fetch(url);
            const jsondata = await res.json();
            setcity(jsondata.main)
            console.log("response is -> ", jsondata);
        }
        fetchApi();
    }, [search])

    return (
        <>
            <div className='page'>
                <h2 className='name'>Weather App <BsThermometerSun/></h2>
                <div className='input'>
                    <BsSearch /> <input type="text" className='input-search' placeholder='Place ?' onChange={(event) => { setsearch(event.target.value) }} value={search} />
                </div>
                {
                    !city ? (
                        <p> No data found</p>
                    ) : (<div className='show'>
                            <h1 className='place'> {search} <BsCloudSun/></h1>
                        <h3 className='temp'>{city.temp}<WiCelsius size={40} /></h3>
                        <p className='temp'>Feel's Like : {city.feels_like}<WiCelsius size={40} /></p>
                        <p className='temp'>Max : {city.temp_max}<WiCelsius size={40} />  Min : {city.temp_min}<WiCelsius size={40} /></p>
                        <p className='temp'>Humidity : {city.humidity}<WiHumidity size={30} /></p>
                        <p className='temp'>Sea-Level : {city.sea_level}<WiTsunami size={30} /></p>
                    </div>)
                }
            </div>
        </>
    )
}

