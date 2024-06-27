import { AppShell, useMantineTheme } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import NavBarApp from './NavBarApp'
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUnits } from '../store/unitsSlice'

const AdminLayout = memo(() => {
	const theme = useMantineTheme()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchUnits())
	}, [dispatch])

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
				<AppShell.Footer height={60} p='md'>
					Application footer
				</AppShell.Footer>
			}
			header={<Header admin={true} />}
		>
			<Outlet />
		</AppShell>
	)
})
export default AdminLayout
