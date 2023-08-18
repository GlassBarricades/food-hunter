import { Button, Group, Title, Modal, Table, ScrollArea } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux'
import useFetchData from '../../hooks/useFetchData'
import { closeModal, openModal } from '../../store/editSlice'
import AdminUnitsForm from './AdminUnitsForm'
import AdminTable from './AdminTable'
import AdminPanelSettings from './AdminPanelSettings'
import { edited } from '../../store/editSlice'

const AdminCategoryAlcohol = () => {
	const edit = useSelector(state => state.edit.edit)
	const open = useSelector(state => state.edit.editModal)
	const dispatch = useDispatch()
	const [categories, loading] = useFetchData(`/units/`)

	const rows = categories.map(element => (
		<tr key={element.uuid}>
			<td>{element.uuid}</td>
			<td>{element.name}</td>
			<td>
				<AdminPanelSettings
					element={element}
					deleteLink={`units/${element.uuid}`}
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
				title={
					edit
						? 'Редактирование единицы измерения'
						: 'Добавление единицы измерения'
				}
			>
				<AdminUnitsForm />
			</Modal>
			<Group position='apart'>
				<Title>Единицы измерения</Title>
				<Button onClick={() => dispatch(openModal())}>
					Добавить единицу измерения
				</Button>
			</Group>
			<AdminTable
				rows={rows}
				columnArray={['id', 'Название', 'Настройки']}
				loading={loading}
			/>
		</>
	)
}
export default AdminCategoryAlcohol
