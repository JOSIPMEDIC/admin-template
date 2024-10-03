import { Metadata } from "next";
import Link from "next/link";
import UserAuthForm from "@/components/forms/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden w-full h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r items-center justify-center">
        {/* LOGO  */}
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="fixed flex w-full justify-center mb-10 top-0 left-0 h-[30vh] items-center">
              {/* LOGO  */}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Unesite podatke za nastavak na kontrolnu ploču
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
