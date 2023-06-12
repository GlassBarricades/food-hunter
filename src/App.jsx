import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import { CategoryPage, categoryLoader } from "./pages/CategoryPage";
import { ProductPage, productLoader } from "./pages/ProductPage";
import MenuPage from "./pages/MenuPage";
import LayoutPage from "./components/LayoutPage";
import MenuGridCategory from "./components/MenuGridCategory";
import { useState } from "react";
import OrderPage from "./pages/OrderPage";
import AdminLayout from "./components/AdminLayout";
import AdminMain from "./components/AdminPanel/AdminMain";
import AdminMainAlcohol from "./components/AdminPanel/AdminMainAlcohol";
import AdminCategory from "./components/AdminPanel/AdminCategory";
import AdminCategoryAlcohol from "./components/AdminPanel/AdminCategorAlcohol";
import { set, ref, remove } from "firebase/database";
import { db } from "./firebase";
import useFetchData from "./hooks/useFetchData";
import "./app.css";
import AdminUnits from "./components/AdminPanel/AdminUnits";

const App = () => {
  const [order, setOrder] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [productsKolArr, setProductsKolArr] = useState([]);
  const [links, loading] = useFetchData("/categories/");

  function deleteOrder(id) {
    setOrder(order.filter((el) => el.uuid !== id));
  }

  function addToOrder(item, variant, price, id, value, setValue) {
    setProductsArray([...productsArray, id]);
    setProductsKolArr([...productsKolArr, String(value)]);
    let obj = { ...item };
    obj.quantity = value;
    obj.variantOrder = variant;
    obj.priceOrder = price;
    setOrder([...order, obj]);
    setValue(1);
  }

  const writeToDatabase = (link, data, reset, close) => (e) => {
    e.preventDefault();
    set(ref(db, link), {
      ...data,
    });

    reset();
    close();
  };

  const handleDelete = (link) => {
    remove(ref(db, link));
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<LayoutPage order={order} deleteOrder={deleteOrder} />}
        >
          <Route index element={<HomePage categories={links} />} />
          <Route
            path="/order"
            element={
              <OrderPage
                order={order}
                productsArray={productsArray}
                productsKolArr={productsKolArr}
              />
            }
          />
          <Route path="menu" element={<MenuPage />}>
            <Route index element={<MenuGridCategory categories={links} />} />
            <Route
              path=":category"
              element={<CategoryPage />}
              loader={categoryLoader}
            />
            <Route
              path=":category/:product"
              element={<ProductPage onAdd={addToOrder} />}
              loader={productLoader}
            />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout links={links} />}>
          <Route
            path=":adminElement"
            element={
              <AdminMain
                links={links}
                writeToDatabase={writeToDatabase}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path="category"
            element={
              <AdminCategory
                writeToDatabase={writeToDatabase}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path="category-alcohol"
            element={<AdminCategoryAlcohol writeToDatabase={writeToDatabase} />}
          />
          <Route
            path="alcohol"
            element={<AdminMainAlcohol writeToDatabase={writeToDatabase} />}
          />
          <Route
            path="units"
            element={<AdminUnits writeToDatabase={writeToDatabase} />}
          />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
