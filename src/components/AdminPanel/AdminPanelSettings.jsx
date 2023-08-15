import { Group, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { Pencil, Trash } from 'tabler-icons-react'
import deleteDataBase from '../../helpers/deleteDataBase'

const AdminPanelSettings = ({ element, deleteLink, handleEdit }) => {
	const colorScheme = useMantineColorScheme()
	return (
		<Group>
			<ActionIcon
				mt='xs'
				variant={colorScheme.colorScheme === 'dark' ? 'outline' : 'default'}
				onClick={() => handleEdit(element)}
				color={colorScheme.colorScheme === 'dark' ? 'yellow.5' : undefined}
			>
				<Pencil size='1rem' />
			</ActionIcon>
			<ActionIcon
				mt='xs'
				variant={colorScheme.colorScheme === 'dark' ? 'outline' : 'default'}
				onClick={() => deleteDataBase(deleteLink)}
				color={colorScheme.colorScheme === 'dark' ? 'yellow.5' : undefined}
			>
				<Trash size='1rem' />
			</ActionIcon>
		</Group>
	)
}

export default AdminPanelSettings
