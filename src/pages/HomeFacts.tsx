// @ts-nocheck
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { SetStateAction } from 'react';
import '../styles/Home.css'

function HomeFacts() {

	let [responseData, setResponseData] = React.useState('');









	const fetchData = React.useCallback(() => {
		axios({
			method: 'GET',
			url: 'https://astronomy-picture-of-the-day.p.rapidapi.com/apod',
			params: { api_key: 'nWYhQQdmCKwd0cVvrfyge124OrW4fnVOEL7QDdJH' },
			headers: {
				'X-RapidAPI-Key': 'c232c6ccd4msh0bcf1216baa6af8p1baf68jsnf2c8ea66b4db',
				'X-RapidAPI-Host': 'astronomy-picture-of-the-day.p.rapidapi.com'
			}
		})
			.then((response: { data: SetStateAction<string>; }) => {
				setResponseData(response.data)
			})
			.catch((error: any) => {
				console.log(error)
			})
	}, [])

	React.useEffect(() => {
		fetchData()
	}, [fetchData])





	return (
		<React.Fragment>
			<Container className='Home'>
				<h1 className="Home-title">Everyday Facts 🦉</h1>


				<h1>🌚{responseData.title}🌝</h1>
				<Box>
					<img src={responseData.hdurl} alt={responseData.title} className='Home-image' />
				</Box>
				<h3>💡 {responseData.explanation}</h3>
				<h3>📅 {responseData.date}</h3>
				<h3 className="Home-bottom">{responseData.copyright} ©</h3>

				<h1>If empty - comeback tomorrow or check <a href='/space-news' style={{ textDecoration: 'none' }}>Space News 🛸</a> and <a href='/forecast' style={{ textDecoration: 'none' }}>Forecast ⛅</a></h1>
			</Container>
		</React.Fragment>
	)
}
export default HomeFacts