import {
	Button,
	Group,
	Title,
	Modal,
	TextInput,
	NumberInput,
	Textarea,
	Checkbox,
	Table,
	ActionIcon,
	useMantineColorScheme,
	Image,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import useSortData from '../../hooks/useSortData'
import { uid } from 'uid'
import { Pencil, Trash } from 'tabler-icons-react'
import writeToDatabase from '../../helpers/writeToDataBase'
import deleteDataBase from '../../helpers/deleteDataBase'
import useFetchData from '../../hooks/useFetchData'

const PromotionAdmin = () => {
	const colorScheme = useMantineColorScheme()
	const [opened, handlers] = useDisclosure(false, {
		onClose: () => resetState(),
	})
	const [name, setName] = useState('')
	const [position, setPosition] = useState(0)
	const [image, setImage] = useState('')
	const [descr, setDescr] = useState('')
	const [day, setDay] = useState('')
	const [visible, setVisible] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [categories] = useFetchData(`/promo/`)
	const data = useSortData(categories, 'position')

	const resetState = () => {
		setName('')
		setPosition('')
		setImage('')
		setDescr('')
		setDay('')
		setVisible(false)
	}

	const handleEdit = item => {
		setIsEdit(true)
		setName(item.name)
		setPosition(item.position)
		setImage(item.image)
		setDescr(item.descr)
		setDay(item.day)
		setVisible(item.visible)
		handlers.open()
	}

	const rows = data.map(element => (
		<tr key={element.uuid}>
			<td>{element.position}</td>
			<td>{element.name}</td>
			<td>
				<Image width={50} src={element.image} alt={element.name} />
			</td>
			<td>{element.descr}</td>
			<td>
				<Group>
					<ActionIcon
						mt='xs'
						variant={colorScheme.colorScheme === 'dark' ? 'outline' : 'default'}
						onClick={() => handleEdit(element)}
						color={colorScheme.colorScheme === 'dark' ? 'yellow.5' : undefined}
					>
						<Pencil size='1rem' />
					</ActionIcon>
					<ActionIcon
						mt='xs'
						variant={colorScheme.colorScheme === 'dark' ? 'outline' : 'default'}
						onClick={() => deleteDataBase(`/promo/${element.name}`)}
						color={colorScheme.colorScheme === 'dark' ? 'yellow.5' : undefined}
					>
						<Trash size='1rem' />
					</ActionIcon>
				</Group>
			</td>
		</tr>
	))

	return (
		<>
			<Modal
				opened={opened}
				onClose={handlers.close}
				title={isEdit ? 'Редактирование категории' : 'Добавление категории'}
			>
				<form
					onSubmit={writeToDatabase(
						`/promo/${name}`,
						{
							name: name,
							position: position,
							image: image,
							day: day,
							visible: visible,
							descr: descr,
							uuid: uid(),
						},
						resetState,
						handlers.close
					)}
				>
					<TextInput
						placeholder='Название акции'
						label='Название акции'
						withAsterisk
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<NumberInput
						placeholder='Позиция для сортировки'
						label='Позиция для сортировки'
						value={position}
						onChange={setPosition}
					/>
					<TextInput
						label='Картинка'
						placeholder='Картинка'
						value={image}
						onChange={e => setImage(e.target.value)}
					/>
					<TextInput
						label='День недели'
						placeholder='День недели'
						value={day}
						onChange={e => setDay(e.target.value)}
					/>
					<Group>
						<Checkbox
							mt='xs'
							size='md'
							label='Скрыть'
							checked={visible}
							onChange={event => setVisible(event.currentTarget.checked)}
						/>
					</Group>
					<Textarea
						placeholder='Описание'
						label='Описание'
						autosize
						minRows={3}
						value={descr}
						onChange={e => setDescr(e.target.value)}
					/>
					<Button mt='md' type='submit'>
						{isEdit ? 'Сохранить' : 'Отправить'}
					</Button>
				</form>
			</Modal>
			<Group position='apart'>
				<Title>Акции</Title>
				<Button onClick={handlers.open}>Добавить акцию</Button>
			</Group>
			<Table
				highlightOnHover
				withBorder
				withColumnBorders
				fontSize='md'
				mt='md'
			>
				<thead>
					<tr>
						<th>Позиция</th>
						<th>Название</th>
						<th>Картинка</th>
						<th>Описание</th>
						<th>Настройки</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</>
	)
}

export { PromotionAdmin }
