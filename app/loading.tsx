import React from "react";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-background w-screen h-screen flex items-center justify-center">
      <Loader className="animate-spin w-10 h-10" />
    </div>
  );
}
