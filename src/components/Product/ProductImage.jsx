import { ActionIcon, Box, Image, LoadingOverlay, Modal, createStyles, useMantineTheme } from '@mantine/core'
import { memo } from 'react'
import useFetchImage from '../../hooks/useFetchImage'
import {ArrowsDiagonal} from 'tabler-icons-react'
import { useDisclosure } from '@mantine/hooks'

const useStyles = createStyles((theme) => ({
	imageBox: {
		position: "relative",
	},
	imageIconFullScreen: {
		position: "absolute",
		right: '10px',
		top: '10px',
		zIndex: 2
	}
}))

const ProductImage = memo(({ category, link, title, vertical }) => {
	const theme = useMantineTheme()
	const [opened, { open, close }] = useDisclosure(false);
	const { classes } = useStyles()
	const { url } = useFetchImage(link)
	console.log(theme.colors.yellow[5])
	return (
		<>
		 <Modal
        opened={opened}
        onClose={close}
        title={title}
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <Image mah={"100%"} fit="cover" src={link} alt={title} />
      </Modal>
		<Box className={classes.imageBox}>
			<ActionIcon size="xl" variant='filled' className={classes.imageIconFullScreen} onClick={open}>
				<ArrowsDiagonal size="2.125rem" />
			</ActionIcon>
			<LoadingOverlay visible={!url} transitionDuration={2000} overlayBlur={2} loaderProps={{ size: 'xl', color: 'orange' }} />
			<Image fit={vertical ? "contain" : "cover"} radius='md' height={500} src={link} alt={title} />
		</Box>
		</>
	)
})

export default ProductImage
