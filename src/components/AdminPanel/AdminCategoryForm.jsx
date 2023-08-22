import { useForm, isNotEmpty } from "@mantine/form";
import { TextInput, NumberInput, Group, Checkbox, Button } from "@mantine/core";
import writeToDatabase from "../../helpers/writeToDataBase";
import submitChangeDataBase from "../../helpers/submitChangeDataBase";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { closeModal } from "../../store/editSlice";
import { useEffect } from "react";

const AdminCategoryForm = () => {
  const { categoryElement } = useParams();
  const edit = useSelector((state) => state.edit.edit);
  const editData = useSelector((state) => state.edit.editData);
  const editUuid = useSelector((state) => state.edit.editUuid);
  const dispatch = useDispatch();

  useEffect(() => {
    if (edit) {
      form.setValues({
        name: editData.name,
        link: editData.link,
        position: editData.position,
        image: editData.image,
        visible: editData.visible,
        delivery: editData.delivery,
      });
    }
  }, [edit]);
  const form = useForm({
    initialValues: {
      name: "",
      link: "",
      position: 0,
      image: "",
      visible: false,
      delivery: false,
    },
    validate: {
      link: isNotEmpty("Поле не должно быть пустым"),
    },
  });

  return (
    <form
      onSubmit={
        !edit
          ? form.onSubmit((values) =>
              writeToDatabase(
                `/${categoryElement}/${values.link}`,
                { ...values },
                form.reset,
                () => dispatch(closeModal()),
                false
              )
            )
          : form.onSubmit((values) => {
              submitChangeDataBase(
                values,
                `/${categoryElement}/${values.link}`,
                editUuid,
                form.reset,
                () => dispatch(closeModal())
              );
            })
      }
    >
      <TextInput
        placeholder="Название катерогии"
        label="Название категории"
        withAsterisk
        {...form.getInputProps("name")}
      />
      <TextInput
        placeholder="Ссылка для меню"
        label="Ссылка для меню"
        withAsterisk
        disabled={edit ? true : false}
        {...form.getInputProps("link")}
      />
      <NumberInput
        placeholder="Позиция для сортировки"
        label="Позиция для сортировки"
        {...form.getInputProps("position")}
      />
      <TextInput
        label="Картинка"
        placeholder="Картинка"
        {...form.getInputProps("image")}
      />
      <Group>
        <Checkbox
          mt="xs"
          size="md"
          label="Скрыть"
          {...form.getInputProps("visible", { type: "checkbox" })}
        />
        <Checkbox
          mt="xs"
          size="md"
          label="Без доставки"
          {...form.getInputProps("delivery", { type: "checkbox" })}
        />
      </Group>
      <Button mt="md" type="submit">
        {edit ? "Сохранить" : "Отправить"}
      </Button>
    </form>
  );
};
export default AdminCategoryForm;
