import {
	Button,
	Group,
	Title,
	Modal,
	TextInput,
	Table,
	ActionIcon,
	useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import useSortData from '../../hooks/useSortData'
import { uid } from 'uid'
import { ref, remove } from 'firebase/database'
import { db } from '../../firebase'
import { Pencil, Trash } from 'tabler-icons-react'
import writeToDatabase from '../../helpers/writeToDataBase'
import deleteDataBase from '../../helpers/deleteDataBase'

const AdminCategoryAlcohol = () => {
	const colorScheme = useMantineColorScheme()
	const [opened, handlers] = useDisclosure(false, {
		onClose: () => resetState(),
	})
	const [name, setName] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [categories] = useFetchData(`/units/`)
	const data = useSortData(categories, 'position')

	const resetState = () => {
		setName('')
	}

	const handleDelete = (item, base) => {
		remove(ref(db, `/${base}/${item.name}`))
	}

	const handleEdit = item => {
		setIsEdit(true)
		setName(item.name)
		handlers.open()
	}

	const rows = data.map(element => (
		<tr key={element.uuid}>
			<td>{element.uuid}</td>
			<td>{element.name}</td>
			<td>
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
						onClick={() => deleteDataBase(`units/${element.name}`)}
						color={colorScheme.colorScheme === 'dark' ? 'yellow.5' : undefined}
					>
						<Trash size='1rem' />
					</ActionIcon>
				</Group>
			</td>
		</tr>
	))

	return (
		<>
			<Modal
				opened={opened}
				onClose={handlers.close}
				title={isEdit ? 'Редактирование категории' : 'Добавление категории'}
			>
				<form
					onSubmit={writeToDatabase(
						`/units/${name}`,
						{
							name: name,
							uuid: uid(),
						},
						resetState,
						handlers.close
					)}
				>
					<TextInput
						placeholder='Название единицы измерения'
						label='Название единицы измерения'
						withAsterisk
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Button mt='md' type='submit'>
						{isEdit ? 'Сохранить' : 'Отправить'}
					</Button>
				</form>
			</Modal>
			<Group position='apart'>
				<Title>Единицы измерения</Title>
				<Button onClick={handlers.open}>Добавить единицу измерения</Button>
			</Group>
			<Table
				highlightOnHover
				withBorder
				withColumnBorders
				fontSize='md'
				mt='md'
			>
				<thead>
					<tr>
						<th>id</th>
						<th>Название</th>
						<th>Настройки</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</>
	)
}
export default AdminCategoryAlcohol
