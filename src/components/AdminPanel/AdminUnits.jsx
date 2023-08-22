import AdminUnitsForm from './AdminUnitsForm'
import AdminTable from './AdminTable'
import AdminHeaderBlock from './AdminHeaderBlock'
import AdminModal from './AdminModal'
import { Text } from '@mantine/core'
import AdminRow from './AdminRow'
import useFetchData from '../../hooks/useFetchData'

const AdminCategoryAlcohol = () => {
	const [categories, loading] = useFetchData(`/units/`)

	const rows = categories.map(element => (
		<AdminRow key={element.uuid} element={element} variant='units' />
	))

	return (
		<>
			<AdminModal>
				<AdminUnitsForm />
			</AdminModal>
			<AdminHeaderBlock title='Единицы измерения' />
			{categories.length == 0 ? (
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
