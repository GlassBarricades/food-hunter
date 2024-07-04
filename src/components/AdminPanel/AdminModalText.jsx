import { Modal } from '@mantine/core'
import { memo } from 'react'
import { closeModalText } from '../../store/textEditSlice'
import { useDispatch, useSelector } from 'react-redux'

const AdminModalText = memo(({ size, children }) => {
	const editText = useSelector(state => state.editText.editText)
	const openText = useSelector(state => state.editText.editModalText)
	const dispatch = useDispatch()
	return (
		<Modal
			opened={openText}
			size={size}
			onClose={() => dispatch(closeModalText())}
			title={editText ? 'Редактирование текст' : 'Добавление текста'}
		>
			{children}
		</Modal>
	)
})
export default AdminModalText