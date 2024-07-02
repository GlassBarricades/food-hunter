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
  const { dataBase, category, dataCategories, categoryData, error } = useLoaderData();
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

  console.log(dataCategories)

  return (
    <>
    <ScrollToTop />
      {error  ? (
        <Text size="xl">Произошла ошибка: {error.message}</Text>
      ) : !dataBase ? (
        <Text size="xl">Данный раздел пока пуст</Text>
      ) : (
        <>
          {object.subsection ? (
            <Tabs
              color="yellow"
              variant="pills"
              defaultValue={activeTab}
              value={tabValue}
              onChange={(value) =>
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
                      cols={{base: 2, md: 3, lg: 4, xl: 5}}
                      spacing="xl"
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
                            vertical={categoryData.verticalImage}
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
              cols={{base: 2, md: 3, lg: 4, xl: 5}}
              spacing="sm"
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
                    vertical={categoryData.verticalImage}
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

const getData = async (dbRef, path) => {
  const snapshot = await get(child(dbRef, path));
  if (!snapshot.exists()) {
    throw new Error("No data available");
  }
  return snapshot.val();
};

const categoryLoader = async ({ params }) => {
  const { category, tabs } = params;
  const dbRef = ref(getDatabase());

  let result = {
    dataBase: null,
    category: null,
    dataCategories: null,
    categoryData: null,
    error: null,
  };

  try {
    const snapshot = await get(child(dbRef, `menu/${category}`));
    result.categoryData = await getData(dbRef, `/categories/${category}`);
    if (!snapshot.exists()) {
      throw new Error("No data available1");
    }
    result.dataBase = Object.values(snapshot.val());

    if (tabs) {
      const snapshot = await get(child(dbRef, `/subcategory/${category}`));
      if (!snapshot.exists()) {
        throw new Error("No data available");
      }
      result.dataCategories = Object.values(snapshot.val());
    }
    result.category = category;
  } catch (error) {
    console.error(error);
    result.error = error;
  }

  return result;
};

export { CategoryPage, categoryLoader };
