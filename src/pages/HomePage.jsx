import MenuGridCategory from '../components/MenuGridCategory'
import { useSelector } from 'react-redux'

const HomePage = () => {
	const categories = useSelector(state => state.categories.categories)
	return (
		<>
			<MenuGridCategory variant='home' categories={categories} />
		</>
	)
}
export default HomePage
