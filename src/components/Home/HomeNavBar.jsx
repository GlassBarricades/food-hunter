import {
	Anchor,
	createStyles,
	Navbar,
	ScrollArea,
} from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { closeHomeNavBar } from '../../store/navBarSlice'

const useStyles = createStyles(theme => ({
    navBar: {
		backgroundColor: "transparent",
	},
	links: {
		[theme.fn.smallerThan('xs')]: {
			display: 'none',
		},
	},
	link: {
		display: 'block',
		lineHeight: 1,
		padding: '18px 17px',
        marginBottom: '15px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.yellow[7]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,
        backgroundColor: theme.colors.dark[6],

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},
	active: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
		},
	},
}))

const HomeNavBar = () => {
	const opened = useSelector(state => state.navBar.homeNavBar)
	const dispatch = useDispatch()
	const { classes } = useStyles()

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
		<Navbar p='md' className={classes.navBar}  hiddenBreakpoint={5000} hidden={!opened} width={{ md: 220 }}>
			<ScrollArea>
					<>{items}</>
			</ScrollArea>
		</Navbar>
	)
}
export default HomeNavBar