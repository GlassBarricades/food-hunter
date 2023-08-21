import AdminPanelSettings from './AdminPanelSettings'
import { edited } from '../../store/editSlice'
import { useDispatch } from 'react-redux'
import { memo } from 'react'

const AdminUnitsRow = memo(({ element }) => {
	const dispatch = useDispatch()
	return (
		<tr>
			<td>{element.uuid}</td>
			<td>{element.name}</td>
			<td>
				<AdminPanelSettings
					element={element}
					deleteLink={`units/${element.uuid}`}
					handleEdit={dispatch(edited)}
				/>
			</td>
		</tr>
	)
})
export default AdminUnitsRow
