import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { SimpleGrid, Tabs } from '@mantine/core'
import { getDatabase, ref, child, get } from 'firebase/database'
import ScrollToTop from '../helpers/ScrollToTop'
import { useNavigate, useParams } from 'react-router-dom'
import useSortDataVisible from '../hooks/useSortDataVisible'
import MenuCard from '../components/MenuCard'

const CategoryPage = () => {
	const { dataBase, category, dataCategories } = useLoaderData()
	const navigate = useNavigate()
	const { tabValue } = useParams()
	const sortedCategories = useSortDataVisible(dataCategories, 'position')
	const [activeTab, setActiveTab] = useState(
		dataCategories ? dataCategories[0].name : undefined
	)
	console.log(tabValue)
	const sortedData = useSortDataVisible(dataBase, 'position')

	const filteredData = dataBase.filter(item => {
		if (tabValue === item.category) {
			return item
		}
	})
	const sortedDataA = useSortDataVisible(filteredData, 'position')

	return (
		<>
			<ScrollToTop />
			{category === 'alcohol' ||
			category === 'napitki' ||
			category === 'gorjachie-napitki' ? (
				<Tabs
					color='yellow'
					variant='pills'
					defaultValue={activeTab}
					value={tabValue}
					onTabChange={value => navigate(`/menu/${category}/tabs/${value}`)}
				>
					<Tabs.List>
						{sortedCategories.map(item => {
							return (
								<Tabs.Tab key={item.uuid} value={item.name}>
									{item.name}
								</Tabs.Tab>
							)
						})}
					</Tabs.List>

					{sortedCategories.map(item => {
						return (
							<Tabs.Panel key={item.uuid} value={item.name} pt='xs'>
								<SimpleGrid
									cols={5}
									spacing='xl'
									breakpoints={[
										{ maxWidth: 'xl', cols: 5, spacing: 'lg' },
										{ maxWidth: 'lg', cols: 4, spacing: 'lg' },
										{ maxWidth: 'md', cols: 3, spacing: 'md' },
										{ maxWidth: 'sm', cols: 2, spacing: 'sm' },
										{ maxWidth: 'xs', cols: 2, spacing: 'sm' },
									]}
								>
									{sortedDataA.map((item, index) => {
										const itemVariants = item.variant
											? Object.values(item.variant)
											: undefined
										return (
											<MenuCard
												key={index}
												dataItem={item}
												category={category}
												itemVariants={itemVariants}
											/>
										)
									})}
								</SimpleGrid>
							</Tabs.Panel>
						)
					})}
				</Tabs>
			) : (
				<SimpleGrid
					cols={5}
					spacing='xl'
					breakpoints={[
						{ maxWidth: 'xl', cols: 5, spacing: 'lg' },
						{ maxWidth: 'lg', cols: 4, spacing: 'lg' },
						{ maxWidth: 'md', cols: 3, spacing: 'md' },
						{ maxWidth: 'sm', cols: 2, spacing: 'sm' },
						{ maxWidth: 'xs', cols: 2, spacing: 'sm' },
					]}
				>
					{sortedData.map((item, index) => {
						const itemVariants = item.variant
							? Object.values(item.variant)
							: undefined
						return (
							<MenuCard
								key={index}
								dataItem={item}
								category={category}
								itemVariants={itemVariants}
							/>
						)
					})}
				</SimpleGrid>
			)}
		</>
	)
}

const categoryLoader = async ({ params }) => {
	const category = params.category
	const dbRef = ref(getDatabase())
	let dataBase
	let dataCategories
	await get(child(dbRef, `menu/${category}`))
		.then(snapshot => {
			if (snapshot.exists()) {
				const data = Object.values(snapshot.val())
				return data
			} else {
				console.log('No data available')
			}
		})
		.then(data => {
			dataBase = data
		})
		.catch(error => {
			console.error(error)
		})
	if (
		category === 'alcohol' ||
		category === 'napitki' ||
		category === 'gorjachie-napitki'
	) {
		await get(child(dbRef, `/categories-${category}/`))
			.then(snapshot => {
				if (snapshot.exists()) {
					const data = Object.values(snapshot.val())
					return data
				} else {
					console.log('No data available')
				}
			})
			.then(data => {
				dataCategories = data
			})
			.catch(error => {
				console.error(error)
			})
	}
	return { dataBase, category, dataCategories }
}

export { CategoryPage, categoryLoader }
