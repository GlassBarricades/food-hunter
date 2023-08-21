import { Group, ActionIcon, Text, NumberInput, rem } from '@mantine/core'
import { incrementQuantity, decrementQuantity } from '../../store/quantitySlice'
import { useDispatch, useSelector } from 'react-redux'

const ProductQuantity = () => {
	const quantity = useSelector(state => state.quantity.quantity)
	const dispatch = useDispatch()
	return (
		<Group spacing={5}>
			<Text>Количество: </Text>
			<Group spacing={5}>
				<ActionIcon
					size={35}
					variant='default'
					onClick={() => dispatch(decrementQuantity())}
				>
					–
				</ActionIcon>

				<NumberInput
					hideControls
					value={quantity}
					styles={{
						input: { width: rem(54), textAlign: 'center' },
					}}
				/>

				<ActionIcon
					size={35}
					variant='default'
					onClick={() => dispatch(incrementQuantity())}
				>
					+
				</ActionIcon>
			</Group>
		</Group>
	)
}

export default ProductQuantity
