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
import classes from './AddCard.module.css'

const AddCard = memo(({ item }) => {
	const [count, handlers] = useCounter(0, { min: 0, max: 10 })
	const quantityAdd = useSelector(state => state.quantity.quantityAdd)
	const dispatch = useDispatch()

	return (
		<Card shadow='sm' padding='xs' radius='lg'>
			<Card.Section>
				<Image src={item.image} height={110} alt={item.name} />
			</Card.Section>
			<Card.Section inheritPadding className={classes.addCardInfo}>
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
			<Group mt="xs" justify='center' spacing={1}>
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
						size='xs'
						compact
						fullWidth
						mt='xs'
					>
						Добавить
					</Button>
				) : (
					<Button
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
			</Card.Section>
		</Card>
	)
})
export default AddCard
