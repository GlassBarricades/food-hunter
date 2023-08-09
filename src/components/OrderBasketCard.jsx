import {
	Paper,
	Card,
	Group,
	Title,
	ScrollArea,
	Text,
	Image,
	ActionIcon,
	Stack,
} from '@mantine/core'
import { Trash } from 'tabler-icons-react'
import { removeOrder } from '../store/orderSlice'
import { useDispatch, useSelector } from 'react-redux'

const OrderBasketCard = ({ fullPrice }) => {
	const dispatch = useDispatch()
	const order = useSelector(state => state.order.order)

	const orderItems = order.map((item, index) => {
		return (
			<Group key={index} position='apart'>
				<Image width={80} src={item.image} />
				<Text>
					{item.name} ({item.variantOrder})
				</Text>
				<Text>{item.quantity} шт</Text>
				<Text>{item.quantity * item.priceOrder} руб</Text>
				<ActionIcon
					size='xl'
					onClick={() => dispatch(removeOrder({ id: item.orderUuid }))}
				>
					<Trash size='1.5rem' color='yellow' />
				</ActionIcon>
			</Group>
		)
	})
	return (
		<Paper radius='md'>
			<Card withBorder shadow='sm' radius='md'>
				<Card.Section withBorder inheritPadding py='xs'>
					<Group position='apart'>
						<Title order={5} weight={500}>
							Корзина:
						</Title>
					</Group>
				</Card.Section>
				<Card.Section p='md'>
					<ScrollArea h={500}>
						<Stack>{orderItems}</Stack>
					</ScrollArea>
				</Card.Section>
				<Card.Section withBorder inheritPadding py='xs' mt='sm'>
					<Group position='apart'>
						<Text weight={500}>Итого:</Text>
						<Text weight={500}>{fullPrice} руб</Text>
					</Group>
				</Card.Section>
			</Card>
		</Paper>
	)
}
export default OrderBasketCard
