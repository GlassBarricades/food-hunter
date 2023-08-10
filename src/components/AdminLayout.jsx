import { AppShell, Footer, useMantineTheme } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { HeaderSimple } from './Header'
import NavBarApp from './NavBarApp'

const AdminLayout = () => {
	const theme = useMantineTheme()

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
			navbar={<NavBarApp admin={true} />}
			footer={
				<Footer height={60} p='md'>
					Application footer
				</Footer>
			}
			header={<HeaderSimple admin={true} />}
		>
			<Outlet />
		</AppShell>
	)
}
export default AdminLayout
