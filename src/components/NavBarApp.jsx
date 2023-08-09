import {
	Anchor,
	useMantineTheme,
	createStyles,
	Navbar,
	ScrollArea,
} from '@mantine/core'
import { NavLink } from 'react-router-dom'

const useStyles = createStyles(theme => ({
	links: {
		[theme.fn.smallerThan('xs')]: {
			display: 'none',
		},
	},
	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

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

const NavBarApp = ({ links, opened, admin, setOpened }) => {
	const theme = useMantineTheme()
	const { classes, cx } = useStyles()

	const items = links.map((link, indx) => {
		return (
			<Anchor
				component={NavLink}
				to={link.link}
				key={indx}
				className={classes.link}
				onClick={() => setOpened(false)}
			>
				{link.name}
			</Anchor>
		)
	})

	const dataAdminLinks = [
		{
			label: 'Статистика',
			link: 'stats',
		},
		{
			label: 'Акции',
			link: 'promo',
		},
		{
			label: 'Категории',
			link: 'category/categories',
		},
		{
			label: 'Категории алкоголь',
			link: 'category/categories-alcohol',
		},
		{
			label: 'Категории напитки',
			link: 'category/categories-napitki',
		},
		{
			label: 'Категории горячие напитки',
			link: 'category/categories-gorjachie-napitki',
		},
		{
			label: 'Единицы измерения',
			link: 'units',
		},
	]

	const adminLinks = dataAdminLinks.map((item, indx) => {
		return (
			<Anchor
				key={indx}
				component={NavLink}
				to={item.link}
				className={classes.link}
				onClick={() => setOpened(false)}
			>
				{item.label}
			</Anchor>
		)
	})

	return (
		<Navbar p='md' hiddenBreakpoint='md' hidden={!opened} width={{ md: 200 }}>
			<ScrollArea>
				{admin ? <>{adminLinks}</> : undefined}
				{items}
			</ScrollArea>
		</Navbar>
	)
}
export default NavBarApp
