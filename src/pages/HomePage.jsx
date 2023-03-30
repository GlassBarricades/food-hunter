import { Title } from "@mantine/core";
import MenuGridCategory from "../components/MenuGridCategory";

const HomePage = ({data}) => {
    return (
        <>
            <Title mb="lg">Главная</Title>
            <MenuGridCategory data={data}/>
        </>
    )
}
export default HomePage;