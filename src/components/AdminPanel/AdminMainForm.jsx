import {
	TextInput,
	NumberInput,
	NativeSelect,
	Group,
	Checkbox,
	Textarea,
	Anchor,
	Collapse,
	Button,
	Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm, isNotEmpty } from '@mantine/form'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { closeModal } from '../../store/editSlice'

const AdminMainForm = ({
	adminElement,
	dataUnits,
	dataCateroriesAlcohol,
	dataCateroriesNapitki,
	dataCateroriesGoryachieNapitki,
}) => {
	const edit = useSelector(state => state.edit.edit)
	const editData = useSelector(state => state.edit.editData)
	const editUuid = useSelector(state => state.edit.editUuid)
	const dispatch = useDispatch()
	const [openedCollapse, { toggle }] = useDisclosure(false)

	useEffect(() => {
		if (edit) {
			form.setValues({
				name: editData.name,
				link: editData.link,
				position: editData.position,
				image: editData.image,
				unit: editData.unit,
				visible: editData.visible,
				category: editData.category,
				compound: editData.compound,
				size1: editData.variant.one.size,
				price1: editData.variant.one.price,
				id1: editData.variant.one.id,
				size2: editData.variant.two.size,
				price2: editData.variant.two.price,
				id2: editData.variant.two.id,
				size3: editData.variant.three.size,
				price3: editData.variant.three.price,
				id3: editData.variant.three.id,
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
			category: '',
			compound: '',
			size1: 0,
			price1: 0,
			id1: '',
			size2: 0,
			price2: 0,
			id2: '',
			size3: 0,
			price3: 0,
			id3: '',
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
								`/menu/${adminElement}/${values.link}`,
								{
									name: values.name,
									link: values.link,
									position: values.position,
									image: values.image,
									unit: values.unit,
									visible: values.visible,
									category:
										adminElement === 'alcohole' ||
										adminElement === 'napitki' ||
										adminElement === 'goryachie-napitki'
											? values.category
											: ' ',
									compound: values.compound,
									variant: {
										one: {
											size: values.size1,
											price: values.price1,
											id: values.id1,
										},
										two: {
											size: values.size2,
											price: values.price2,
											id: values.id2,
										},
										three: {
											size: values.size3,
											price: values.price3,
											id: values.id3,
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
									category:
										adminElement === 'alcohole' ||
										adminElement === 'napitki' ||
										adminElement === 'goryachie-napitki'
											? values.category
											: ' ',
									compound: values.compound,
									variant: {
										one: {
											size: values.size1,
											price: values.price1,
											id: values.id1,
										},
										two: {
											size: values.size2,
											price: values.price2,
											id: values.id2,
										},
										three: {
											size: values.size3,
											price: values.price3,
											id: values.id3,
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
			{adminElement === 'alcohole' ? (
				<NativeSelect
					data={['Выберите категорию', ...dataCateroriesAlcohol]}
					label='Установите категорию'
					{...form.getInputProps('category')}
				/>
			) : undefined}
			{adminElement === 'napitki' ? (
				<NativeSelect
					data={['Выберите категорию', ...dataCateroriesNapitki]}
					label='Установите категорию'
					{...form.getInputProps('category')}
				/>
			) : undefined}
			{adminElement === 'goryachie-napitki' ? (
				<NativeSelect
					data={['Выберите категорию', ...dataCateroriesGoryachieNapitki]}
					label='Установите категорию'
					{...form.getInputProps('category')}
				/>
			) : undefined}
			<NativeSelect
				data={['Выберите единицу измерения', ...dataUnits]}
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
			<Group position='center' mb={5}>
				<Anchor onClick={toggle}>Еще варианты</Anchor>
			</Group>

			<Collapse in={openedCollapse}>
				<NumberInput
					placeholder='Размер'
					label='Размер'
					{...form.getInputProps('size2')}
				/>
				<NumberInput
					placeholder='Цена'
					label='Цена'
					precision={2}
					{...form.getInputProps('price2')}
				/>
				<TextInput label='id' placeholder='id' {...form.getInputProps('id2')} />
				<NumberInput
					placeholder='Размер'
					label='Размер'
					{...form.getInputProps('size3')}
				/>
				<NumberInput
					placeholder='Цена'
					label='Цена'
					precision={2}
					{...form.getInputProps('price3')}
				/>
				<TextInput label='id' placeholder='id' {...form.getInputProps('id3')} />
			</Collapse>
			<Button mt='md' type='submit'>
				{edit ? 'Сохранить' : 'Отправить'}
			</Button>
		</form>
	)
}

export default AdminMainForm
