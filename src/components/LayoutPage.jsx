import { useState } from 'react'
import { AppShell, Footer, useMantineTheme } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { HeaderSimple } from './Header'
import NavBarApp from './NavBarApp'

const App = () => {
	const theme = useMantineTheme()
	const [opened, setOpened] = useState(false)

	return (
		<AppShell
			styles={{
				main: {
					background:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint='sm'
			asideOffsetBreakpoint='sm'
			navbar={<NavBarApp opened={opened} setOpened={setOpened} />}
			footer={
				<Footer height={60} p='md'>
					food-hunter
				</Footer>
			}
			header={<HeaderSimple opened={opened} setOpened={setOpened} />}
		>
			<Outlet />
		</AppShell>
	)
}
export default App
