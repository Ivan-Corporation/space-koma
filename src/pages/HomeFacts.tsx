import { Container } from '@mui/material';
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
			params: { api_key: process.env.API_KEY },
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
				<h1 style={{ fontWeight: '800' }}>Everyday Facts</h1>
			</Container>
		</React.Fragment>
	)
}
export default HomeFacts