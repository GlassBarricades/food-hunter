import { Button, Group, Title, Modal, TextInput, Table, ScrollArea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useFetchData from '../../hooks/useFetchData'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import AdminPanelSettings from './AdminPanelSettings'
import { edited, endEditing } from '../../store/editSlice'


const AdminCategoryAlcohol = () => {
	const edit = useSelector(state => state.edit.edit)
	const dispatch = useDispatch()
	const [opened, handlers] = useDisclosure(false, {
		onClose: () => resetEdit(),
	})
	const [tempUuid, setTempUuid] = useState('')
	// const [isEdit, setIsEdit] = useState(false)
	const [categories] = useFetchData(`/units/`)

	const handleEdit = item => {
		dispatch(edited())
		// setIsEdit(true)
		form.setFieldValue('name', item.name)
		setTempUuid(item.uuid)
		handlers.open()
	}

	function resetEdit() {
		setTempUuid('')
		form.reset()
		dispatch(endEditing())
		//setIsEdit(false)
	}

	const form = useForm({
		initialValues: {
			name: '',
		},
	})

	const rows = categories.map(element => (
		<tr key={element.uuid}>
			<td>{element.uuid}</td>
			<td>{element.name}</td>
			<td>
				<AdminPanelSettings
					element={element}
					deleteLink={`units/${element.uuid}`}
					handleEdit={handleEdit}
				/>
			</td>
		</tr>
	))

	return (
		<>
			<Modal
				opened={opened}
				onClose={handlers.close}
				title={edit ? 'Редактирование категории' : 'Добавление категории'}
			>
				<form
					onSubmit={
						!edit
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
						{edit ? 'Сохранить' : 'Отправить'}
					</Button>
				</form>
			</Modal>
			<Group position='apart'>
				<Title>Единицы измерения</Title>
				<Button onClick={handlers.open}>Добавить единицу измерения</Button>
			</Group>
			<ScrollArea w={"100%"} h={"100%"}>
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
			</ScrollArea>
		</>
	)
}
export default AdminCategoryAlcohol
