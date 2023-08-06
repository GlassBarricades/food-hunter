import { Link } from 'react-router-dom'
import { Card, Image, Text, Button } from '@mantine/core'

const MenuCard = ({ dataItem, category, itemVariants }) => {
	return (
		<Card
			shadow='sm'
			padding='xl'
			radius='lg'
			component={Link}
			to={`${dataItem.link}`}
		>
			<Card.Section>
				<Image
					src={dataItem.image}
					height={160}
					fit={category === 'alcohol' ? 'contain' : 'cover'}
					alt={dataItem.name}
				/>
			</Card.Section>
			<Text mt='xs' size='lg'>
				{itemVariants[0].price} руб.
			</Text>

			<Text weight={500} size='lg' mt='md'>
				{dataItem.name}
			</Text>
			<Button mt='sm' variant='default' fullWidth>
				Выбрать
			</Button>
		</Card>
	)
}
export default MenuCard
