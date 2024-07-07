import { Text, Title } from "@mantine/core"
import useFetchDataOne from "../hooks/useFetchDataOne";

const DeliveryPage = () => {
    const [data, loading] = useFetchDataOne("/delivery/");
    return (
        <>
        <Title mb="xl">Доставка</Title>
        {loading ? <Text>Загрузка...</Text> : <div dangerouslySetInnerHTML={{ __html: data.text }}></div>}
        </>
    )
}
export default DeliveryPage;