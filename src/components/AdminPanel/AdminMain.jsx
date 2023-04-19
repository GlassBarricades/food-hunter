import { Title } from "@mantine/core";
import { useParams } from "react-router-dom";

const AdminMain = ({ links }) => {
  const { adminElement } = useParams();

  const title = links.filter((item) => {
    if (item.link === adminElement) {
      return item;
    }
  });

  return (
    <>
      <Title>{title[0].label}</Title>
    </>
  );
};
export default AdminMain;
