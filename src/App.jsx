import {
	Route,
	Routes,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import { CategoryPage, categoryLoader } from './pages/CategoryPage'
import { ProductPage, productLoader } from './pages/ProductPage'
import MenuPage from './pages/MenuPage'
import LayoutPage from './components/LayoutPage'
import MenuGridCategory from './components/MenuGridCategory'
import OrderPage from './pages/OrderPage'
import AdminLayout from './components/AdminLayout'
import AdminMain from './components/AdminPanel/AdminMain'
import AdminCategory from './components/AdminPanel/AdminCategory'
import { set, ref, remove } from 'firebase/database'
import { db } from './firebase'
import useFetchData from './hooks/useFetchData'
import './app.css'
import AdminUnits from './components/AdminPanel/AdminUnits'
import ContactPage from './pages/ContactPage'
import { PromotionPage, promoLoader } from './pages/PromotionPage'
import PromotionAdmin from './components/AdminPanel/PromotionAdmin'
import LoginPage from './pages/LoginPage'
import RequireAuth from './hoc/RequireAuth'
import AdminStats from './components/AdminPanel/AdminStats'

const App = () => {
	const [links, loading] = useFetchData('/categories/')

	const writeToDatabase = (link, data, reset, close) => e => {
		e.preventDefault()
		set(ref(db, link), {
			...data,
		})

		reset()
		close()
	}

	const handleDelete = link => {
		remove(ref(db, link))
	}

	// const getWeekDay = (date) => {
	//   const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

	//   return days[date.getDay()];
	// }

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path='/' element={<LayoutPage />}>
					<Route index element={<HomePage categories={links} />} />
					<Route path='/order' element={<OrderPage />} />
					<Route path='/contacts' element={<ContactPage />} />
					<Route
						path='/stock'
						element={<PromotionPage />}
						loader={promoLoader}
					/>
					<Route path='menu' element={<MenuPage />}>
						<Route index element={<MenuGridCategory categories={links} />} />
						<Route
							path=':category'
							element={<CategoryPage />}
							loader={categoryLoader}
						/>
						<Route
							path=':category/tabs/:tabValue'
							element={<CategoryPage />}
							loader={categoryLoader}
						/>
						<Route
							path=':category/:product'
							element={<ProductPage />}
							loader={productLoader}
						/>
						<Route
							path=':category/tabs/:tabValue/:product'
							element={<ProductPage />}
							loader={productLoader}
						/>
					</Route>
				</Route>
				<Route
					path='/admin'
					element={
						<RequireAuth>
							<AdminLayout links={links} />
						</RequireAuth>
					}
				>
					<Route
						path=':adminElement'
						element={
							<RequireAuth>
								<AdminMain
									links={links}
									writeToDatabase={writeToDatabase}
									handleDelete={handleDelete}
								/>
							</RequireAuth>
						}
					/>
					<Route
						path='category/:categoryElement'
						element={
							<RequireAuth>
								<AdminCategory
									writeToDatabase={writeToDatabase}
									handleDelete={handleDelete}
								/>
							</RequireAuth>
						}
					/>
					<Route
						path='units'
						element={
							<RequireAuth>
								<AdminUnits writeToDatabase={writeToDatabase} />
							</RequireAuth>
						}
					/>
					<Route
						path='promo'
						element={
							<RequireAuth>
								<PromotionAdmin writeToDatabase={writeToDatabase} />
							</RequireAuth>
						}
					/>
					<Route
						path='stats'
						element={
							<RequireAuth>
								<AdminStats />
							</RequireAuth>
						}
					/>
				</Route>
				<Route path={'/login'} element={<LoginPage />} />
			</>
		)
	)

	return <RouterProvider router={router}></RouterProvider>
}
export default App
