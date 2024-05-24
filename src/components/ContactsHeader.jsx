import {
	Group,
	Stack,
	Text,
	HoverCard,
	Anchor,
	useMantineTheme,
	MediaQuery,
} from '@mantine/core'
import { PhoneCall } from 'tabler-icons-react'

const ContactsHeader = () => {
	const theme = useMantineTheme()
	return (
		<MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
			<Stack spacing={0.5}>
				<Group>
					<Text weight={500}>ПРИЕМ ЗАКАЗОВ: </Text>
					<HoverCard width={280} shadow='md'>
						<HoverCard.Target>
							<Group>
								<PhoneCall
									color={
										theme.colorScheme === 'dark'
											? theme.colors.yellow[5]
											: theme.black
									}
								/>
								<Anchor
									component='a'
									href='tel:7352'
									weight={500}
									size='xl'
									color={
										theme.colorScheme === 'dark'
											? theme.colors.yellow[5]
											: theme.black
									}
								>
									7352
								</Anchor>
							</Group>
						</HoverCard.Target>
						<HoverCard.Dropdown>
							<Stack>
								<Group>
									<PhoneCall
										color={
											theme.colorScheme === 'dark'
												? theme.colors.yellow[5]
												: theme.black
										}
									/>
									<Anchor
										component='a'
										href='tel:+375296669399'
										weight={500}
										size='xl'
										color={
											theme.colorScheme === 'dark'
												? theme.colors.yellow[5]
												: theme.black
										}
									>
										+375(29)666-93-99
									</Anchor>
								</Group>
								<Group>
									<PhoneCall
										color={
											theme.colorScheme === 'dark'
												? theme.colors.yellow[5]
												: theme.black
										}
									/>
									<Anchor
										component='a'
										href='tel:+375298369399'
										weight={500}
										size='xl'
										color={
											theme.colorScheme === 'dark'
												? theme.colors.yellow[5]
												: theme.black
										}
									>
										+375(29)836-93-99
									</Anchor>
								</Group>
							</Stack>
						</HoverCard.Dropdown>
					</HoverCard>
				</Group>
				<Text>Вс-Чт: 11:00-23:00 Пт-Сб: 11:00-00:00</Text>
			</Stack>
		</MediaQuery>
	)
}
export default ContactsHeader
