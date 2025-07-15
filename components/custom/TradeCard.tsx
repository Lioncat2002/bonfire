"use client";
import { useEffect, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { Pool } from "@/app/server/models/pool";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { getQuote, QuoteData } from "@/app/client/getQuote";
import { SlippageSlider } from "./SlippageSlider";
import { useDebounce } from "@/app/client/DebouceHook";
import { BuildSwapTransaction, SendSwapTransaction } from "@/app/client/swap";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";

type TradeCardProps = {
  selectedPair?: Pool;
};

export function TradeCard(props: TradeCardProps) {
  const [inAmt, setInAmt] = useState(0.0);
  const [outAmt, setOutAmt] = useState(0.0);
  const [slippage, setSlippage] = useState(10);
  const [isReversed, setIsReversed] = useState(false);
  const [quote, setQuote] = useState({});
  const { publicKey, sendTransaction, signTransaction } =
    useWallet();

  const debouncedAmt = useDebounce(inAmt, 800);

  useEffect(() => {
    if (!props.selectedPair || debouncedAmt <= 0) return;
    
    async function fetchQuote() {
      if (!props.selectedPair) return;
      const inputMint = isReversed
        ? props.selectedPair.mintBAddress
        : props.selectedPair.mintAAddress;
      const outputMint = isReversed
        ? props.selectedPair.mintAAddress
        : props.selectedPair.mintBAddress;

      const inputDecimals = isReversed
        ? props.selectedPair.mintBDecimals
        : props.selectedPair.mintADecimals;
      const outputDecimals = isReversed
        ? props.selectedPair.mintADecimals
        : props.selectedPair.mintBDecimals;

      const quoteData: QuoteData = {
        inputMint,
        outputMint,
        slippage,
        amount: (debouncedAmt * Math.pow(10, inputDecimals)).toString(),
      };

      try {
        const response = await getQuote(quoteData);
        setOutAmt(
          parseFloat(response.outAmount) / Math.pow(10, outputDecimals)
        );
        setQuote(response);
      } catch (err) {
        console.error("Quote fetch failed", err);
        toast.error("failed fetching quote");
        setOutAmt(0);
      }
    }

    fetchQuote();
  }, [debouncedAmt, props.selectedPair, slippage, isReversed]);

  async function executeSwap() {
    const quoteStr = JSON.stringify(quote);
    if(!publicKey)
      return;
    const response = await BuildSwapTransaction(
      quoteStr,
      publicKey.toString()
    );
    await SendSwapTransaction(response, signTransaction, sendTransaction);
  }

  const inputSymbol = isReversed
    ? props.selectedPair?.mintBSymbol
    : props.selectedPair?.mintASymbol;
  const outputSymbol = isReversed
    ? props.selectedPair?.mintASymbol
    : props.selectedPair?.mintBSymbol;

  return (
    <Card>
      <CardHeader>
        <CardTitle>SWAP</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4">
        {/* FROM Block */}
        <div>
          <Label
            htmlFor="inputAmt"
            className="mb-1 block text-sm text-muted-foreground"
          >
            FROM
          </Label>
          <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition focus-within:ring-2 focus-within:ring-black">
            <input
              id="inputAmt"
              type="number"
              inputMode="decimal"
              className="flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-gray-400"
              placeholder="0"
              value={isNaN(inAmt) ? "0" : inAmt}
              onChange={(e) => setInAmt(parseFloat(e.target.value))}
            />
            <div className="text-right text-sm font-semibold text-black">
              {inputSymbol}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center text-gray-400">
          <button
            onClick={() => {
              setIsReversed((prev) => !prev);
              setOutAmt(0); // reset output when tokens are switched
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowDownUp size={16} />
          </button>
        </div>

        {/* TO Block */}
        <div>
          <Label
            htmlFor="outAmt"
            className="mb-1 block text-sm text-muted-foreground"
          >
            TO
          </Label>
          <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition focus-within:ring-2 focus-within:ring-black">
            <input
              id="outAmt"
              type="number"
              inputMode="decimal"
              className="flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-gray-400"
              placeholder="0"
              value={isNaN(outAmt) ? "0" : outAmt}
              readOnly
            />
            <div className="text-right text-sm font-semibold text-black">
              {outputSymbol}
            </div>
          </div>
        </div>

        {/* Slippage */}
        <SlippageSlider slippage={slippage} onChange={setSlippage} />

        <Button onClick={executeSwap} className="mt-2 h-12 rounded-xl text-md font-semibold transition active:scale-95 duration-150 ease-in-out">
          SWAP
        </Button>
      </CardContent>
    </Card>
  );
}
