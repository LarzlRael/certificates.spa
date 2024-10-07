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
import { isValidArray } from "@/utils/validation/validation";

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
      render={({ field }) => {
        // Obtener el valor actual (IDs seleccionados) o filtrar por `checked`
        const currentValue = isValidArray(field.value)
          ? field.value
          : items.filter(item => item.checked).map(item => item.id);

        return (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">{label}</FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
            </div>

            {items.map(item => {
              const isChecked = currentValue.includes(item.id);

              return (
                <FormField
                key={item.id}
                control={control}
                name="items"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                       <FormControl>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={checked => {
                      // Actualiza el array del valor en el formulario
                      const newValue = checked
                        ? [...currentValue, item.id]
                        : currentValue.filter(id => id !== item.id);
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
              );
            })}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
