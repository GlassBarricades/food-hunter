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
import { isNotEmpty, useForm } from '@mantine/form'
import { useState } from 'react'
import useSortData from '../../hooks/useSortData'
import { Pencil, Trash } from 'tabler-icons-react'
import writeToDatabase from '../../helpers/writeToDataBase'
import submitChangeDataBase from '../../helpers/submitChangeDataBase'
import deleteDataBase from '../../helpers/deleteDataBase'
import useFetchData from '../../hooks/useFetchData'

const PromotionAdmin = () => {
	const colorScheme = useMantineColorScheme()
	const [opened, handlers] = useDisclosure(false, {
		onClose: () => resetEdit(),
	})
	const [tempUuid, setTempUuid] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [categories] = useFetchData(`/promo/`)
	const data = useSortData(categories, 'position')

	function resetEdit() {
		setTempUuid('')
		form.reset()
		setIsEdit(false)
	}

	const handleEdit = item => {
		setIsEdit(true)
		form.setFieldValue('name', item.name)
		form.setFieldValue('position', item.position)
		form.setFieldValue('image', item.image)
		form.setFieldValue('descr', item.descr)
		form.setFieldValue('day', item.day)
		form.setFieldValue('visible', item.visible)
		setTempUuid(item.uuid)
		handlers.open()
	}

	const form = useForm({
		initialValues: {
			name: '',
			position: 0,
			image: '',
			descr: '',
			day: '',
			visible: false,
		},
		validate: {
			link: isNotEmpty('Поле не должно быть пустым'),
		},
	})

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
						onClick={() => deleteDataBase(`/promo/${element.uuid}`)}
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
					onSubmit={
						!isEdit
							? form.onSubmit(values =>
									writeToDatabase(
										`/promo/`,
										{ ...values },
										form.reset,
										handlers.close,
										true
									)
							  )
							: form.onSubmit(values => {
									submitChangeDataBase(
										values,
										`/promo/${tempUuid}`,
										tempUuid,
										resetEdit,
										handlers.close
									)
							  })
					}
				>
					<TextInput
						placeholder='Название акции'
						label='Название акции'
						withAsterisk
						{...form.getInputProps('name')}
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
					<TextInput
						label='День недели'
						placeholder='День недели'
						{...form.getInputProps('day')}
					/>
					<Group>
						<Checkbox
							mt='xs'
							size='md'
							label='Скрыть'
							{...form.getInputProps('visible', { type: 'checkbox' })}
						/>
					</Group>
					<Textarea
						placeholder='Описание'
						label='Описание'
						autosize
						minRows={3}
						{...form.getInputProps('descr')}
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

export default PromotionAdmin
