import AdminUnitsForm from './AdminUnitsForm'
import AdminTable from './AdminTable'
import AdminUnitsRow from './AdminUnitsRow'
import AdminHeaderBlock from './AdminHeaderBlock'
import AdminModal from './AdminModal'
import { useSelector } from 'react-redux'
import { Text } from '@mantine/core'

const AdminCategoryAlcohol = () => {
	const units = useSelector(state => state.units.units)
	const loading = useSelector(state => state.units.status)

	const rows = units.map(element => (
		<AdminUnitsRow key={element.uuid} element={element} />
	))

	return (
		<>
			<AdminModal>
				<AdminUnitsForm />
			</AdminModal>
			<AdminHeaderBlock title='Единицы измерения' />
			{units.length == 0 ? (
				<Text size='xl'>Загрузка ...</Text>
			) : (
				<AdminTable
					rows={rows}
					columnArray={['id', 'Название', 'Настройки']}
					loading={loading}
				/>
			)}
		</>
	)
}
export default AdminCategoryAlcohol
