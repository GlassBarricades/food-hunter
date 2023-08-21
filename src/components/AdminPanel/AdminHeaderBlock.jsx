import { Title, Group, Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/editSlice";
import { memo } from "react";

const AdminHeaderBlock = memo(({title}) => {
    const dispatch = useDispatch()
    return (
        <>
            <Group position='apart'>
				<Title>{title}</Title>
				<Button onClick={() => dispatch(openModal())}>
					Добавить элемент
				</Button>
			</Group>
        </>
    )
})
export default AdminHeaderBlock;