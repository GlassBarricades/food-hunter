import { useState } from 'react'
import {
	Grid,
	createStyles,
	Text,
	SegmentedControl,
	Group,
	Stack,
	Paper,
	Button,
} from '@mantine/core'
import { useLoaderData } from 'react-router-dom'
import { getDatabase, ref, child, get } from 'firebase/database'
import useSortData from '../hooks/useSortData'
import AddList from '../components/AddList'
import ProductTitle from '../components/ProductTitle'
import Compound from '../components/Compound'
import { useDispatch } from 'react-redux'
import { addOrder } from '../store/orderSlice'
import { useSelector } from 'react-redux'
import { uid } from 'uid'
import ProductPrice from '../components/Product/ProductPrice'
import ProductQuantity from '../components/Product/ProductQuantity'
import BackButton from '../components/BackButton'
import ProductImage from '../components/Product/ProductImage'

const useStyles = createStyles(() => ({
	wrapper: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
	},
}))

const ProductPage = () => {
	const { productDataBase, dataCategories, category, addList } = useLoaderData()
	const quantity = useSelector(state => state.quantity.quantity)
	const { classes } = useStyles()
	const dataVariants = Object.values(productDataBase.variant)
	const arrA = useSortData(dataVariants, 'size')
	const [variantValue, setVarianValue] = useState(createVariants(arrA))
	const dispatch = useDispatch()

	const arr = arrA.map((item, index) => {
		if (item.size !== 0) {
			const obj = {
				label: `${item.size} ${productDataBase.unit}`,
				value: `${index}`,
			}
			return obj
		}
		return false
	})
	const filteredArr = arr.filter(item => {
		return item !== false ? item : undefined
	})

	function createVariants(arr) {
		const arrData = arr.map((item, index) => {
			if (item.size !== 0) {
				const obj = {
					label: `${item.size} ${productDataBase.unit}`,
					value: `${index}`,
				}
				return obj
			}
			return false
		})
		const filteredArr = arrData.filter(item => {
			return item !== false ? item : undefined
		})
		return filteredArr[0].value
	}

	return (
		<>
			<Grid className={classes.wrapper}>
				<Grid.Col md={6}>
					<BackButton />
					<ProductImage
						link={productDataBase.image}
						title={productDataBase.name}
					/>
				</Grid.Col>
				<Grid.Col md={6}>
					<Paper shadow='xs' p='md' withBorder>
						<Stack>
							<Group position='apart'>
								<ProductTitle title={productDataBase.name} />
								{dataCategories.delivery ? (
									<Text>(Доставка не осуществляется)</Text>
								) : undefined}
							</Group>
							<Compound compound={productDataBase.compound} />
							{category === 'sushi' ||
							category === 'nigiri' ||
							category === 'gynkan' ||
							category === 'sety-sushi' ||
							category === 'goryachie-sushi' ||
							category === 'friture' ||
							category === 'pizza' ||
							category === 'seti-pizza' ? (
								<AddList addList={addList} />
							) : undefined}
							<Group>
								<Text>Размер: </Text>
								<SegmentedControl
									size='md'
									value={variantValue}
									onChange={setVarianValue}
									data={filteredArr}
								/>
							</Group>
							<ProductPrice price={dataVariants[variantValue].price} />
							<Group position='apart'>
								<ProductQuantity />
								<Button
									variant='outline'
									color='yellow'
									onClick={() =>
										dispatch(
											addOrder({
												item: productDataBase,
												quantity: quantity,
												label: arr[variantValue].label,
												price: dataVariants[variantValue].price,
												id: dataVariants[variantValue].id,
												handlers: undefined,
												orderUuid: uid(),
												delive: dataCategories.delivery,
											})
										)
									}
								>
									Добавить в корзину
								</Button>
							</Group>
						</Stack>
					</Paper>
				</Grid.Col>
			</Grid>
		</>
	)
}

const productLoader = async ({ params }) => {
	const category = params.category
	const product = params.product
	const dbRef = ref(getDatabase())
	let productDataBase
	let dataCategories
	let addList
	await get(child(dbRef, `menu/${category}/${product}`))
		.then(snapshot => {
			if (snapshot.exists()) {
				const data = snapshot.val()
				return data
			} else {
				console.log('No data available')
			}
		})
		.then(data => {
			productDataBase = data
		})
		.catch(error => {
			console.error(error)
		})
	await get(child(dbRef, `/categories/${category}`))
		.then(snapshot => {
			if (snapshot.exists()) {
				const data = snapshot.val()
				return data
			} else {
				console.log('No data available')
			}
		})
		.then(data => {
			dataCategories = data
		})
		.catch(error => {
			console.error(error)
		})
	if (
		category === 'sushi' ||
		category === 'nigiri' ||
		category === 'gynkan' ||
		category === 'seti-sushi' ||
		category === 'goryachie-sushi' ||
		category === 'friture'
	) {
		await get(child(dbRef, `menu/soysi`))
			.then(snapshot => {
				if (snapshot.exists()) {
					const data = Object.values(snapshot.val())
					return data
				} else {
					console.log('No data available')
				}
			})
			.then(data => {
				addList = data
			})
			.catch(error => {
				console.error(error)
			})
	}
	if (category === 'pizza' || category === 'seti-pizza') {
		await get(child(dbRef, `menu/dobavki`))
			.then(snapshot => {
				if (snapshot.exists()) {
					const data = Object.values(snapshot.val())
					return data
				} else {
					console.log('No data available')
				}
			})
			.then(data => {
				addList = data
			})
			.catch(error => {
				console.error(error)
			})
	}
	return { productDataBase, dataCategories, category, product, addList }
}

export { ProductPage, productLoader }
