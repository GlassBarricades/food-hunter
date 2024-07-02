import { MantineProvider, ColorSchemeProvider, lighten } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import 'dayjs/locale/ru'
import { DatesProvider } from '@mantine/dates'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Notifications } from '@mantine/notifications'

function Main() {
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: 'dark',
		getInitialValueInEffect: true,
	})

	const toggleColorScheme = value =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

	useHotkeys([['mod+J', () => toggleColorScheme()]])

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
						Text: Text.extend({
							styles: {
								root: {
									wordSpacing: '0.05em',
									lineHeight: '1.6em',
									letterSpacing: '0.05em',
								},
							},
						}),
						Title: Title.extend({
							styles: {
								root: {
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									color: 'ligh-dark(var(--mantine-color-black), var(--mantine-color-yellow-5))'
										// theme.colorScheme === 'dark'
										// 	? theme.colors.yellow[5]
										// 	: theme.black,
								},
							}),
						}),
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
				defaultColorScheme='dark'
			>
				<DatesProvider
					settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}
				>
					<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<Notifications position='top-right' />
							<App />
						</PersistGate>
					</Provider>
				</DatesProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	)
}

export default Main
