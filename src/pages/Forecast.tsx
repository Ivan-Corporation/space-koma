// @ts-nocheck
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Divider, Grid, TextField, Tooltip, Typography } from '@mui/material'
import axios from 'axios';
import React, { SetStateAction, useState } from 'react'
import '../styles/Forecast.css'
import LocationCityIcon from '@mui/icons-material/LocationCity';






function Forecast() {

	const savedOne: any = localStorage.getItem("city");
	let [responseData, setResponseData] = useState([]);
	const initialCity = JSON.parse(savedOne) || '';

	let [city, setCity] = useState(initialCity || 'London')

	localStorage.setItem("city", JSON.stringify(city));

	const handleChange = (event: any) => {
		window.location.reload();
		fetchData()
	};

	console.log(responseData)


	const fetchData = React.useCallback(() => {
		axios({
			method: 'GET',
			url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
			params: { q: `${city}`, days: '3' },
			headers: {
				'X-RapidAPI-Key': 'c232c6ccd4msh0bcf1216baa6af8p1baf68jsnf2c8ea66b4db',
				'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
			}
		})
			.then((response: { data: SetStateAction<string> }) => {
				setResponseData(response.data)
			})
			.catch((error: any) => {
				console.log(error)
			})
	}, [])

	React.useEffect(() => {
		fetchData()

	}, [fetchData])

	console.log(responseData?.forecast?.forecastday)

	return (
		<React.Fragment>

			<Container className='Forecast'>
				<h1 className="Forecast-title">Forecast ⛅</h1>


				<TextField
					onChange={(e) => {
						setCity(e.target.value)
					}}
					value={city}
					placeholder='Enter your city'
					id="outlined-basic" label="City" variant="outlined"
				/>

				<br />
				<Button style={{ marginTop: '2%' }} variant="contained" onClick={(e) => handleChange(e)} endIcon={<LocationCityIcon />}><h2 style={{ fontWeight: '800', fontSize: '18px' }}>Find city</h2></Button>

				<h1 style={{ fontWeight: '800' }}>City: <span style={{ fontWeight: '800', color: 'palegoldenrod' }}>🌆 {responseData?.location?.name}</span></h1>
				<h3>🏝 Region: <span style={{ fontWeight: '800', color: 'palegoldenrod' }}>{responseData?.location?.region}</span></h3>
				<h3>🗺 Country: <span style={{ fontWeight: '800', color: 'palegoldenrod' }}>{responseData?.location?.country}</span></h3>
				<p>⏰ Local time: {responseData?.location?.localtime}</p>
				<Divider variant="middle" style={{ marginLeft: '20%', marginRight: '20%' }} />
				<img src={responseData?.current?.condition?.icon} />
				<p style={{ marginTop: '-0.5%' }}>{responseData?.current?.condition?.text}</p>
				<p><b>Temperature: {responseData?.current?.temp_c} ℃ - <Tooltip title="Feels like" arrow><span>({responseData?.current?.feelslike_c} ℃)</span></Tooltip></b></p>
				<p><b> </b></p>
				<p><b>Temperature: {responseData?.current?.temp_f} ℉ - <Tooltip title="Feels like" arrow><span>({responseData?.current?.feelslike_f} ℃)</span></Tooltip></b></p>

				<p>Wind: {responseData?.current?.wind_mph} mph 🌪</p>
				<p>Wind direction: {responseData?.current?.wind_dir} 🧭</p>
				<p>Humidity: {responseData?.current?.humidity} 💧</p>
				<p>Cloudness: {responseData?.current?.cloud} ☁</p>
				<p>Pressure: {responseData?.current?.pressure_mb} mb🌡</p>




				{/* {responseData?.forecast?.forecastday?.} */}


				{/* Forecast for future days */}

				<Grid container spacing={2} style={{ marginBottom: '10%' }}>

					{responseData?.forecast?.forecastday?.map((weather) => (

						<Grid item key={weather.date_epoch} xs={12} sm={12} md={4}>
							<CardActionArea>
								<Card >
									<CardMedia
										component="img"
										style={{ width: '77px' }}
										className='Forecast-image'
										image={weather.day.condition.icon}
										alt={weather.day.condition.text}
									/>
									{weather.day.condition.text}
									<CardContent >
										<Typography style={{ fontWeight: '800' }} align="center" gutterBottom variant="p">
											<p>Temperature: {weather.day.avgtemp_c} ℃ </p>
											<p>Temperature: {weather.day.avgtemp_f} ℉</p>

											<p>Humidity: {weather.day.avghumidity} ☁</p>
											<p>Chance of rain: {weather.day.daily_chance_of_rain} 💧</p>
											<p>Chance of snow: {weather.day.daily_chance_of_snow} ❄</p>

											<Divider variant='middle' />

											<p>Sunrise: {weather.astro.sunrise} - Sunset: {weather.astro.sunset} 🌞</p>

											<p>Moonrise: {weather.astro.moonrise} - Moonset: {weather.astro.moonset} 🌕</p>

											<p>Moon phase - {weather.astro.moon_phase} 🌖</p>
										</Typography>
										<Typography align="center" variant="subtitle1">
											Date: {weather.date} 📅
										</Typography>

									</CardContent>




								</Card>
							</CardActionArea>

						</Grid>

					))}


				</Grid>
			</Container>

		</React.Fragment >
	)
}
export default Forecast