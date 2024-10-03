import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  loading?: boolean;
  error?: string;
  textarea?: boolean;
} & InputProps &
  TextareaProps;

const TextInput = ({
  name,
  label,
  loading,
  error,
  placeholder,
  textarea,
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
            {textarea ? (
              <Textarea
                disabled={loading}
                placeholder={placeholder}
                {...field}
                {...props}
              />
            ) : (
              <Input
                disabled={loading}
                placeholder={placeholder}
                {...field}
                {...props}
                {...(props.type === "number" && {
                  onChange: (e) => field.onChange(Number(e.target.value)),
                })}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
