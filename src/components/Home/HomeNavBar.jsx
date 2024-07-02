import { Anchor, Center, Paper, ScrollArea, SimpleGrid } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import HomeNavBarCntacts from './HomeNavBarCntacts'
import classes from './HomeNavBar.module.css'
import { ThemeChange } from '../Theme-change'

const HomeNavBar = ({ close }) => {

	const linksMain = [
		{
			link: '/',
			name: 'Главная',
		},
		{
			link: '/menu',
			name: 'Меню',
		},
		{
			link: '/stock',
			name: 'Акции',
		},
		{
			link: '/contacts',
			name: 'Контакты',
		},
	]

	const items = linksMain.map((link, indx) => {
		return (
			<Anchor
				component={NavLink}
				to={link.link}
				key={indx}
				className={classes.link}
				onClick={() => close()}
			>
				{link.name}
			</Anchor>
		)
	})

	return (
		<>
			<ScrollArea>
				<>{items}</>
			</ScrollArea>
			<SimpleGrid cols={2}>
				<Paper p='xs'>
					<HomeNavBarCntacts />
				</Paper>
				<Paper>
					<Center h="100%">
					<ThemeChange />
					</Center>
				</Paper>
			</SimpleGrid>

		</>
	)
}
export default HomeNavBar
