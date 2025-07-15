"use client";

import { DataPage } from "@/components/custom/DataPage";
import { NavBar } from "@/components/custom/NavBar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="p-8">
      <Toaster />
      <NavBar />
      <DataPage />
      <footer className="w-[100%] text-center">
        <a
          className="underline"
          href="https://github.com/Lioncat2002/bonfire" target="_blank"
        >
          Check us out of github 🐰
        </a>
      </footer>
    </div>
  );
}
