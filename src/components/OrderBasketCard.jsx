import {
	Paper,
	Card,
	Group,
	Title,
	ScrollArea,
	Text,
	Stack,
} from '@mantine/core'
import { useSelector } from 'react-redux'
import OrderBasketCardItem from './Order/OrderBasketCardItem'

const OrderBasketCard = ({ fullPrice }) => {
	const order = useSelector(state => state.order.order)

	const orderItems = order.map(item => {
		return <OrderBasketCardItem key={item.orderUuid} item={item} />
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
