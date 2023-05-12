import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import MenuGridCategory from "../components/MenuGridCategory";
import useFetchData from "../hooks/useFetchData";
import { db } from "../firebase";
// import { ref, onValue } from "firebase/database";
import { Text } from "@mantine/core";
import { getDatabase, ref, child, get } from "firebase/database";

const CategoryPage = ({ variant }) => {
  // const { category, kind } = useParams();
  //const { dataItem, category } = useLoaderData();

  // const dataItem = data.filter((item) => {
  //   if (item.link === category) {
  //     return item;
  //   }
  // });
  // const sushiData = data.filter((item) => {
  //   if (item.link === kind) {
  //     return item.items;
  //   }
  // });
  return (
    <>
      {/* {dataItem.lenght === 0 ? <Text>Загрузка</Text> : <MenuGridCategory variant="price" categories={dataItem} />} */}
      {/* <MenuGridCategory variant="price" categories={dataItem} /> */}
    </>
  );
};

const categoryLoader = async ({ params }) => {
  const category = params.category;
  const dbRef = ref(getDatabase());
  get(child(dbRef, `menu/${category}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val())
        // console.log(Object.values(snapshot.val()));
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
    return null
  // async function categoriesFetch() {
  //   let data = [];
  //   await onValue(ref(db, `/menu/${category}`), (snapshot) => {
  //     data = Object.values(snapshot.val())
  //   })
  //   return data
  // }
  // const dataBase = await categoriesFetch()
  // const dataItem = await dataBase;

  // return { dataItem, category };
};

export { CategoryPage, categoryLoader };
