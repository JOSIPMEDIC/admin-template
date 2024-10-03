"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useCreateData from "@/hooks/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import TextInput from "./controlled-fields/textInput";
import { useToast } from "../ui/use-toast";
import React from "react";

const formSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, { message: "Lozinka je prekratka" })
    .max(32, { message: "Lozinka je predugačka" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { toast } = useToast();
  const { mutate, isPending } = useCreateData<UserFormValue>({
    resource: "auth/login",
  });
  const router = useRouter();

  const defaultValues = {
    username: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data.token) {
          form.reset();
          typeof window !== "undefined" &&
            localStorage.setItem("token", data.token);
          router.push("/dashboard/tasks");
        } else {
          toast({
            title: "Unešeni krivi podatci",
            variant: "destructive",
          });
        }
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <TextInput name="username" label="Korisničko ime" />
          <TextInput name="password" label="Lozinka" type="password" />
          <Button
            disabled={isPending}
            className="w-full"
            style={{ marginTop: "1rem" }}
            type="submit"
          >
            Potvrdi podatke
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </>
  );
}
