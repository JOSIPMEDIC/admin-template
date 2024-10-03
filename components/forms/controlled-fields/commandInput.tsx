import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover-sec";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { SelectProps } from "@radix-ui/react-select";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
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

const CommandSelectInput = ({
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
  const [open, setOpen] = useState(false);

  return (
    <FormField
      {...form}
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={loading}>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={loading}
                  className="w-full justify-between font-normal"
                >
                  {field.value
                    ? options.find((item) => item.id === field.value)?.name
                    : placeholder}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-full min-w-96 p-0"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Command disablePointerSelection>
                <CommandList>
                  <CommandInput placeholder="Pretraži..." />
                  <CommandEmpty>Nema pronađenih rezultata</CommandEmpty>
                  <CommandGroup>
                    {options.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={(e) => {
                          field.onChange(item.id);
                          setOpen(false);
                        }}
                      >
                        {item.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            field.value === item.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CommandSelectInput;
