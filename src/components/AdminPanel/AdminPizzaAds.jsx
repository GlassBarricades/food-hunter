import useFetchSortedData from '../../hooks/useFetchSortedData'
import AdminTable from './AdminTable'
import AdminPizzaAdsForm from './AdminPizzaAdsForm'
import AdminModal from './AdminModal'
import AdminHeaderBlock from './AdminHeaderBlock'
import AdminRow from './AdminRow'

const AdminPizzaAds = () => {
	const [categories, loading] = useFetchSortedData(
		`/menu/pizza-ads`,
		'position'
	)

	const rows = categories.map(element => (
		<AdminRow key={element.uuid} element={element} variant='pizza' />
	))

	return (
		<>
			<AdminModal>
				<AdminPizzaAdsForm />
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
					'Вариант',
					'Настройки',
				]}
				loading={loading}
			/>
		</>
	)
}
export default AdminPizzaAds
