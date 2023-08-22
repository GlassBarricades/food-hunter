import { useParams } from 'react-router-dom'
import useFetchSortedData from '../../hooks/useFetchSortedData'
import AdminTable from './AdminTable'
import AdminMainForm from './AdminMainForm'
import AdminModal from './AdminModal'
import AdminHeaderBlock from './AdminHeaderBlock'
import AdminMainRow from './AdminMainRow'
import AdminRow from './AdminRow'

const AdminMain = () => {
	const { adminElement } = useParams()
	const [categories, loading] = useFetchSortedData(
		`/menu/${adminElement}`,
		'position'
	)

	const rows = categories.map(element => (
		// <AdminMainRow key={element.uuid} element={element} />
		<AdminRow key={element.uuid} element={element} variant="main" />
	))

	return (
		<>
			<AdminModal>
				<AdminMainForm />
			</AdminModal>
			<AdminHeaderBlock />
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
