import { useParams } from 'react-router-dom'
import useFetchDataOne from '../../hooks/useFetchDataOne'
import {
	Button,
	Group,
	Title,
	Modal,
	TextInput,
	NumberInput,
	Table,
	Image,
	Checkbox,
	Textarea,
	Text,
	Collapse,
	Anchor,
	NativeSelect,
	ScrollArea,
	createStyles,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import useSortData from '../../hooks/useSortData'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import { isNotEmpty, useForm } from '@mantine/form'
import AdminPanelSettings from './AdminPanelSettings'
import { edited, openModal } from '../../store/editSlice'
import AdminTable from './AdminTable'
import AdminMainForm from './AdminMainForm'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../store/editSlice'

const useStyles = createStyles({
	tableWrap: {
		minWidth: '100%',
	},
})

const AdminMain = () => {
	const { adminElement } = useParams()
	const edit = useSelector(state => state.edit.edit)
	const open = useSelector(state => state.edit.editModal)
	const dispatch = useDispatch()
	const linkItem = useFetchDataOne(`/categories/${adminElement}`)
	const [units] = useFetchData('/units/')
	const [alcoholCategories] = useFetchData('/categories-alcohol/')
	const [napitkiCategories] = useFetchData('/categories-napitki/')
	const [goryachieNapitkiCategories] = useFetchData(
		'/categories-gorjachie-napitki/'
	)
	const [opened, handlers] = useDisclosure(false, {
		onClose: () => resetEdit(),
	})
	const [openedCollapse, { toggle }] = useDisclosure(false)
	const [tempUuid, setTempUuid] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [categories, loading] = useFetchData(`/menu/${adminElement}`)
	const data = useSortData(categories, 'position')
	const { classes } = useStyles()

	const dataCateroriesAlcohol = alcoholCategories.map(item => {
		return item.name
	})

	const dataCateroriesNapitki = napitkiCategories.map(item => {
		return item.name
	})

	const dataCateroriesGoryachieNapitki = goryachieNapitkiCategories.map(
		item => {
			return item.name
		}
	)

	const dataUnits = units.map(item => {
		return item.name
	})

	// function resetEdit() {
	// 	setTempUuid('')
	// 	form.reset()
	// 	setIsEdit(false)
	// }

	// const handleEdit = item => {
	// 	setIsEdit(true)
	// 	form.setValues({
	// 		name: item.name,
	// 		link: item.link,
	// 		position: item.position,
	// 		image: item.image,
	// 		unit: item.unit,
	// 		visible: item.visible,
	// 		category: item.category,
	// 		compound: item.compound,
	// 		size1: item.variant.one.size,
	// 		price1: item.variant.one.price,
	// 		id1: item.variant.one.id,
	// 		size2: item.variant.two.size,
	// 		price2: item.variant.two.price,
	// 		id2: item.variant.two.id,
	// 		size3: item.variant.three.size,
	// 		price3: item.variant.three.price,
	// 		id3: item.variant.three.id,
	// 	})
	// 	setTempUuid(item.uuid)
	// 	handlers.open()
	// }

	// const form = useForm({
	// 	initialValues: {
	// 		name: '',
	// 		link: '',
	// 		position: 0,
	// 		image: '',
	// 		unit: '',
	// 		visible: false,
	// 		category: '',
	// 		compound: '',
	// 		size1: 0,
	// 		price1: 0,
	// 		id1: '',
	// 		size2: 0,
	// 		price2: 0,
	// 		id2: '',
	// 		size3: 0,
	// 		price3: 0,
	// 		id3: '',
	// 	},
	// 	validate: {
	// 		link: isNotEmpty('Поле не должно быть пустым'),
	// 	},
	// })

	const rows = data.map(element => (
		<tr key={element.link}>
			<td>{element.position}</td>
			<td>{element.name}</td>
			<td>
				<Image width={50} src={element.image} alt={element.name} />
			</td>
			<td>{element.unit}</td>
			<td>
				<Group>
					{element.variant
						? Object.values(element.variant).map((item, index) => {
								return item.id != '' ? (
									<Text key={index}>{item.id}</Text>
								) : undefined
						  })
						: undefined}
				</Group>
			</td>
			<td>{`/${element.link}`}</td>
			<td>{element.compound}</td>
			<td>{element.category}</td>
			<td>
				<Group>
					{element.variant
						? Object.values(element.variant).map((item, index) => {
								return item.size != 0 ? (
									<Text key={index}>
										{item.size} - {item.price}р
									</Text>
								) : undefined
						  })
						: undefined}
				</Group>
			</td>
			<td>
				<AdminPanelSettings
					element={element}
					deleteLink={`/menu/${adminElement}/${element.link}`}
					handleEdit={dispatch(edited)}
				/>
			</td>
		</tr>
	))

	return (
		<>
			<Modal
				opened={open}
				onClose={() => dispatch(closeModal())}
				title={edit ? 'Редактирование категории' : 'Добавление категории'}
			>
				<AdminMainForm
					adminElement={adminElement}
					dataUnits={dataUnits}
					dataCateroriesAlcohol={dataCateroriesAlcohol}
					dataCateroriesNapitki={dataCateroriesNapitki}
					dataCateroriesGoryachieNapitki={dataCateroriesGoryachieNapitki}
				/>
				{/* <form
					onSubmit={
						!isEdit
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
										handlers.close,
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
										tempUuid,
										resetEdit,
										handlers.close
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
					<TextInput
						label='id'
						placeholder='id'
						{...form.getInputProps('id1')}
					/>
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
						<TextInput
							label='id'
							placeholder='id'
							{...form.getInputProps('id2')}
						/>
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
						<TextInput
							label='id'
							placeholder='id'
							{...form.getInputProps('id3')}
						/>
					</Collapse>
					<Button mt='md' type='submit'>
						{isEdit ? 'Сохранить' : 'Отправить'}
					</Button>
				</form> */}
			</Modal>
			<Group position='apart'>
				<Title>{linkItem[0].name}</Title>
				<Button onClick={() => dispatch(openModal())}>
					Добавить категорию
				</Button>
			</Group>
			<AdminTable
				rows={rows}
				columnArray={[
					'Сортировка',
					'Название',
					'Картинка',
					'Измерение',
					'id',
					'Ссылка',
					'Состав',
					'Категория',
					'Вариант',
					'Настройки',
				]}
				loading={loading}
			/>
			{/* <ScrollArea h={"70vh"} maw={"100%"} mx="auto">
			<Table
				className={classes.tableWrap}
				highlightOnHover
				withBorder
				withColumnBorders
				fontSize='md'
				mt='md'
			>
				<thead>
					<tr>
						<th>Сортировка</th>
						<th>Название</th>
						<th>Картинка</th>
						<th>Измерение</th>
						<th>id</th>
						<th>Ссылка</th>
						<th>Состав</th>
						<th>Категория</th>
						<th>Варианты</th>
						<th>Настройки</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
			</ScrollArea> */}
		</>
	)
}
export default AdminMain
