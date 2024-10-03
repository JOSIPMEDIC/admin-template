import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XCircle, ChevronDown, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  name: string;
  options: {
    name: string;
    id: any;
  }[];
  placeholder?: string;
  label?: string;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
  searchable?: boolean;
}

export const MultiSelectInput = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      name,
      options,
      variant,
      placeholder,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      searchable,
      label,
      ...props
    },
    ref
  ) => {
    const form = useFormContext();
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const toggleOption = (
      option: string,
      field: ControllerRenderProps<FieldValues, string>
    ) => {
      const newSelectedValues = field.value.includes(option)
        ? field.value.filter((value: any) => value !== option)
        : [...field.value, option];
      field.onChange(newSelectedValues);
    };

    const handleClear = () => {
      form.setValue(name, []);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const toggleAll = (field: ControllerRenderProps<FieldValues, string>) => {
      if (field.value.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.id);
        field.onChange(allValues);
      }
    };

    return (
      <FormField
        {...form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Popover
                open={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
                modal={modalPopover}
              >
                <PopoverTrigger asChild>
                  <Button
                    ref={ref}
                    {...props}
                    onClick={handleTogglePopover}
                    className={cn(
                      "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit",
                      className
                    )}
                  >
                    {field.value.length > 0 ? (
                      <div className="flex justify-between items-center w-full">
                        <div className="flex flex-wrap items-center">
                          {field.value.slice(0, maxCount).map((value: any) => {
                            const option = options.find((o) => o.id === value);
                            return (
                              <Badge
                                key={value}
                                className={cn(multiSelectVariants({ variant }))}
                              >
                                {option?.name}
                                <XCircle
                                  className="ml-2 h-4 w-4 cursor-pointer"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    toggleOption(value, field);
                                  }}
                                />
                              </Badge>
                            );
                          })}
                        </div>
                        <div className="flex items-center justify-between">
                          <XIcon
                            className="h-4 mx-2 cursor-pointer text-muted-foreground"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleClear();
                            }}
                          />
                          <Separator
                            orientation="vertical"
                            className="flex min-h-6 h-full"
                          />
                          <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full mx-auto">
                        <span className="text-muted-foreground mx-2">
                          {placeholder}
                        </span>
                        <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-full min-w-96 p-0"
                  align="start"
                  onEscapeKeyDown={() => setIsPopoverOpen(false)}
                >
                  <Command>
                    {searchable && <CommandInput placeholder="Pretraži..." />}
                    <CommandList>
                      <CommandEmpty>Nema pronađenih rezultata</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          key="all"
                          onSelect={() => toggleAll(field)}
                          className="cursor-pointer"
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              field.value.length === options.length
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </div>
                          <span>(Odaberi sve)</span>
                        </CommandItem>
                        {options.map((option) => {
                          const isSelected = field.value.includes(option.id);
                          return (
                            <CommandItem
                              key={option.id}
                              onSelect={() => toggleOption(option.id, field)}
                              className="cursor-pointer"
                            >
                              <div
                                className={cn(
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible"
                                )}
                              >
                                <CheckIcon className="h-4 w-4" />
                              </div>
                              <span>{option.name}</span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup>
                        <div className="flex items-center justify-between">
                          {field.value.length > 0 && (
                            <>
                              <CommandItem
                                onSelect={handleClear}
                                className="flex-1 justify-center cursor-pointer"
                              >
                                Obriši
                              </CommandItem>
                              <Separator
                                orientation="vertical"
                                className="flex min-h-6 h-full"
                              />
                            </>
                          )}
                          <CommandItem
                            onSelect={() => setIsPopoverOpen(false)}
                            className="flex-1 justify-center cursor-pointer max-w-full"
                          >
                            Zatvori
                          </CommandItem>
                        </div>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

MultiSelectInput.displayName = "MultiSelectInput";
