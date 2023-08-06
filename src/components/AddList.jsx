import { SimpleGrid, ScrollArea } from '@mantine/core'
import AddCard from './AddCard'

const AddList = ({ addList }) => {
	return (
		<ScrollArea h={300}>
			<SimpleGrid
				cols={4}
				spacing='xs'
				breakpoints={[
					{ maxWidth: 'xl', cols: 3, spacing: 'xs' },
					{ maxWidth: 'lg', cols: 2, spacing: 'xs' },
					{ maxWidth: 'md', cols: 2, spacing: 'xs' },
					{ maxWidth: 'sm', cols: 3, spacing: 'xs' },
					{ maxWidth: 'xs', cols: 2, spacing: 'xs' },
				]}
			>
				{addList.map(item => {
					return <AddCard key={item.uuid} item={item} />
				})}
			</SimpleGrid>
		</ScrollArea>
	)
}
export default AddList
