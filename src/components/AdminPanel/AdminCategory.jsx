import useFetchSortedData from '../../hooks/useFetchSortedData'
import { useParams } from 'react-router-dom'
import AdminTable from './AdminTable'
import AdminCategoryForm from './AdminCategoryForm'
import AdminModal from './AdminModal'
import AdminHeaderBlock from './AdminHeaderBlock'
import AdminRow from './AdminRow'

const AdminCategory = () => {
	const { categoryElement, subelement, subcategory } = useParams()
	const [categories, loading] = useFetchSortedData(
		!subcategory ? `/${categoryElement}/` : `/${subcategory}/${subelement}/`,
		'position'
	)

	const rows = categories.map(element => (
		<AdminRow key={element.uuid} element={element} variant='category' />
	))

	return (
		<>
			<AdminModal>
				<AdminCategoryForm />
			</AdminModal>
			<AdminHeaderBlock />
			<AdminTable
				rows={rows}
				columnArray={[
					'Сортировка',
					'Название',
					'Картинки',
					'Ссылка',
					'Настройки',
				]}
				loading={loading}
			/>
		</>
	)
}
export default AdminCategory
