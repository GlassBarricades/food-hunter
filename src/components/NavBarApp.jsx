import {
	Anchor,
	Button,
	createStyles,
	Navbar,
	ScrollArea,
	Collapse,
} from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { closeNavBar } from '../store/navBarSlice'
import { CaretDown, CaretUp } from 'tabler-icons-react'

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

const NavBarApp = ({ admin }) => {
	const adminLinksCategories = useSelector(state => state.categories.categories)
	const adminSubsectionCategories = useSelector(state => state.categories.categoriesSubsection)
	const opened = useSelector(state => state.navBar.navBar)
	const dispatch = useDispatch()
	const { classes } = useStyles()
	const [open, { toggle }] = useDisclosure(false)


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
				onClick={() => dispatch(closeNavBar())}
			>
				{link.name}
			</Anchor>
		)
	})

	const adminItems = adminLinksCategories.map((link, indx) => {
		return (
			<Anchor
				component={NavLink}
				to={link.link}
				key={indx}
				className={classes.link}
				onClick={() => dispatch(closeNavBar())}
			>
				{link.name}
			</Anchor>
		)
	})

	const itemsSubcategories = adminSubsectionCategories.map((link, indx) => {
		return (
			<Anchor
				component={NavLink}
				to={`category/subcategory/${link.link}`}
				key={indx}
				className={classes.link}
				onClick={() => dispatch(closeNavBar())}
			>
				{`Категории ${link.name}`}
			</Anchor>
		)
	})

	const dataAdminLinks = [
		{
			label: 'Статистика',
			link: '/admin',
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
			label: 'Добавки для пиццы',
			link: 'pizza-ads',
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
				onClick={() => dispatch(closeNavBar())}
			>
				{item.label}
			</Anchor>
		)
	})

	return (
		<Navbar p='md' hiddenBreakpoint='md' hidden={!opened} width={{ md: 220 }}>
			<ScrollArea>
				{admin ? <>{adminLinks}</> : undefined}
				{admin ? <>{itemsSubcategories}</> : undefined}
				{admin ? (
					<>
						<Anchor
							component={Button}
							className={classes.link}
							onClick={toggle}
							rightIcon={!open ? <CaretDown /> : <CaretUp />}
						>
							Категории меню
						</Anchor>
						<Collapse in={open}>{adminItems}</Collapse>
					</>
				) : (
					<>{items}</>
				)}
			</ScrollArea>
		</Navbar>
	)
}
export default NavBarApp
