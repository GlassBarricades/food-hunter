import { AppShell, useMantineTheme } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import NavBarApp from './NavBarApp'
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUnits } from '../store/unitsSlice'
import { useDisclosure } from '@mantine/hooks'

const AdminLayout = memo(() => {
	const theme = useMantineTheme()
	const dispatch = useDispatch()
	const [opened, { toggle, close }] = useDisclosure();

	useEffect(() => {
		dispatch(fetchUnits())
	}, [dispatch])

	return (
		<AppShell
			header={{ height: { base: 60, md: 70, lg: 80 } }}
			navbar={{
				width: { base: 300, md: 300, lg: 300 },
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			<AppShell.Header>
        <Header open={opened} toggle={toggle} admin={true}/>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavBarApp close={close} admin={true}/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
		</AppShell>
	)
})
export default AdminLayout
