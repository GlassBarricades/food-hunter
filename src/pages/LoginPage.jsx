import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthLogin from '../components/AuthLogin'

const LoginPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { singin } = useAuth()

	const fromPage = location.state?.from.pathname || '/'

	const handlerSubmit = event => {
		event.preventDefault()
		const form = event.target
		const user = form.username.value

		singin(user, () => navigate(fromPage, { replace: true }))
	}

	return (
		<div>
			<h1>Login Page</h1>
			<AuthLogin />
		</div>
	)
}

export default LoginPage
