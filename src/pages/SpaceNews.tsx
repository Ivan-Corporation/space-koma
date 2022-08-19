// @ts-nocheck
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Tooltip, Typography } from '@mui/material'
import axios from 'axios';
import React, { SetStateAction, useMemo, useState } from 'react'
import Pagination from '../pagination/Pagination';
import '../styles/SpaceNews.css'
import AnotherSiteLink from '@mui/material/Link'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';


let PageSize = 8;


function SpaceNews() {


	let [responseData, setResponseData] = React.useState([]);





	// console.log(responseData)




	const fetchData = React.useCallback(() => {
		axios({
			method: 'GET',
			url: 'https://spacefo.p.rapidapi.com/articles',
			headers: {
				'X-RapidAPI-Key': 'c232c6ccd4msh0bcf1216baa6af8p1baf68jsnf2c8ea66b4db',
				'X-RapidAPI-Host': 'spacefo.p.rapidapi.com'
			}
		})
			.then((response: { data: SetStateAction<string>; }) => {
				setResponseData(response.data)
				console.log(response)
			})
			.catch((error: any) => {
				console.log(error)
			})

	}, [])

	React.useEffect(() => {
		fetchData()

	}, [fetchData])












	const [currentPage, setCurrentPage] = useState('');

	const currentProjectData = useMemo(() => {

		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return responseData.slice(firstPageIndex, lastPageIndex);

	}, [currentPage]);


	return (
		<React.Fragment>

			<Container className='SpaceNews'>
				<h1 className="SpaceNews-title">Space News 🛸</h1>

				<Grid container spacing={2} >

					{currentProjectData.map((news) => (

						<Grid item key={news.title} xs={12} sm={6} md={6}>
							<AnotherSiteLink target='_blank' href={news.link} style={{ textDecoration: 'none' }}>
								<CardActionArea>
									<Card>
										<CardMedia
											component="img"
											height="340"
											image={news.image.src}
											alt={news.image.alt}
										/>

										<CardContent className='Card-content'>
											<Typography style={{ fontWeight: '800' }} align="center" gutterBottom variant="h6" component="h2">
												{news.title}
											</Typography>
											<Typography align="center" variant="subtitle1">
												{news.description}
											</Typography>

										</CardContent>


										<CardActions >
											<Container align='left'>
												<span style={{ fontWeight: '800' }}>Author:</span> {news.author}
											</Container>

											<Container align='right'>
												<Tooltip title={('created')} arrow>
													<Button variant="outlined" endIcon={<EventAvailableIcon fontSize="large" />}>
														{news.time.substr(0, 10)} <br />
														{news.time.slice(11, 19)}
													</Button>
												</Tooltip>
											</Container>
										</CardActions>

									</Card>
								</CardActionArea>
							</AnotherSiteLink>
						</Grid>

					))}


				</Grid>


				<h2 style={{ fontWeight: '800' }}>Choose page: 📑</h2>
				<div className='paginationBar'>

					<Pagination
						className="pagination-bar"
						currentPage={currentPage}
						totalCount={responseData.length}
						pageSize={PageSize}

						onPageChange={page => setCurrentPage(page)}

					/>
				</div>
			</Container>

		</React.Fragment >
	)
}
export default SpaceNews