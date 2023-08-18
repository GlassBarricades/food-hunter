import { Button } from '@mantine/core'
import { ChevronsLeft } from 'tabler-icons-react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
	const navigate = useNavigate()
	return (
		<Button
			variant='outline'
			color='yellow'
			mb='xl'
			onClick={() => navigate(-1)}
			leftIcon={<ChevronsLeft size='1rem' />}
		>
			Вернуться назад
		</Button>
	)
}
export default BackButton
