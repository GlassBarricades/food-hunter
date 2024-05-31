import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  Group,
  SegmentedControl,
  Text,
  Stack,
  TextInput,
  Textarea,
  Button,
  Modal
} from "@mantine/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetOrder } from "../../store/orderSlice";

const OrderForm = () => {
  const productsArr = useSelector((state) => state.productsArr.productsArr);
  const productQuantity = useSelector(
    (state) => state.productQuantity.productQuantity
  );
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [variant, setVariant] = useState("2202");
  const [paymentType, setPaymentType] = useState("1");
  const [table, setTable] = useState("4566");

  const arrOrder = productsArr.map((item) => {
    return item.id;
  });

  const arrOrderQuantity = productQuantity.map((item) => {
    return `${item.quantity}`;
  });

  const form = useForm({
    initialValues: {
      product: [],
      product_kol: [],
      name: "",
      phone: "",
      street: "",
      house: "",
      apart: "",
      descr: "",
      tags: [],
    },
    validate: {
      name: hasLength({ max: 50 }, "Имя должно быть до 50 символов длинной"),
      phone:
        isNotEmpty("Введите корректный номер телефона") &&
        hasLength({ min: 7, max: 15 }, "Введите корректный номер телефона"),
      descr: hasLength({ max: 100 }, "Длинна комментария до 100 символов"),
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title=" " centered>
        <Text align="center" color="yellow" size={45}>
          Спасибо!
        </Text>
        <Text align="center" color="yellow" size={21}>
          Ваш заказ отправлен. Ожидайте звонок администратора.
        </Text>
      </Modal>
      <form
        id="formOrder"
        onSubmit={form.onSubmit((values) => {
          fetch("sendOrder.php", {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-type":
                "application/x-www-form-urlencoded; application/json; charset=UTF-8",
            },
            body: "paramm=" + JSON.stringify(values),
          }).then((response) => {
            if (response.ok) {
              dispatch(resetOrder())
              open()
              form.reset()
            } else {
              alert("Ошибка HTTP: " + response.status);
            }
          })
        })}
      >
        <Group>
          <SegmentedControl
            value={variant}
            onChange={setVariant}
            data={[
              { label: "Доставка", value: "2202" },
              { label: "Самовынос", value: "2294" },
              {
                label: "За столом",
                value: "234756345986459867459687495684",
              },
            ]}
          />
          {variant === "2294" ? (
            <Text>Адрес: проспект Ленина, 15Б</Text>
          ) : undefined}
          {variant === "234756345986459867459687495684" ? (
            <Stack spacing="xs">
              <Text>Выбор столика:</Text>
              <SegmentedControl
                mt="sm"
                value={table}
                onChange={setTable}
                data={[
                  { label: "Стол №1", value: "4566" },
                  { label: "Стол №2", value: "5052" },
                  { label: "Стол №3", value: "5053" },
                ]}
              />
              <SegmentedControl
                mt="sm"
                value={table}
                onChange={setTable}
                data={[
                  { label: "Стол №4", value: "5054" },
                  { label: "Стол №5", value: "5055" },
                ]}
              />
            </Stack>
          ) : undefined}
        </Group>
        <SegmentedControl
          mt="sm"
          value={paymentType}
          onChange={setPaymentType}
          data={[
            { label: "Наличными", value: "1" },
            { label: "Картой", value: "2" },
          ]}
        />
        <TextInput
          placeholder="Имя"
          label="Имя"
          name="name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <TextInput
          placeholder="Телефон"
          label="Телефон"
          {...form.getInputProps("phone")}
          withAsterisk
        />
        {variant === "2202" ? (
          <>
            <TextInput
              placeholder="Улица"
              label="Улица"
              name="street"
              {...form.getInputProps("street")}
            />
            <TextInput
              placeholder="Дом"
              label="Дом"
              name="house"
              {...form.getInputProps("house")}
            />
            <TextInput
              placeholder="Квартира"
              label="Квартира"
              name="apart"
              {...form.getInputProps("apart")}
            />
          </>
        ) : undefined}
        <Textarea
          label="Комментарий к заказу"
          placeholder="Комментарий к заказу"
          name="descr"
          {...form.getInputProps("descr")}
          autosize
          minRows={2}
          maxRows={4}
        />
        <Button
          mt="md"
          type="submit"
          onClick={() =>
            form.setValues({
              product: arrOrder,
              product_kol: arrOrderQuantity,
              tags:
                variant === "234756345986459867459687495684"
                  ? [table]
                  : [variant],
              pay: paymentType,
            })
          }
        >
          Отправить заказ
        </Button>
      </form>
    </>
  );
};
export default OrderForm;
