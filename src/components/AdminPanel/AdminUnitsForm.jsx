import { TextInput, Button } from '@mantine/core'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import { useForm } from '@mantine/form'
import { closeModal } from '../../store/editSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminUnitsForm = () => {
	const edit = useSelector(state => state.edit.edit)
	const editData = useSelector(state => state.edit.editData)
	const editUuid = useSelector(state => state.edit.editUuid)
	const dispatch = useDispatch()

	useEffect(() => {
		if (edit) {
			form.setFieldValue('name', editData.name)
		}
	}, [edit])

	const form = useForm({
		initialValues: {
			name: '',
		},
	})

	return (
		<form
			onSubmit={
				!edit
					? form.onSubmit(values =>
							writeToDatabase(
								`/units/`,
								{ ...values },
								form.reset,
								() => dispatch(closeModal()),
								true
							)
					  )
					: form.onSubmit(values => {
							submitChangeDataBase(
								values,
								`/units/${editUuid}`,
								editUuid,
								form.reset,
								() => dispatch(closeModal())
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
				{edit ? 'Сохранить' : 'Создать'}
			</Button>
		</form>
	)
}

export default AdminUnitsForm
