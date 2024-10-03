import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Shadcn",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} lg:overflow-hidden relative`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <NextTopLoader showSpinner={false} />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
