import { useForm, isNotEmpty } from "@mantine/form";
import { TextInput, NumberInput, Group, Checkbox, Button } from "@mantine/core";
import writeToDatabase from "../../helpers/writeToDataBase";
import submitChangeDataBase from "../../helpers/submitChangeDataBase";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { closeModal } from "../../store/editSlice";

const AdminCategoryForm = () => {
  const { categoryElement, subelement, subcategory } = useParams();
  const edit = useSelector((state) => state.edit.edit);
  const editData = useSelector((state) => state.edit.editData);
  const editUuid = useSelector((state) => state.edit.editUuid);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      link: "",
      position: 0,
      image: "",
      visible: false,
      delivery: false,
      subsection: false,
      verticalImage: false
    },
    validate: {
      link: isNotEmpty("Поле не должно быть пустым"),
    },
  });

  useEffect(() => {
    if (edit) {
      form.setValues({
        name: editData.name,
        link: editData.link,
        position: editData.position,
        image: editData.image,
        visible: editData.visible,
        delivery: editData.delivery,
        subsection: editData.subsection,
        verticalImage: editData.verticalImage
      });
    }
  }, [edit]);

  const handleSubmit = useCallback((values) => {
    const path = !subcategory ? `/${categoryElement}/${values.link}` : `/${subcategory}/${subelement}/${values.link}`;

    if (edit) {
      submitChangeDataBase(
        values,
        path,
        editUuid,
        form.reset,
        () => dispatch(closeModal())
      );
    } else {
      writeToDatabase(
        path,
        { ...values },
        form.reset,
        () => dispatch(closeModal()),
        false
      );
    }
  }, [categoryElement, subcategory, subelement, edit, editUuid, form, dispatch]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
        <Checkbox
          mt="xs"
          size="md"
          label="Вертикальные картинки"
          {...form.getInputProps("verticalImage", { type: "checkbox" })}
        />
        {!subcategory ? 
        <Checkbox
          mt="xs"
          size="md"
          label="Включает подразделы"
          {...form.getInputProps("subsection", { type: "checkbox" })}
        /> : undefined}

      </Group>
      <Button mt="md" type="submit">
        {edit ? "Сохранить" : "Отправить"}
      </Button>
    </form>
  );
};

export default AdminCategoryForm;