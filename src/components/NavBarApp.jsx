import {
	Anchor,
	Button,
	ScrollArea,
	Collapse,
	UnstyledButton,
	Group,
} from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import { useSelector } from 'react-redux'
import { CaretDown, CaretUp } from 'tabler-icons-react'
import classes from './NavBarApp.module.css'

const NavBarApp = ({ close, admin }) => {
	const adminLinksCategories = useSelector(state => state.categories.categories)
	const adminSubsectionCategories = useSelector(state => state.categories.categoriesSubsection)
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
			link: '/delivery',
			name: 'Доставка'
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

	const adminItems = adminLinksCategories.map((link, indx) => {
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

	const itemsSubcategories = adminSubsectionCategories.map((link, indx) => {
		return (
			<Anchor
				component={NavLink}
				to={`category/subcategory/${link.link}`}
				key={indx}
				className={classes.link}
				onClick={() => close()}
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
			label: 'Доставка',
			link: 'delivery',
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
				onClick={() => close()}
			>
				{item.label}
			</Anchor>
		)
	})

	return (
			<ScrollArea>
				{admin ? <>{adminLinks}</> : undefined}
				{admin ? <>{itemsSubcategories}</> : undefined}
				{admin ? (
					<>
						<Anchor
							className={classes.link}
							onClick={toggle}
						>
							<Group justify='space-between'>
							Категории меню
							{!open ? <CaretDown /> : <CaretUp />}
							</Group>
						</Anchor>
						<Collapse in={open}>{adminItems}</Collapse>
					</>
				) : (
					<>{items}</>
				)}
			</ScrollArea>
	)
}
export default NavBarApp
