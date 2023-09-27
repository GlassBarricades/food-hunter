import {
	TextInput,
	NumberInput,
	NativeSelect,
	Group,
	Checkbox,
	Textarea,
	Anchor,
	Button,
	Text,
} from '@mantine/core'
import { useForm, isNotEmpty } from '@mantine/form'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { closeModal } from '../../store/editSlice'
import { useParams } from 'react-router-dom'

const AdminPizzaAdsForm = () => {
	const edit = useSelector(state => state.edit.edit)
	const editData = useSelector(state => state.edit.editData)
	const editUuid = useSelector(state => state.edit.editUuid)
	const units = useSelector(state => state.units.unitsNamesArray)
	const { adminElement } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		if (edit) {
			form.setValues({
				name: editData.name,
				link: editData.link,
				position: editData.position,
				image: editData.image,
				unit: editData.unit,
				visible: editData.visible,
				compound: editData.compound,
				size1: editData.variant.one.size,
				price1: editData.variant.one.price,
				id1: editData.variant.one.id,
			})
		}
	}, [edit])

	const form = useForm({
		initialValues: {
			name: '',
			link: '',
			position: 0,
			image: '',
			unit: '',
			visible: false,
			compound: '',
			size1: 0,
			price1: 0,
			id1: '',
		},
		validate: {
			link: isNotEmpty('Поле не должно быть пустым'),
		},
	})

	return (
		<form
			onSubmit={
				!edit
					? form.onSubmit(values =>
							writeToDatabase(
								`/menu/pizza-ads/${values.link}`,
								{
									name: values.name,
									link: values.link,
									position: values.position,
									image: values.image,
									unit: values.unit,
									visible: values.visible,
									compound: values.compound,
									variant: {
										one: {
											size: values.size1,
											price: values.price1,
											id: values.id1,
										},
									},
								},
								form.reset,
								() => dispatch(closeModal()),
								false
							)
					  )
					: form.onSubmit(values => {
							submitChangeDataBase(
								{
									name: values.name,
									link: values.link,
									position: values.position,
									image: values.image,
									unit: values.unit,
									visible: values.visible,
									compound: values.compound,
									variant: {
										one: {
											size: values.size1,
											price: values.price1,
											id: values.id1,
										},
									},
								},
								`/menu/${adminElement}/${values.link}`,
								editUuid,
								form.reset,
								() => dispatch(closeModal())
							)
					  })
			}
		>
			<TextInput
				placeholder='Название катерогии'
				label='Название категории'
				withAsterisk
				{...form.getInputProps('name')}
			/>
			<TextInput
				placeholder='Ссылка для меню'
				label='Ссылка для меню'
				withAsterisk
				disabled={edit ? true : false}
				{...form.getInputProps('link')}
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
			<NativeSelect
				data={['Выберите единицу измерения', ...units]}
				label='Установите единицу измерения'
				{...form.getInputProps('unit')}
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
				placeholder='Состав'
				label='Состав'
				autosize
				minRows={3}
				{...form.getInputProps('compound')}
			/>
			<Text>Варианты блюда</Text>
			<NumberInput
				placeholder='Размер'
				label='Размер'
				{...form.getInputProps('size1')}
			/>
			<NumberInput
				placeholder='Цена'
				label='Цена'
				precision={2}
				{...form.getInputProps('price1')}
			/>
			<TextInput label='id' placeholder='id' {...form.getInputProps('id1')} />
			<Button mt='md' type='submit'>
				{edit ? 'Сохранить' : 'Отправить'}
			</Button>
		</form>
	)
}

export default AdminPizzaAdsForm
