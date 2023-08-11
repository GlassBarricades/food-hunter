import { useState } from 'react'
import {
	Grid,
	SimpleGrid,
	Title,
	Paper,
	Card,
	Text,
	Group,
	Stack,
	TextInput,
	SegmentedControl,
	Textarea,
	createStyles,
	Button,
	Modal,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm, hasLength, isNotEmpty } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { resetOrder } from '../store/orderSlice'
import OrderBasketCard from '../components/OrderBasketCard'

const useStyles = createStyles(theme => ({
	formWrapper: {
		height: '100%',
	},
}))

const OrderPage = () => {
	const order = useSelector(state => state.order.order)
	const productsArr = useSelector(state => state.productsArr.productsArr)
	const productQuantity = useSelector(
		state => state.productQuantity.productQuantity
	)
	const [opened, { open, close }] = useDisclosure(false, {
		onOpen: () => dispatch(resetOrder()),
		onClose: () => form.reset(),
	})
	const { classes } = useStyles()
	const [variant, setVariant] = useState('2202')
	const [paymentType, setPaymentType] = useState('1')
	const [table, setTable] = useState('4566')
	const dispatch = useDispatch()

	const arrOrder = productsArr.map(item => {
		return item.id
	})

	const arrOrderQuantity = productQuantity.map(item => {
		return `${item.quantity}`
	})

	const form = useForm({
		initialValues: {
			product: [],
			product_kol: [],
			name: '',
			phone: '',
			street: '',
			house: '',
			apart: '',
			descr: '',
			tags: [],
			datetime: '',
		},
		validate: {
			name: hasLength({ max: 50 }, 'Имя должно быть до 50 символов длинной'),
			phone:
				isNotEmpty('Введите корректный номер телефона') &&
				hasLength({ min: 7, max: 15 }, 'Введите корректный номер телефона'),
			descr: hasLength({ max: 100 }, 'Длинна комментария до 100 символов'),
		},
	})

	const arrPrice = order.map(item => {
		return item.priceOrder * item.quantity
	})

	const fullPrice = arrPrice.reduce(function (sum, elem) {
		return sum + elem
	}, 0)

	return (
		<>
			<Modal opened={opened} onClose={close} title=' ' centered>
				<Text align='center' color='yellow' size={45}>
					Спасибо!
				</Text>
				<Text align='center' color='yellow' size={21}>
					Ваш заказ отправлен. Ожидайте звонок администратора.
				</Text>
			</Modal>
			<Title>Оформление заказа</Title>
			<SimpleGrid
				mt='md'
				cols={2}
				spacing='md'
				breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
			>
				<Paper radius='md'>
					<Card
						className={classes.formWrapper}
						withBorder
						shadow='sm'
						radius='md'
					>
						<Card.Section withBorder inheritPadding py='xs'>
							<Group position='apart'>
								<Title order={5} weight={500}>
									Форма оформления заказа:
								</Title>
							</Group>
						</Card.Section>
						<Card.Section p='sm'>
							<form
								id='formOrder'
								onSubmit={form.onSubmit(values => {
									fetch('sendOrder.php', {
										method: 'POST',
										mode: 'no-cors',
										headers: {
											'Content-type':
												'application/x-www-form-urlencoded; application/json; charset=UTF-8',
										},
										body: 'paramm=' + JSON.stringify(values),
									})
									open()
								})}
							>
								<Group>
									<SegmentedControl
										value={variant}
										onChange={setVariant}
										data={[
											{ label: 'Доставка', value: '2202' },
											{ label: 'Самовынос', value: '2294' },
											{
												label: 'За столом',
												value: '234756345986459867459687495684',
											},
										]}
									/>
									{variant === '2294' ? (
										<Text>Адрес: проспект Ленина, 15Б</Text>
									) : undefined}
									{variant === '234756345986459867459687495684' ? (
										<Stack spacing='xs'>
											<Text>Выбор столика:</Text>
											<SegmentedControl
												mt='sm'
												value={table}
												onChange={setTable}
												data={[
													{ label: 'Стол №1', value: '4566' },
													{ label: 'Стол №2', value: '5052' },
													{ label: 'Стол №3', value: '5053' },
												]}
											/>
											<SegmentedControl
												mt='sm'
												value={table}
												onChange={setTable}
												data={[
													{ label: 'Стол №4', value: '5054' },
													{ label: 'Стол №5', value: '5055' },
												]}
											/>
										</Stack>
									) : undefined}
								</Group>
								<SegmentedControl
									mt='sm'
									value={paymentType}
									onChange={setPaymentType}
									data={[
										{ label: 'Наличными', value: '1' },
										{ label: 'Картой', value: '2' },
									]}
								/>
								<TextInput
									placeholder='Имя'
									label='Имя'
									name='name'
									{...form.getInputProps('name')}
									withAsterisk
								/>
								<TextInput
									placeholder='Телефон'
									label='Телефон'
									{...form.getInputProps('phone')}
									withAsterisk
								/>
								{variant === '2202' ? (
									<>
										<TextInput
											placeholder='Улица'
											label='Улица'
											name='street'
											{...form.getInputProps('street')}
										/>
										<TextInput
											placeholder='Дом'
											label='Дом'
											name='house'
											{...form.getInputProps('house')}
										/>
										<TextInput
											placeholder='Квартира'
											label='Квартира'
											name='apart'
											{...form.getInputProps('apart')}
										/>
									</>
								) : undefined}
								<DateTimePicker
									withSeconds
									valueFormat='YYYY-MM-DD HH:mm:ss'
									label='Выберите дату и время предзаказа'
									placeholder='Дата и время предзаказа'
									{...form.getInputProps('datetime')}
								/>
								<Textarea
									label='Комментарий к заказу'
									placeholder='Комментарий к заказу'
									name='descr'
									{...form.getInputProps('descr')}
									autosize
									minRows={2}
									maxRows={4}
								/>
								<Button
									mt='md'
									type='submit'
									onClick={() =>
										form.setValues({
											product: arrOrder,
											product_kol: arrOrderQuantity,
											tags:
												variant === '234756345986459867459687495684'
													? [table]
													: [variant],
											pay: paymentType,
										})
									}
								>
									Отправить заказ
								</Button>
							</form>
						</Card.Section>
					</Card>
				</Paper>
				<Grid gutter='md'>
					<Grid.Col>
						<OrderBasketCard fullPrice={fullPrice} />
					</Grid.Col>
				</Grid>
			</SimpleGrid>
		</>
	)
}
export default OrderPage
