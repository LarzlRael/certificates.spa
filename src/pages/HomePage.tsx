import { z } from "zod";
import { GlobalFormHook } from "@/custom_components/forms/react-form-hooks/GlobalFormHook";
import { InputJsonI } from "@/custom_components/forms/react-form-hooks/interfaces/form-interface";
import { SampleDatePicker } from "@/custom_components/forms/react-form-hooks/CalendarPickerYear";
import useAxiosQueryAuth from "@/hooks/useAuthAxiosQuery";
import { RolesInterface } from "@/interfaces/auth.interface";

const formSchema = z.object({
  items: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

/* const data = {
  username: "Carlos123", // Este valor será utilizado si se proporciona
}; */

export const HomePage = () => {
  const inputJson: InputJsonI[] = [
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
  ];
  const { data: dataRoles, isLoading } = useAxiosQueryAuth<RolesInterface[]>({
    url: "roles/all-mapped-roles",
    method: "GET",
  });

  return (
    <div>
      <GlobalFormHook
        isLoading={false}
        titleButton='Enviar'
        formTitle='Formulario de prueba'
        onSubmit={(data) => console.log(data)}
        schema={formSchema}
        inputJson={inputJson}
        /* data={data} // Aquí pasamos el objeto `data` */
      />

      <SampleDatePicker />
    </div>
  );
};
