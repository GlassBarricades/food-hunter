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
import { isNotEmpty, useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { Pencil, Trash } from 'tabler-icons-react'
import writeToDatabase from '../../helpers/writeToDataBase'
import deleteDataBase from '../../helpers/deleteDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'

const AdminCategoryAlcohol = () => {
	const colorScheme = useMantineColorScheme()
	const [opened, handlers] = useDisclosure(false, {
		onClose: () => resetEdit(),
	})
	const [tempUuid, setTempUuid] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [categories] = useFetchData(`/units/`)

	const handleEdit = item => {
		setIsEdit(true)
		form.setFieldValue('name', item.name)
		setTempUuid(item.uuid)
		handlers.open()
	}

	function resetEdit() {
		setTempUuid('')
		form.reset()
		setIsEdit(false)
	}

	const form = useForm({
		initialValues: {
			name: '',
		},
		validate: {
			link: isNotEmpty('Поле не должно быть пустым'),
		},
	})

	const rows = categories.map(element => (
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
						onClick={() => deleteDataBase(`units/${element.uuid}`)}
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
					onSubmit={
						!isEdit
							? form.onSubmit(values =>
									writeToDatabase(
										`/units/`,
										{ ...values },
										form.reset,
										handlers.close,
										true
									)
							  )
							: form.onSubmit(values => {
									submitChangeDataBase(
										values,
										`/units/${tempUuid}`,
										tempUuid,
										resetEdit,
										handlers.close
									)
							  })
					}
				>
					<TextInput
						placeholder='Название единицы измерения'
						label='Название единицы измерения'
						withAsterisk
						{...form.getInputProps('name')}
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
