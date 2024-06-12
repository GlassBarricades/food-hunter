import { Link } from 'react-router-dom'
import { Card, Image, Text, Button } from '@mantine/core'
import { memo, useMemo } from 'react'

const MenuCard = memo(({ dataItem: { image, name, link }, category, itemVariants, vertical }) => {
  const fit = useMemo(() => (vertical ? 'contain' : 'cover'), [category]);
  console.log(vertical)

  return (
    <Card
      shadow='sm'
      padding='xl'
      radius='lg'
      component={Link}
      to={link}
    >
      <Card.Section>
        <Image
          src={image}
          height={160}
          fit={fit}
          alt={name}
        />
      </Card.Section>
      <Text mt='xs' size='lg'>
        {itemVariants[0].price} руб.
      </Text>

      <Text weight={500} size='lg' mt='md'>
        {name}
      </Text>
      <Button mt='sm' variant='default' fullWidth>
        Выбрать
      </Button>
    </Card>
  )
})
export default MenuCard;
