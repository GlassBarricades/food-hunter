import {
	Card,
	Image,
	Badge,
	Group,
	Text,
	ActionIcon,
	Button,
} from '@mantine/core'
import { CirclePlus, CircleMinus } from 'tabler-icons-react'
import { useCounter } from '@mantine/hooks'
import { useDispatch } from 'react-redux'
import { addOrder } from '../store/orderSlice'
import { useSelector } from 'react-redux'
import { uid } from 'uid'
import { memo } from 'react'

const AddCard = memo(({ item }) => {
	const [count, handlers] = useCounter(0, { min: 0, max: 10 })
	const quantityAdd = useSelector(state => state.quantity.quantityAdd)
	const dispatch = useDispatch()

	return (
		<Card shadow='sm' padding='sm' radius='lg'>
			<Card.Section>
				<Image src={item.image} height={110} alt={item.name} />
			</Card.Section>
			<Group position='apart'>
				<Text size='sm' mt='xs'>
					{item.name}
				</Text>
			</Group>
			<Group position='left' spacing='xs' align='flex-end'>
				<Text size='xl' fw={700}>
					{count === 0
						? item.variant.one.price
						: (item.variant.one.price * count).toFixed(1)}
				</Text>
				<Text size='sm' mt='xs'>
					руб
				</Text>
			</Group>
			<Group position='apart' spacing={1}>
				<ActionIcon onClick={handlers.decrement}>
					<CircleMinus />
				</ActionIcon>
				<Badge color='yellow' variant='outline'>
					{count}
				</Badge>
				<ActionIcon onClick={handlers.increment}>
					<CirclePlus />
				</ActionIcon>
				{count === 0 ? (
					<Button
						data-disabled
						variant='outline'
						color='yellow'
						size='xs'
						compact
						fullWidth
						mt='xs'
					>
						Добавить
					</Button>
				) : (
					<Button
						variant='outline'
						color='yellow'
						size='xs'
						compact
						fullWidth
						mt='xs'
						onClick={() =>
							dispatch(
								addOrder({
									item: item,
									quantity: count,
									label: item.variant.one.label,
									price: item.variant.one.price,
									id: item.variant.one.id,
									handlers: handlers,
									orderUuid: uid(),
								})
							)
						}
					>
						Добавить
					</Button>
				)}
			</Group>
		</Card>
	)
})
export default AddCard
