import { Link } from 'react-router-dom'
import { Card, Image, Text, Button } from '@mantine/core'
import { memo, useMemo } from 'react'
import classes from './MenuCard.module.css'

const MenuCard = memo(({ dataItem: { image, name, link }, category, itemVariants, vertical }) => {
  const fit = useMemo(() => (vertical ? 'contain' : 'cover'), [category]);

  return (
    <Card
      shadow='sm'
      padding='xs'
      radius='lg'
      component={Link}
      to={link}
    >
      <Card.Section>
        <Image
          src={image}
          height={vertical ? 320 : 160}
          fit={fit}
          alt={name}
        />
      </Card.Section>
      <Card.Section inheritPadding className={classes.infoContainer}>
      <Text mt='xs' size='md'>
        {itemVariants[0].price} руб.
      </Text>

      <Text weight={400} size='lg'>
        {name}
      </Text>
      <Button mt='xs' variant='default' fullWidth>
        Выбрать
      </Button>
      </Card.Section>
    </Card>
  )
})
export default MenuCard;
