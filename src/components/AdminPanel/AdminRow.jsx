import { Image, Group, Spoiler, Text } from '@mantine/core'
import AdminPanelSettings from './AdminPanelSettings'
import { edited } from '../../store/editSlice'
import { useDispatch } from 'react-redux'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

const AdminRow = memo(({ element, variant }) => {
	const dispatch = useDispatch()
	const { categoryElement, adminElement } = useParams()
	return (
		<tr>
			{variant === 'units' ? <td>{element.uuid}</td> : undefined}
			{variant === 'main' || variant === 'category' ? (
				<td>{element.position}</td>
			) : undefined}
			<td>{element.name}</td>
			{variant === 'main' || variant === 'category' ? (
				<td>
					<Image width={50} src={element.image} alt={element.name} />
				</td>
			) : undefined}

			{variant === 'main' ? <td>{element.unit}</td> : undefined}
			{variant === 'main' ? (
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
			) : undefined}
			{variant === 'main' || variant === 'category' ? (
				<td>{`/${element.link}`}</td>
			) : undefined}
			{variant === 'main' ? (
				<td>
					<Spoiler maxHeight={50} showLabel='Еще...' hideLabel='Скрыть'>
						{element.compound}
					</Spoiler>
				</td>
			) : undefined}
			{variant === 'main' ? <td>{element.category}</td> : undefined}
			{variant === 'main' ? (
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
			) : undefined}
			<td>
				<AdminPanelSettings
					element={element}
					deleteLink={
						variant === 'main'
							? `/menu/${adminElement}/${element.link}`
							: variant === 'units'
							? `units/${element.uuid}`
							: `/${categoryElement}/${element.link}`
					}
					handleEdit={dispatch(edited)}
				/>
			</td>
		</tr>
	)
})
export default AdminRow
