import { Control, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/shared';

interface CustomInputProps<TFieldValues extends FieldValues = FieldValues> {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  control: Control<TFieldValues> | any;
}

export const CustomInput = ({ name, label, type = 'text', placeholder, disabled, control }: CustomInputProps) => {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'password' ? (
              <PasswordInput {...field} placeholder={placeholder} disabled={disabled} className="input-class" />
            ) : (
              <Input {...field} type={type} placeholder={placeholder} disabled={disabled} className="input-class" />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
