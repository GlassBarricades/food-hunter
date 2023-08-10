import { useEffect } from 'react'
import {
	Route,
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
import './app.css'
import AdminUnits from './components/AdminPanel/AdminUnits'
import ContactPage from './pages/ContactPage'
import { PromotionPage, promoLoader } from './pages/PromotionPage'
import { PromotionAdmin } from './components/AdminPanel/PromotionAdmin'
import LoginPage from './pages/LoginPage'
import RequireAuth from './hoc/RequireAuth'
import AdminStats from './components/AdminPanel/AdminStats'
import { fetchCategories } from './store/categoriesSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const App = () => {
	const categories = useSelector(state => state.categories.categories)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCategories())
	}, [dispatch])

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path='/' element={<LayoutPage />}>
					<Route index element={<HomePage />} />
					<Route path='/order' element={<OrderPage />} />
					<Route path='/contacts' element={<ContactPage />} />
					<Route
						path='/stock'
						element={<PromotionPage />}
						loader={promoLoader}
					/>
					<Route path='menu' element={<MenuPage />}>
						<Route
							index
							element={<MenuGridCategory categories={categories} />}
						/>
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
					path='admin'
					element={
						<RequireAuth>
							<AdminLayout />
						</RequireAuth>
					}
				>
					<Route
						index
						element={
							<RequireAuth>
								<AdminStats />
							</RequireAuth>
						}
					/>
					<Route
						path=':adminElement'
						element={
							<RequireAuth>
								<AdminMain />
							</RequireAuth>
						}
					/>
					<Route
						path='category/:categoryElement'
						element={
							<RequireAuth>
								<AdminCategory />
							</RequireAuth>
						}
					/>
					<Route
						path='units'
						element={
							<RequireAuth>
								<AdminUnits />
							</RequireAuth>
						}
					/>
					<Route
						path='promo'
						element={
							<RequireAuth>
								<PromotionAdmin />
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
