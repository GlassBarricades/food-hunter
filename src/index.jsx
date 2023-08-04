import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import 'dayjs/locale/ru'
import { DatesProvider } from '@mantine/dates'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

function Main() {
	const [orderLocal, setOrderLocal] = useLocalStorage({
		key: 'order',
		defaultValue: [],
	})
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: 'dark',
		getInitialValueInEffect: true,
	})

	const toggleColorScheme = value =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	useHotkeys([['mod+J', () => toggleColorScheme()]])

	function deleteOrder(id) {
		setOrderLocal(orderLocal.filter(el => el.orderUuid !== id))
	}

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{
					globalStyles: theme => ({
						'.active': {
							'&, &:hover': {
								backgroundColor: theme.fn.variant({
									variant: 'light',
									color: theme.primaryColor,
								}).background,
								color: theme.fn.variant({
									variant: 'light',
									color: theme.primaryColor,
								}).color,
							},
						},
					}),
					colorScheme: colorScheme,
					components: {
						Text: {
							styles: {
								root: {
									wordSpacing: '0.05em',
									lineHeight: '1.6em',
									letterSpacing: '0.05em',
								},
							},
						},
						Title: {
							styles: theme => ({
								root: {
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									color:
										theme.colorScheme === 'dark'
											? theme.colors.yellow[5]
											: theme.black,
								},
							}),
						},
						Table: {
							styles: {
								root: {
									fontSize: '1.2em',
								},
							},
						},
					},
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<DatesProvider
					settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}
				>
					<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<App />
						</PersistGate>
					</Provider>
				</DatesProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}

export default Main
