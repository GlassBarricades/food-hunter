import { Group, Image, Text, Popover, ActionIcon } from '@mantine/core'
import { Trash, AlertCircle } from 'tabler-icons-react'
import { useDispatch } from 'react-redux'
import { removeOrder } from '../../store/orderSlice'

const OrderBasketCardItem = ({ item }) => {
	const dispatch = useDispatch()
	return (
		<Group justify='space-between'>
			<Image w={80} src={item.image} />
			<Text>
				{item.name} ({item.variantOrder})
			</Text>
			<Text>{item.quantity} шт</Text>
			<Text>{item.quantity * item.priceOrder} руб</Text>
			{item.delive ? (
				<Popover width={200} position='bottom' withArrow shadow='md'>
					<Popover.Target>
						<ActionIcon size='xl'>
							<AlertCircle size='1.5rem' color='red' />
						</ActionIcon>
					</Popover.Target>
					<Popover.Dropdown>
						<Text size='sm'>
							Доставка и самовынос алкоголя не осуществляется
						</Text>
					</Popover.Dropdown>
				</Popover>
			) : undefined}
			<ActionIcon
				size='xl'
				onClick={() => dispatch(removeOrder({ id: item.orderUuid }))}
			>
				<Trash size='1.5rem' />
			</ActionIcon>
		</Group>
	)
}

export default OrderBasketCardItem
