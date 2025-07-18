"use client";
import { useState } from "react";
import { NavBar } from "@/components/custom/NavBar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenCreator } from "@/components/custom/TokenCreatorForm";
import { BuyTokenOnCreateDialog } from "@/components/custom/BuyTokenOnCreate";

interface TokenData {
  name: string;
  symbol: string;
  description: string;
  telegramLink?: string | undefined;
  twitterLink?: string | undefined;
  websiteLink?: string | undefined;
  discordLink?: string | undefined;
  tokenImage?: any;
}

const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  description: z.string().min(10, "Description is required"),
  telegramLink: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .pipe(z.url("Invalid telegram URL").optional()),
  twitterLink: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .pipe(z.url("Invalid twitter URL").optional()),
  websiteLink: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .pipe(z.url("Invalid website URL").optional()),
  discordLink: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .pipe(z.url("Invalid discord URL").optional()),
  tokenImage: z.any().optional(),
});

export default function LaunchPage() {
  const [open, setOpen] = useState(false);
  const [tokenData, setTokenData] = useState<TokenData>();
  const [tokenAmount, setTokenAmount] = useState("0.0");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
      telegramLink: "",
      twitterLink: "",
      websiteLink: "",
      discordLink: "",
      tokenImage: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    setTokenData(values);
    setOpen(true);
  }

  return (
    <div className=" min-h-screen">
      <NavBar />
      <p className="flex justify-center text-2xl font-semibold my-6">
        CREATE A COIN
      </p>

      <TokenCreator form={form} onSubmit={onSubmit} />

      <BuyTokenOnCreateDialog
        open={open}
        setOpen={setOpen}
        tokenAmount={tokenAmount}
        setTokenAmount={setTokenAmount}
        tokenData={tokenData}
      />
    </div>
  );
}
