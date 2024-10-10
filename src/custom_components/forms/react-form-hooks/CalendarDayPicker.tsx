import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
registerLocale('es', es);

import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { CommonInputI } from './interfaces/form-interface';

interface CalendarDayPickerProps extends CommonInputI {
  isLoading: boolean;
}
export function CalendarDayPicker({
  control,
  fieldName,
  label,
  placeholder,
}: CalendarDayPickerProps) {
  return (
    <div className={cn('')}>
      <FormField
        control={control}
        name={fieldName}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="block text-sm font-medium leading-6 text-gray-900 text-left">
              {label}
            </FormLabel>
            <div className="relative">
              <DatePicker
                locale="es"
                placeholderText={placeholder}
                selected={field.value || new Date()}
                dateFormat="dd/MM/yyyy"
                onChange={field.onChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              {/* <CalendarIcon className="absolute top-2 right-2 w-5 h-5 text-gray-400 pointer-events-none" /> */}
            </div>
            {/* {field.value && field.value} */}
          </FormItem>
        )}
      />
    </div>
  );
}
