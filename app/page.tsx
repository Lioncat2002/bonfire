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
      <footer><a href="https://github.com/Lioncat2002/bonfire">Check us out of github</a></footer>
    </div>
  );
}
