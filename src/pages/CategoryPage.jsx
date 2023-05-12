import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import MenuGridCategory from "../components/MenuGridCategory";
import useFetchData from "../hooks/useFetchData";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const CategoryPage = ({ variant }) => {
  // const { category, kind } = useParams();
  const { dataItem, category } = useLoaderData();
  console.log(dataItem);

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
    <>{/* <MenuGridCategory variant="price" categories={dataItem} /> */}</>
  );
};

const categoryLoader = async ({ params }) => {
  const category = params.category;
  let data = [];
  function fetchData() {
    
  }
  const categories = await onValue(ref(db, `/menu/${category}`), (snapshot) => {
    data = Object.values(snapshot.val());
  });
  const dataItem = await data;

  return { dataItem, category };
};

export { CategoryPage, categoryLoader };
