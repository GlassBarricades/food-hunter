import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Text, SimpleGrid, Card, Image, Button, Tabs } from "@mantine/core";
import { Link } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import useSortData from "../hooks/useSortData";

const CategoryPage = () => {
  const { dataBase, category, dataCategories } = useLoaderData();
  const sortedCategories = useSortData(dataCategories, "position");
  const [activeTab, setActiveTab] = useState(
    dataCategories ? dataCategories[0].name : undefined
  );
  const sortedData = useSortData(dataBase, "position");

  const filteredData = dataBase.filter((item) => {
    if (activeTab === item.category) {
      return item;
    }
  });
  const sortedDataA = useSortData(filteredData, "position");

  console.log(dataBase);
  console.log(sortedCategories);

  return (
    <>
      {category === "alcohol" || category === "napitki" ? (
        <Tabs
          color="yellow"
          variant="pills"
          value={activeTab}
          onTabChange={setActiveTab}
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
                      <Card
                        key={index}
                        shadow="sm"
                        padding="xl"
                        radius="lg"
                        component={Link}
                        to={`${item.link}`}
                      >
                        <Card.Section>
                          <Image
                            src={item.image}
                            height={160}
                            fit={category === "alcohol" ? "contain" : "cover"}
                            alt={item.name}
                          />
                        </Card.Section>
                        <Text mt="xs" size="lg">
                          {itemVariants[0].price} руб.
                        </Text>

                        <Text weight={500} size="lg" mt="md">
                          {item.name}
                        </Text>
                        <Button mt="sm" variant="default" fullWidth>
                          Выбрать
                        </Button>
                      </Card>
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
              <Card
                key={index}
                shadow="sm"
                padding="xl"
                radius="lg"
                component={Link}
                to={`${item.link}`}
              >
                <Card.Section>
                  <Image
                    src={item.image}
                    height={160}
                    alt={item.name}
                    fit={category === "napitki" ? "contain" : "cover"}
                  />
                </Card.Section>
                <Text mt="xs" size="lg">
                  {itemVariants[0].price} руб.
                </Text>

                <Text weight={500} size="lg" mt="md">
                  {item.name}
                </Text>
                <Button mt="sm" variant="default" fullWidth>
                  Выбрать
                </Button>
              </Card>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
};

const categoryLoader = async ({ params }) => {
  const category = params.category;
  const dbRef = ref(getDatabase());
  let dataBase;
  let dataCategories;
  await get(child(dbRef, `menu/${category}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        return data;
      } else {
        console.log("No data available");
      }
    })
    .then((data) => {
      dataBase = data;
    })
    .catch((error) => {
      console.error(error);
    });
  if (category === "alcohol" || category === "napitki") {
    await get(child(dbRef, `/categories-${category}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          return data;
        } else {
          console.log("No data available");
        }
      })
      .then((data) => {
        dataCategories = data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return { dataBase, category, dataCategories };
};

export { CategoryPage, categoryLoader };
