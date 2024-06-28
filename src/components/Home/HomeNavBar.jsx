import { Anchor, AppShellNavbar, Paper, ScrollArea } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { closeHomeNavBar } from '../../store/navBarSlice'
import HomeNavBarCntacts from './HomeNavBarCntacts'
import classes from './HomeNavBar.module.css'

const HomeNavBar = () => {
	const opened = useSelector(state => state.navBar.homeNavBar)
	const dispatch = useDispatch()

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
				onClick={() => dispatch(closeHomeNavBar())}
			>
				{link.name}
			</Anchor>
		)
	})

	return (
		<AppShellNavbar
			p='md'
			className={classes.navBar}
			// hiddenBreakpoint={5000}
			hidden={!opened}
			width={{ md: 220 }}
		>
			<ScrollArea>
				<>{items}</>
			</ScrollArea>
			<Paper p='xs'>
				<HomeNavBarCntacts />
			</Paper>
		</AppShellNavbar>
	)
}
export default HomeNavBar
