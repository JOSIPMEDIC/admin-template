import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import React from "react";
import { useFormContext } from "react-hook-form";

export type Option = {
  id: string | any;
  name: string;
};

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  loading?: boolean;
  error?: string;
  options: Option[];
  valueAsNumber?: boolean;
} & SelectProps;

const SelectInput = ({
  name,
  label,
  loading,
  options,
  error,
  placeholder,
  valueAsNumber = false,
  ...props
}: Props) => {
  const form = useFormContext();
  return (
    <FormField
      {...form}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              disabled={loading}
              onValueChange={(e) =>
                field.onChange(valueAsNumber ? Number(e) : e)
              }
              value={field.value}
              defaultValue={field.value}
              {...props}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={placeholder}
                    defaultValue={field.value}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
