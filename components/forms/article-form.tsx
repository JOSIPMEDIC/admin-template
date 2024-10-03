"use client";
import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useToast } from "../ui/use-toast";
import TextInput from "./controlled-fields/textInput";
import SelectInput from "./controlled-fields/selectInput";
import useCreateData from "@/hooks/useCreateData";
import useGetData from "@/hooks/useGetData";
import useUpdateData from "@/hooks/useUpdateData";
import React from "react";

const formSchema = z.object({
  name: z.string().min(3, { message: "Naziv mora biti minimalno tri znaka" }),
  description: z
    .string()
    .min(3, { message: "Opis mora biti minimalno tri znaka" }),
  category: z.string(),
  unit: z.string({
    required_error: "Obavezno polje",
    invalid_type_error: "Obavezno polje",
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const title = params?.articleId !== "new" ? "Uredi artikl" : "Kreiraj artikl";
  const toastMessage =
    params?.articleId !== "new"
      ? "Proizvod uspješno uređen."
      : "Proizvod uspješno kreiran.";

  const { mutate, isPending } = useCreateData({
    resource: "items",
  });

  const { mutate: update, isPending: updateIsPending } = useUpdateData({
    resource: "items",
  });

  const { data, isLoading } = useGetData({
    resource: `items/${params?.articleId}`,
    enabled: params?.articleId !== "new",
  });

  const loading = isPending || updateIsPending || isLoading;

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        count: null,
        unit: "Kg",
        category: undefined,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    params.articleId === "new"
      ? mutate(data, {
          onSuccess: () => {
            toast({
              title: toastMessage,
              variant: "success",
            });
            router.push("/dashboard/articles");
          },
        })
      : update(
          { data, id: params?.articleId as string }, //TODO test when rest data ready
          {
            onSuccess: () => {
              toast({
                title: toastMessage,
                variant: "success",
              });
              router.push("/dashboard/articles");
            },
          }
        );
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between ">
        <Heading title={title} description={""} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full lg:pr-28"
        >
          <div className="lg:gap-8 flex flex-col">
            <div className="gap-8 md:grid md:grid-cols-2">
              <TextInput
                name="name"
                label="Naziv"
                placeholder="Naziv proizvoda"
                loading={loading}
              />
              <TextInput
                name="unit"
                label="Mjerna jedinica"
                placeholder="Naziv mjerne jedinice"
                loading={loading}
              />
              <SelectInput
                name="category"
                label="Kategorija"
                placeholder="Odaberite kategoriju"
                loading={loading}
                options={[
                  { name: "Kava", id: "Kava" },
                  { name: "Čaše", id: "Čaše" },
                  { name: "Žličice", id: "Žličice" },
                ]}
              />
            </div>
            <TextInput
              textarea
              rows={5}
              name="description"
              label="Opis"
              placeholder="Opis proizvoda"
              loading={loading}
            />
          </div>
          <Button disabled={loading} className="ml-auto mt-8" type="submit">
            Spremi
          </Button>
        </form>
      </Form>
    </>
  );
};
