import {
	Text,
} from '@mantine/core'
import AdminModal from './AdminModal'
import PromotionForm from './PromotionForm'
import AdminRow from './AdminRow'
import AdminTable from './AdminTable'
import AdminHeaderBlock from './AdminHeaderBlock'
import useFetchSortedData from '../../hooks/useFetchSortedData'

const PromotionAdmin = () => {
	const [categories, loading] = useFetchSortedData(`/promo/`, 'name')

	const rows = categories.map(element => (
		<AdminRow key={element.uuid} element={element} variant='promo' />
	))

	return (
		<>
		<AdminModal>
			<PromotionForm />
		</AdminModal>
			<AdminHeaderBlock title='Акции' />
			{categories.length == 0 ? (
				<Text size='xl'>Загрузка ...</Text>
			) : (
				<AdminTable
					rows={rows}
					columnArray={['id', 'Позиция', 'Название', 'Картинка', 'День', 'Описание', 'Настройки']}
					loading={loading}
				/>
			)}
		</>
	)
}

export default PromotionAdmin
