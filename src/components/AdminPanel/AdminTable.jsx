import { Table, ScrollArea, createStyles, Text } from '@mantine/core'
import { memo } from 'react'

const useStyles = createStyles({
	tableWrap: {
		minWidth: '100%',
	},
})

const AdminTable = memo(({ rows, columnArray, loading }) => {
	const { classes } = useStyles()

	return (
		<>
			{loading === true || loading === 'loading' ? (
				<Text size='xl'>Загрузка...</Text>
			) : (
				<ScrollArea h={'70vh'} maw={'100%'} mx='auto' offsetScrollbars>
					<Table
						className={classes.tableWrap}
						highlightOnHover
						withBorder
						withColumnBorders
						fontSize='md'
						mt='md'
					>
						<thead>
							<tr>
								{columnArray.map((item, index) => {
									return <th key={index}>{item}</th>
								})}
							</tr>
						</thead>
						<tbody>{rows}</tbody>
					</Table>
				</ScrollArea>
			)}
		</>
	)
})

export default AdminTable
