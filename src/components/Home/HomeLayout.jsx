import {
	Box,
	BackgroundImage,
	AppShell,
	Paper,
	useMantineTheme,
	createStyles,
} from '@mantine/core'
import HomeHeader from './HomeHeader'
import HomeNavBar from './HomeNavBar'
import { BrandInstagram, BrandTelegram, BrandVk } from 'tabler-icons-react'

const useStyles = createStyles(theme => ({
	socWrap: {
		minWidth: '50px',
		minheight: '50px',
		display: 'flex',
		justifyContent: 'space-around',
		position: 'absolute',
		bottom: '20px',
		right: '20px',
		padding: '15px',
	},
	layoutWrap: {
		position: 'relative',
	},
}))

const HomeLayout = () => {
	const theme = useMantineTheme()
	const { classes } = useStyles()
	return (
		<Box
			miw={'100vw'}
			mx='auto'
			sx={() => ({
				minHeight: '100vh',
			})}
		>
			<BackgroundImage
				src='https://i.ibb.co/tZy6t7D/Gt-Z61-HH2-C9-M.jpg'
				radius='sm'
				mih={'100vh'}
			>
				<AppShell
					className={classes.layoutWrap}
					padding='md'
					navbar={<HomeNavBar />}
					header={<HomeHeader />}
				>
					<Paper
						component='a'
						href='https://www.instagram.com/food_hunter.by/?igsh=MXN4dmpoamNkc3h2eA%3D%3D'
						target='_blank'
						className={classes.socWrap}
					>
						<BrandInstagram
							color={
								theme.colorScheme === 'dark'
									? theme.colors.yellow[5]
									: theme.black
							}
						/>
					</Paper>
				</AppShell>
			</BackgroundImage>
		</Box>
	)
}
export default HomeLayout
