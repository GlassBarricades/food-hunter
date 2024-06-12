import { Image, Group, Spoiler, Text } from '@mantine/core'
import AdminPanelSettings from './AdminPanelSettings'
import { edited } from '../../store/editSlice'
import { useDispatch } from 'react-redux'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

const AdminRow = memo(({ element, variant }) => {
	const dispatch = useDispatch()
	const { categoryElement, adminElement, subcategory, subelement } = useParams()
	return (
		<tr>
			{variant === 'units' || variant === 'promo' ? <td>{element.uuid}</td> : undefined}
			{variant === 'main' || variant === 'category' || variant === 'pizza' || variant === 'promo' ? (
				<td>{element.position}</td>
			) : undefined}
			<td>{element.name}</td>
			{variant === 'main' || variant === 'category' || variant === 'pizza' || variant === 'promo' ? (
				<td>
					<Image width={50} src={element.image} alt={element.name} />
				</td>
			) : undefined}

			{variant === 'main' || variant === 'pizza' ? (
				<td>{element.unit}</td>
			) : undefined}
			{variant === 'main' || variant === 'pizza' ? (
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
			{variant === 'main' || variant === 'category' || variant === 'pizza' ? (
				<td>{`/${element.link}`}</td>
			) : undefined}
			{variant === 'main' || variant === 'pizza' ? (
				<td>
					<Spoiler maxHeight={50} showLabel='Еще...' hideLabel='Скрыть'>
						{element.compound}
					</Spoiler>
				</td>
			) : undefined}
			{variant === 'main' ? <td>{element.category}</td> : undefined}
			{variant === 'main' || variant === 'pizza' ? (
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
			{variant === 'promo' ? <td>{element.day}</td> : undefined}
			{variant === 'promo' ? <td>{element.descr}</td> : undefined}
			<td>
				<AdminPanelSettings
					element={element}
					deleteLink={
						variant === 'main'
							? `/menu/${adminElement}/${element.link}`
							: variant === 'units'
							? `units/${element.uuid}`
							: variant === 'promo'
							? `promo/${element.uuid}`
							: variant === 'pizza'
							? `/menu/pizza-ads/${element.link}`
							: subcategory
							? `/${subcategory}/${subelement}/${element.link}`
							: `/${categoryElement}/${element.link}`
					}
					handleEdit={dispatch(edited)}
				/>
			</td>
		</tr>
	)
})
export default AdminRow