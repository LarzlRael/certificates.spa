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
      render={({ field }) => (
        <FormItem>
          <div className='mb-4'>
            <FormLabel className='text-base'>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          {items.map((item) => {
            // Esto está correctamente enlazado con el estado del form, no usamos `item.checked` aquí.
            const currentValue = field.value ?? [];
            const isChecked = currentValue.includes(item.id);

            return (
              <FormField
                key={item.id}
                control={control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...currentValue, item.id]
                            : currentValue.filter(
                                (value: number) => value !== item.id
                              );
                          field.onChange(newValue); // Actualizamos el valor en el form
                        }}
                      />
                    </FormControl>
                    <FormLabel className='text-sm font-normal'>
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            );
          })}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
