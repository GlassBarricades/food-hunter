import { useLoaderData } from 'react-router-dom'
import { Title, SimpleGrid } from '@mantine/core'
import PromotionCard from '../components/PromotionCard'
import { getDatabase, ref, child, get } from 'firebase/database'

const PromotionPage = () => {
	const { dataPromo } = useLoaderData()
	const promoItems = dataPromo.map(item => {
		if (item.visible === false) {
			return (
				<PromotionCard
					key={item.uuid}
					image={item.image}
					title={item.name}
					day={item.day}
					description={item.descr}
				/>
			)
		}
		
	})
	return (
		<>
			<Title mb='xl'>Акции</Title>
			<SimpleGrid
				cols={3}
				breakpoints={[
					{ maxWidth: 'xl', cols: 3, spacing: 'lg' },
					{ maxWidth: 'lg', cols: 2, spacing: 'lg' },
					{ maxWidth: 'md', cols: 2, spacing: 'md' },
					{ maxWidth: 'sm', cols: 1, spacing: 'sm' },
					{ maxWidth: 'xs', cols: 1, spacing: 'sm' },
				]}
			>
				{promoItems}
			</SimpleGrid>
		</>
	)
}

const promoLoader = async () => {
	const dbRef = ref(getDatabase())
	let dataPromo
	await get(child(dbRef, `/promo/`))
		.then(snapshot => {
			if (snapshot.exists()) {
				const data = Object.values(snapshot.val())
				return data
			} else {
				console.log('No data available')
			}
		})
		.then(data => {
			dataPromo = data
		})
		.catch(error => {
			console.error(error)
		})
	return { dataPromo }
}

export { PromotionPage, promoLoader }
