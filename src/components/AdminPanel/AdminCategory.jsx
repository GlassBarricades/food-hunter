import {
	Button,
	Group,
	Title,
	Modal,
	TextInput,
	NumberInput,
	Table,
	Image,
	ActionIcon,
	Checkbox,
	useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import useSortData from '../../hooks/useSortData'
import { Pencil, Trash, Eye, EyeOff } from 'tabler-icons-react'
import { useParams } from 'react-router-dom'
import writeToDatabase from '../../helpers/writeToDataBase'
import deleteDataBase from '../../helpers/deleteDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import { isNotEmpty, useForm } from '@mantine/form'
import AdminPanelSettings from './AdminPanelSettings'

const AdminCategory = () => {
	const { categoryElement } = useParams()
	const colorScheme = useMantineColorScheme()
	const [opened, handlers] = useDisclosure(false, {
		onClose: () => resetEdit(),
	})
	const [tempUuid, setTempUuid] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [categories] = useFetchData(`/${categoryElement}/`)
	const data = useSortData(categories, 'position')

	function resetEdit() {
		setTempUuid('')
		form.reset()
		setIsEdit(false)
	}

	const handleEdit = item => {
		setIsEdit(true)
		form.setValues({
			name: item.name,
			link: item.link,
			position: item.position,
			image: item.image,
			visible: item.visible,
			delivery: item.delivery,
		})
		setTempUuid(item.uuid)
		handlers.open()
	}

	const form = useForm({
		initialValues: {
			name: '',
			link: '',
			position: 0,
			image: '',
			visible: false,
			delivery: false,
		},
		validate: {
			link: isNotEmpty('Поле не должно быть пустым'),
		},
	})

	const rows = data.map(element => (
		<tr key={element.link}>
			<td>{element.position}</td>
			<td>{element.name}</td>
			<td>
				<Image width={50} src={element.image} alt={element.name} />
			</td>
			<td>{`/${element.link}`}</td>
			<td>
				<AdminPanelSettings
					element={element}
					deleteLink={`/${categoryElement}/${element.link}`}
					handleEdit={handleEdit}
				/>
				{/* <Group>
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
						onClick={() =>
							deleteDataBase(`/${categoryElement}/${element.link}`)
						}
						color={colorScheme.colorScheme === 'dark' ? 'yellow.5' : undefined}
					>
						<Trash size='1rem' />
					</ActionIcon>
				</Group> */}
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
					onSubmit={
						!isEdit
							? form.onSubmit(values =>
									writeToDatabase(
										`/${categoryElement}/${values.link}`,
										{ ...values },
										form.reset,
										handlers.close,
										false
									)
							  )
							: form.onSubmit(values => {
									submitChangeDataBase(
										values,
										`/${categoryElement}/${values.link}`,
										tempUuid,
										resetEdit,
										handlers.close
									)
							  })
					}
				>
					<TextInput
						placeholder='Название катерогии'
						label='Название категории'
						withAsterisk
						{...form.getInputProps('name')}
					/>
					<TextInput
						placeholder='Ссылка для меню'
						label='Ссылка для меню'
						withAsterisk
						{...form.getInputProps('link')}
					/>
					<NumberInput
						placeholder='Позиция для сортировки'
						label='Позиция для сортировки'
						{...form.getInputProps('position')}
					/>
					<TextInput
						label='Картинка'
						placeholder='Картинка'
						{...form.getInputProps('image')}
					/>
					<Group>
						<Checkbox
							mt='xs'
							size='md'
							label='Скрыть'
							{...form.getInputProps('visible', { type: 'checkbox' })}
						/>
						<Checkbox
							mt='xs'
							size='md'
							label='Без доставки'
							{...form.getInputProps('delivery', { type: 'checkbox' })}
						/>
					</Group>
					<Button mt='md' type='submit'>
						{isEdit ? 'Сохранить' : 'Отправить'}
					</Button>
				</form>
			</Modal>
			<Group position='apart'>
				<Title>Категории меню</Title>
				<Button onClick={handlers.open}>Добавить категорию</Button>
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
						<th>Сортировка</th>
						<th>Название</th>
						<th>Картинка</th>
						<th>Ссылка</th>
						<th>Настройки</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</>
	)
}
export default AdminCategory
