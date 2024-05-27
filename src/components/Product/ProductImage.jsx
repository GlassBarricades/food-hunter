import { Box, Image, LoadingOverlay } from '@mantine/core'
import { memo } from 'react'
import useFetchImage from '../../hooks/useFetchImage'

const ProductImage = memo(({ category, link, title }) => {
	const {url} = useFetchImage(link)
	return (
		<Box>
			<LoadingOverlay visible={!url} transitionDuration={2000} overlayBlur={2} loaderProps={{ size: 'xl', color: 'orange' }} />
			<Image fit={category === "lanchi" ? "contain" : "cover"} radius='md' height={500} src={link} alt={title} />
		</Box>
	)
})

export default ProductImage
