import { useParams } from 'react-router-dom'
import useFetchDataOne from '../../hooks/useFetchDataOne'
import { Button, Group, Title, Modal, Image, Text } from '@mantine/core'
import useFetchData from '../../hooks/useFetchData'
import useSortData from '../../hooks/useSortData'
import AdminPanelSettings from './AdminPanelSettings'
import { edited, openModal } from '../../store/editSlice'
import AdminTable from './AdminTable'
import AdminMainForm from './AdminMainForm'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../store/editSlice'

const AdminMain = () => {
	const { adminElement } = useParams()
	const edit = useSelector(state => state.edit.edit)
	const open = useSelector(state => state.edit.editModal)
	const dispatch = useDispatch()
	const linkItem = useFetchDataOne(`/categories/${adminElement}`)
	const [alcoholCategories] = useFetchData('/categories-alcohol/')
	const [napitkiCategories] = useFetchData('/categories-napitki/')
	const [goryachieNapitkiCategories] = useFetchData(
		'/categories-gorjachie-napitki/'
	)
	const [categories, loading] = useFetchData(`/menu/${adminElement}`)
	const data = useSortData(categories, 'position')

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
					dataCateroriesAlcohol={dataCateroriesAlcohol}
					dataCateroriesNapitki={dataCateroriesNapitki}
					dataCateroriesGoryachieNapitki={dataCateroriesGoryachieNapitki}
				/>
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
		</>
	)
}
export default AdminMain
