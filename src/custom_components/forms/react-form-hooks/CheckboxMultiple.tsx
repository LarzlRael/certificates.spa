import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CommonInputI, CheckboxInterface } from "./interfaces/form-interface";

interface CheckboxMultipleProps extends CommonInputI {
  isLoading: boolean;
  items: CheckboxInterface[];
}
export const CheckboxMultiple = ({
  control,
  fieldName,
  label,
  items,
  description,
  isLoading,
}: CheckboxMultipleProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      disabled={isLoading}
      render={() => (
        <FormItem>
          <div className='mb-4'>
            <FormLabel className='text-base'>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          {items.map((item) => (
            <FormField
              key={item.id}
              control={control}
              name={fieldName} // Usamos fieldName para guardar el valor correctamente en el form
              render={({ field }) => {
                const currentValue = field.value ?? []; // Aseguramos que `field.value` sea un array
                const isChecked = currentValue.includes(item.id) || item.checked;

                return (
                  <FormItem
                    key={item.id}
                    className='flex flex-row items-start space-x-3 space-y-0'
                  >
                    <FormControl>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            // Agregamos el item.id al array si el checkbox está marcado
                            field.onChange([...currentValue, item.id]);
                          } else {
                            // Filtramos para remover el item.id si el checkbox está desmarcado
                            field.onChange(
                              currentValue.filter((value) => value !== item.id)
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel className='text-sm font-normal'>
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
