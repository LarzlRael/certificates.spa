import { z } from "zod";
import { GlobalFormHook } from "@/custom_components/forms/react-form-hooks/GlobalFormHook";
import {
  CheckboxInterface,
  InputJsonI,
} from "@/custom_components/forms/react-form-hooks/interfaces/form-interface";
import { SampleDatePicker } from "@/custom_components/forms/react-form-hooks/CalendarPickerYear";
import useAxiosQueryAuth from "@/hooks/useAuthAxiosQuery";
import { RolesInterface } from "@/interfaces/auth.interface";
import { useEffect,useState  } from "react";
import { isValidArray } from "@/utils/validation/validation";
import { mapAsCheckboxArray, UserRolesInterface } from "./dashboard/interfaces/roles.interface";

function inputJsonIGenerate(
  arrayCheckbox: CheckboxInterface[] = []
): InputJsonI[] {
  return [
    {
      fieldName: "items",
      inputType: "arrayCheckbox",
      placeholder: "checkText",
      label: "Array de checks",
      arrayCheckbox: arrayCheckbox,
    },
  ];
}

const formSchema = z.object({
  items: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

/* const data = {
  username: "Carlos123", // Este valor será utilizado si se proporciona
}; */

export const HomePage = () => {
  /* const inputJson: InputJsonI[] = [
    {
      fieldName: "items",
      inputType: "arrayCheckbox",
      placeholder: "checkText",
      label: "Array de checks",
      arrayCheckbox: [
        { label: "item1", id: 1, checked: true },
        { label: "item2", id: 2, checked: false },
        { label: "item3", id: 3, checked: false },
        { label: "item4", id: 4, checked: false },
      ],
    },
  ]; */

  const { data, isLoading } = useAxiosQueryAuth<UserRolesInterface[]>({
    url: "roles/get-roles-by-user/5",
    method: "GET",
  });
  const [arrayInput, setArrayInput] = useState<InputJsonI[]>(inputJsonIGenerate())
  useEffect(() => {
    if (isValidArray(data) && isLoading == false) {
      const mapped = mapAsCheckboxArray(data!)
      console.log(mapped)
      setArrayInput(inputJsonIGenerate(mapped))
    }
  }, [data, isLoading]);

  return (
    <div>
      <GlobalFormHook
        isLoading={false}
        titleButton='Enviar'
        formTitle='Formulario de prueba'
        onSubmit={(data) => console.log(data)}
        schema={formSchema}
        inputJson={arrayInput}
        /* data={data} // Aquí pasamos el objeto `data` */
      />

      <SampleDatePicker />
    </div>
  );
};
