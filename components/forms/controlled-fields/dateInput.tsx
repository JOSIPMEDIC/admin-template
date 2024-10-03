import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Calendar, CalendarProps } from "@/components/ui/calendar";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  loading?: boolean;
  error?: string;
  textarea?: boolean;
} & CalendarProps;

const DateInput = ({
  name,
  label,
  loading,
  error,
  placeholder,
  textarea,
  ...props
}: Props) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  return (
    <FormField
      {...form}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(new Date(field.value), "dd.MM.yyyy.")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(e) => {
                    setOpen(false);
                    return field.onChange(
                      e ? format(new Date(e), "yyyy-MM-dd") : e
                    );
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateInput;
