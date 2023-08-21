import { Image, Group, Text, Spoiler } from '@mantine/core'
import AdminPanelSettings from './AdminPanelSettings'
import { edited } from '../../store/editSlice'
import { useDispatch } from 'react-redux'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

const AdminMainRow = memo(({ element }) => {
	const dispatch = useDispatch()
	const { adminElement } = useParams()
	return (
		<tr>
			<td>{element.position}</td>
			<td>{element.name}</td>
			<td>
				<Image width={50} src={element.image} alt={element.name} />
			</td>
			<td>{element.unit}</td>
			<td>
				<Group>
					{element.variant
						? Object.values(element.variant).map((item, index) => {
								return item.id != '' ? (
									<Text key={index}>{item.id}</Text>
								) : undefined
						  })
						: undefined}
				</Group>
			</td>
			<td>{`/${element.link}`}</td>
			<td>
				<Spoiler maxHeight={50} showLabel='Еще...' hideLabel='Скрыть'>
					{element.compound}
				</Spoiler>
			</td>
			<td>{element.category}</td>
			<td>
				<Group>
					{element.variant
						? Object.values(element.variant).map((item, index) => {
								return item.size != 0 ? (
									<Text key={index}>
										{item.size} - {item.price}р
									</Text>
								) : undefined
						  })
						: undefined}
				</Group>
			</td>
			<td>
				<AdminPanelSettings
					element={element}
					deleteLink={`/menu/${adminElement}/${element.link}`}
					handleEdit={dispatch(edited)}
				/>
			</td>
		</tr>
	)
})
export default AdminMainRow
