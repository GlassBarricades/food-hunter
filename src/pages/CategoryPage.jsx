import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { SimpleGrid, Tabs, Text } from "@mantine/core";
import { getDatabase, ref, child, get } from "firebase/database";
import ScrollToTop from "../helpers/ScrollToTop";
import { useNavigate, useParams } from "react-router-dom";
import useSortDataVisible from "../hooks/useSortDataVisible";
import MenuCard from "../components/MenuCard";
import { useSelector } from "react-redux";
import useFilterOnField from "../hooks/useFilterOnField";

const CategoryPage = () => {
  const { dataBase, category, dataCategories, err } = useLoaderData();
  const categories = useSelector((state) => state.categories.categories);
  const { object } = useFilterOnField(categories, category);
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const sortedCategories = useSortDataVisible(dataCategories, "position");
  const [activeTab, setActiveTab] = useState(
    dataCategories ? dataCategories[0].name : undefined
  );
  const sortedData = useSortDataVisible(dataBase, "position");

  const filteredData = dataBase
    ? dataBase.filter((item) => {
        if (tabValue === item.category) {
          return item;
        }
      })
    : [];
  const sortedDataA = useSortDataVisible(filteredData, "position");


  return (
    <>
      <ScrollToTop />
      {!dataBase ? (
        <Text size="xl">Данный раздел пока пуст</Text>
      ) : (
        <>
          {object.subsection ? (
            <Tabs
              color="yellow"
              variant="pills"
              defaultValue={activeTab}
              value={tabValue}
              onTabChange={(value) =>
                navigate(`/menu/${category}/tabs/${value}`)
              }
            >
              <Tabs.List>
                {sortedCategories.map((item) => {
                  return (
                    <Tabs.Tab key={item.uuid} value={item.name}>
                      {item.name}
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>

              {sortedCategories.map((item) => {
                return (
                  <Tabs.Panel key={item.uuid} value={item.name} pt="xs">
                    <SimpleGrid
                      cols={5}
                      spacing="xl"
                      breakpoints={[
                        { maxWidth: "xl", cols: 5, spacing: "lg" },
                        { maxWidth: "lg", cols: 4, spacing: "lg" },
                        { maxWidth: "md", cols: 3, spacing: "md" },
                        { maxWidth: "sm", cols: 2, spacing: "sm" },
                        { maxWidth: "xs", cols: 2, spacing: "sm" },
                      ]}
                    >
                      {sortedDataA.map((item, index) => {
                        const itemVariants = item.variant
                          ? Object.values(item.variant)
                          : undefined;
                        return (
                          <MenuCard
                            key={index}
                            dataItem={item}
                            category={category}
                            itemVariants={itemVariants}
                          />
                        );
                      })}
                    </SimpleGrid>
                  </Tabs.Panel>
                );
              })}
            </Tabs>
          ) : (
            <SimpleGrid
              cols={5}
              spacing="xl"
              breakpoints={[
                { maxWidth: "xl", cols: 5, spacing: "lg" },
                { maxWidth: "lg", cols: 4, spacing: "lg" },
                { maxWidth: "md", cols: 3, spacing: "md" },
                { maxWidth: "sm", cols: 2, spacing: "sm" },
                { maxWidth: "xs", cols: 2, spacing: "sm" },
              ]}
            >
              {sortedData.map((item, index) => {
                const itemVariants = item.variant
                  ? Object.values(item.variant)
                  : undefined;
                return (
                  <MenuCard
                    key={index}
                    dataItem={item}
                    category={category}
                    itemVariants={itemVariants}
                  />
                );
              })}
            </SimpleGrid>
          )}
        </>
      )}
    </>
  );
};
const categoryLoader = async ({ params }) => {
  const { category, tabs } = params;
  const dbRef = ref(getDatabase());

  try {
    const snapshot = await get(child(dbRef, `menu/${category}`));
    let err
    if (!snapshot.exists()) {
      throw new Error("No data available1");
    }
    const dataBase = Object.values(snapshot.val());

    let dataCategories;
    if (tabs) {
      const snapshot = await get(child(dbRef, `/subcategory/${category}`));
      if (!snapshot.exists()) {
        throw new Error("No data available");
      }
      dataCategories = Object.values(snapshot.val());
    }
    return { dataBase, category, dataCategories };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { CategoryPage, categoryLoader };
