import { Title, Group, Button } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { openModal } from '../../store/editSlice'
import useFetchDataOne from '../../hooks/useFetchDataOne'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

const AdminHeaderBlock = memo(({ title }) => {
	const { adminElement } = useParams()
	const dispatch = useDispatch()
	const linkItem = useFetchDataOne(`/categories/${adminElement}`)
	return (
		<>
			<Group justify='space-between'>
				{title ? <Title>{title}</Title> : <Title>{linkItem[0].name}</Title>}
				<Button onClick={() => dispatch(openModal())}>Добавить элемент</Button>
			</Group>
		</>
	)
})
export default AdminHeaderBlock
