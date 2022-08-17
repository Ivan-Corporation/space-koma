// @ts-nocheck
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import HomeFacts from './pages/HomeFacts';
import { motion } from 'framer-motion';
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SpaceNews from './pages/SpaceNews';
import Forecast from './pages/Forecast';
import HomeIcon from '@mui/icons-material/Home';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { Container } from '@mui/system';




interface Props {

	window?: () => Window;
}



function App(props: Props) {





	const drawerWidth = 240;
	const navItems = [
		{ id: 1, name: 'Home', link: '/', icon: <HomeIcon /> },
		{ id: 2, name: 'Space News', link: '/space-news', icon: <RocketLaunchIcon /> },
		{ id: 3, name: 'Forecast', link: '/forecast', icon: <ThunderstormIcon /> }

	];


	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				Koma Space 🛰
			</Typography>
			<Divider />
			<List>
				{navItems.map(({ id, name, link }) => (
					<ListItem key={id} disablePadding>
						<Link to={link}>
							<ListItemButton sx={{ textAlign: 'center' }}>
								<ListItemText primary={name} style={{ textDecoration: 'none', color: 'white' }} />
							</ListItemButton>
						</Link>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;



	return (
		<React.Fragment>
			<motion.div
				initial={{ opacity: 0, y: -180 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					ease: "easeInOut",
					duration: 1,
					delay: 0,
				}}
			>

				<Box sx={{ display: 'flex' }}>
					<AppBar component="nav">
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								sx={{ mr: 2, display: { sm: 'none' } }}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								component="div"
								sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
								style={{ fontWeight: '700' }}
								className='title'
							>
								Koma Space 🛰
							</Typography>
							<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
								{navItems.map(({ id, name, link, icon }) => (
									<Link to={link} style={{ textDecoration: 'none' }} >
										<Button key={id} sx={{ color: '#fff' }} startIcon={icon}>
											{name}
										</Button>
									</Link>
								))}
							</Box>
						</Toolbar>
					</AppBar>
					<Box component="nav">
						<Drawer
							container={container}
							variant="temporary"
							open={mobileOpen}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
							sx={{
								display: { xs: 'block', sm: 'none' },
								'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
							}}
						>
							{drawer}
						</Drawer>
					</Box>

				</Box>
			</motion.div>
			<Routes>

				<Route path="/" element={<HomeFacts />} />
				<Route path="/money" element={<SpaceNews />} />
				<Route path="/rooms" element={<Forecast />} />



			</Routes>

		</React.Fragment >
	);
}

export default App;
