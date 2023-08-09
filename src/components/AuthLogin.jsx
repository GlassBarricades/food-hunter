import AuthForm from './AuthForm'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/authSlice'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const AuthLogin = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleLogin = (email, password) => {
		const auth = getAuth()
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(
					setUser({
						email: user.email,
						id: user.id,
						token: user.accessToken,
					})
				)
			})
			.then(() => navigate('/admin', { replace: true }))
			.catch(console.log)
	}
	return <AuthForm title={'Войти'} handleClick={handleLogin} />
}

export default AuthLogin
