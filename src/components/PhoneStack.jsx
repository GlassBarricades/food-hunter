import { Anchor, Group, Stack } from "@mantine/core"
import { PhoneCall } from "tabler-icons-react"
import classes from "./PhoneStack.module.css"

const PhoneStack = () => {
    return (
        <Stack gap="xs">
						<Group>
							<PhoneCall
								className={classes.link}
							/>
							<Anchor
								component='a'
								href='tel:7352'
								weight={500}
								size='xl'
								className={classes.link}
							>
								7352
							</Anchor>
						</Group>
							<Group>
								<PhoneCall
									className={classes.link}
								/>
								<Anchor
									component='a'
									href='tel:+375296669399'
									weight={500}
									size='xl'
									className={classes.link}
								>
									+375(29)666-93-99
								</Anchor>
							</Group>
							<Group>
								<PhoneCall
									className={classes.link}
								/>
								<Anchor
									component='a'
									href='tel:+375298369399'
									weight={500}
									size='xl'
									className={classes.link}
								>
									+375(29)836-93-99
								</Anchor>
							</Group>
						</Stack>
    )
}
export default PhoneStack;