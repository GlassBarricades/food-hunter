import { SimpleGrid, ScrollArea } from '@mantine/core'
import useFetchSortedData from '../hooks/useFetchSortedData'
import AddCard from './AddCard'
import { memo } from 'react'

const AddList = memo(({ addList, variant }) => {
	const [categories, loading] = useFetchSortedData(
		`/menu/pizza-ads`,
		'position'
	)
	console.log(addList)
	return (
		<ScrollArea h={300} offsetScrollbars>
			<SimpleGrid
				cols={{base: 2, sm: 3, md: 2, lg: 2, xl: 3}}
				spacing='xs'
			>
				{variant === 'pizza'
					? categories.map(item => {
							return <AddCard key={item.uuid} item={item} />
					  })
					: undefined}
				{addList.map(item => {
					return <AddCard key={item.uuid} item={item} />
				})}
			</SimpleGrid>
		</ScrollArea>
	)
})
export default AddList
