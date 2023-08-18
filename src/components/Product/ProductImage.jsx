import { Image } from '@mantine/core'
import { memo } from 'react'

const ProductImage = memo(({ link, title }) => {
	return <Image radius='md' height={500} src={link} alt={title} />
})

export default ProductImage
