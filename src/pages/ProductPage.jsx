import { useState } from 'react'
import {
	Grid,
	Image,
	createStyles,
	Text,
	SegmentedControl,
	Group,
	Stack,
	rem,
	NumberInput,
	Paper,
	Button,
	ActionIcon,
} from '@mantine/core'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { getDatabase, ref, child, get } from 'firebase/database'
import useSortData from '../hooks/useSortData'
import AddList from '../components/AddList'
import ProductTitle from '../components/ProductTitle'
import Compound from '../components/Compound'
import { ChevronsLeft } from 'tabler-icons-react'
import { useDispatch } from 'react-redux'
import { addOrder } from '../store/orderSlice'
import { incrementQuantity, decrementQuantity } from '../store/quantitySlice'
import { useSelector } from 'react-redux'
import { uid } from 'uid'

const useStyles = createStyles(() => ({
	wrapper: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
	},
}))

const ProductPage = () => {
	const { productDataBase, category, addList } = useLoaderData()
	const quantity = useSelector(state => state.quantity.quantity)
	const navigate = useNavigate()
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
					<Button
						variant='outline'
						color='yellow'
						mb='xl'
						onClick={() => navigate(-1)}
						leftIcon={<ChevronsLeft size='1rem' />}
					>
						Вернуться назад
					</Button>
					<Image
						radius='md'
						height={500}
						src={productDataBase.image}
						alt={productDataBase.name}
					/>
				</Grid.Col>
				<Grid.Col md={6}>
					<Paper shadow='xs' p='md' withBorder>
						<Stack>
							<ProductTitle title={productDataBase.name} />
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
							<Group position='left' spacing='xs' align='flex-end'>
								<Text size='sm' mt='xs'>
									Цена:
								</Text>
								<Text size='xl' mt='sm' fw={700}>
									{dataVariants[variantValue].price}
								</Text>
								<Text size='sm' mt='xs'>
									руб
								</Text>
							</Group>
							<Group position='apart'>
								<Group spacing={5}>
									<Text>Количество: </Text>
									<Group spacing={5}>
										<ActionIcon
											size={35}
											variant='default'
											onClick={() => dispatch(decrementQuantity())}
										>
											–
										</ActionIcon>

										<NumberInput
											hideControls
											value={quantity}
											// handlersRef={handlers}
											max={10}
											min={0}
											step={2}
											styles={{
												input: { width: rem(54), textAlign: 'center' },
											}}
										/>

										<ActionIcon
											size={35}
											variant='default'
											onClick={() => dispatch(incrementQuantity())}
										>
											+
										</ActionIcon>
									</Group>
								</Group>
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
	if (
		category === 'sushi' ||
		category === 'nigiri' ||
		category === 'gynkan' ||
		category === 'sety-sushi' ||
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
	return { productDataBase, category, product, addList }
}

export { ProductPage, productLoader }
