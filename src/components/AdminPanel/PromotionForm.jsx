import { TextInput, Button, NumberInput, Group, Checkbox, Textarea } from '@mantine/core'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import { useForm } from '@mantine/form'
import { closeModal } from '../../store/editSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PromotionForm = () => {
	const edit = useSelector(state => state.edit.edit)
	const editData = useSelector(state => state.edit.editData)
	const editUuid = useSelector(state => state.edit.editUuid)
	const dispatch = useDispatch()

	useEffect(() => {
		if (edit) {
			form.setValues({
                name: editData.name,
                position: editData.position,
                image: editData.image,
                descr: editData.descr,
                day: editData.day,
                visible: editData.visible,
              });
		}
	}, [edit])

	const form = useForm({
		initialValues: {
			name: '',
			position: 0,
			image: '',
			descr: '',
			day: '',
			visible: false,
		},
	})

	return (
		<form
			onSubmit={
				!edit
					? form.onSubmit(values =>
							writeToDatabase(
								`/promo/`,
								{ ...values },
								form.reset,
								() => dispatch(closeModal()),
								true
							)
					  )
					: form.onSubmit(values => {
							submitChangeDataBase(
								values,
								`/promo/${editUuid}`,
								editUuid,
								form.reset,
								() => dispatch(closeModal())
							)
					  })
			}
		>
			<TextInput
						placeholder='Название акции'
						label='Название акции'
						withAsterisk
						{...form.getInputProps('name')}
					/>
					<NumberInput
						placeholder='Позиция для сортировки'
						label='Позиция для сортировки'
						{...form.getInputProps('position')}
					/>
					<TextInput
						label='Картинка'
						placeholder='Картинка'
						{...form.getInputProps('image')}
					/>
					<TextInput
						label='День недели'
						placeholder='День недели'
						{...form.getInputProps('day')}
					/>
					<Group>
						<Checkbox
							mt='xs'
							size='md'
							label='Скрыть'
							{...form.getInputProps('visible', { type: 'checkbox' })}
						/>
					</Group>
					<Textarea
						placeholder='Описание'
						label='Описание'
						autosize
						minRows={3}
						{...form.getInputProps('descr')}
					/>
			<Button mt='md' type='submit'>
				{edit ? 'Сохранить' : 'Создать'}
			</Button>
		</form>
	)
}

export default PromotionForm
