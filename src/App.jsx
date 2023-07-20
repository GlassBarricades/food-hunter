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
import OrderPage from "./pages/OrderPage";
import AdminLayout from "./components/AdminLayout";
import AdminMain from "./components/AdminPanel/AdminMain";
import AdminCategory from "./components/AdminPanel/AdminCategory";
import { set, ref, remove } from "firebase/database";
import { db } from "./firebase";
import useFetchData from "./hooks/useFetchData";
import "./app.css";
import AdminUnits from "./components/AdminPanel/AdminUnits";
import ContactPage from "./pages/ContactPage";
import { PromotionPage, promoLoader } from "./pages/PromotionPage";
import PromotionAdmin from "./components/AdminPanel/PromotionAdmin";

const App = () => {
  // const [orderLocal, setOrderLocal] = useLocalStorage({
  //   key: "order",
  //   defaultValue: [],
  // });
  // const [productsArray, setProductsArray] = useState([]);
  // const [productsKolArr, setProductsKolArr] = useState([]);
  const [links, loading] = useFetchData("/categories/");

  // function deleteOrder(id) {
  //   setOrderLocal(orderLocal.filter((el) => el.orderUuid !== id));
  // }

  // function addToOrder(item, variant, price, id, value, setValue) {
  //   // setProductsArray([...productsArray, id]);
  //   // setProductsKolArr([...productsKolArr, String(value)]);
  //   let obj = { ...item };
  //   obj.quantity = value;
  //   obj.variantOrder = variant;
  //   obj.orderId = id;
  //   obj.priceOrder = price;
  //   obj.orderUuid = uid();
  //   // setOrderValue([...orderValue, obj])
  //   setOrderLocal([...orderLocal, obj]);
  //   if (typeof setValue === "object") {
  //     setValue.set(0);
  //   } else {
  //     setValue(1);
  //   }
  // }

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

  // const getWeekDay = (date) => {
  //   const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  //   return days[date.getDay()];
  // }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<LayoutPage />}
        >
          <Route index element={<HomePage categories={links} />} />
          <Route
            path="/order"
            element={
              <OrderPage
                // productsArray={productsArray}
                // setProductArray={setProductsArray}
                // productsKolArr={productsKolArr}
                // setProductsKolArr={setProductsKolArr}
              />
            }
          />
          <Route path="/contacts" element={<ContactPage />} />
          <Route
            path="/stock"
            element={<PromotionPage />}
            loader={promoLoader}
          />
          <Route path="menu" element={<MenuPage />}>
            <Route index element={<MenuGridCategory categories={links} />} />
            <Route
              path=":category"
              element={<CategoryPage />}
              loader={categoryLoader}
            />
            <Route
              path=":category/tabs/:tabValue"
              element={<CategoryPage />}
              loader={categoryLoader}
            />
            <Route
              path=":category/:product"
              element={<ProductPage />}
              loader={productLoader}
            />
            <Route
              path=":category/tabs/:tabValue/:product"
              element={<ProductPage />}
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
            path="category/:categoryElement"
            element={
              <AdminCategory
                writeToDatabase={writeToDatabase}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path="units"
            element={<AdminUnits writeToDatabase={writeToDatabase} />}
          />
          <Route
            path="promo"
            element={<PromotionAdmin writeToDatabase={writeToDatabase} />}
          />
        </Route>
      </>
    )
  );

  return (
      <RouterProvider router={router}></RouterProvider>
  );
};
export default App;
