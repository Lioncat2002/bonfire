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

type TradeCardProps = {
  selectedPair?: Pool;
};

export function TradeCard(props: TradeCardProps) {
  const [inAmt, setInAmt] = useState(0.0);
  const [outAmt, setOutAmt] = useState(0.0);
  const [slippage, setSlippage] = useState(10);

  const debouncedAmt = useDebounce(inAmt, 800);

  // Fetch quote when debouncedAmt changes
  useEffect(() => {
    if (!props.selectedPair || debouncedAmt <= 0) return;

    async function fetchQuote() {
      const quoteData: QuoteData = {
        inputMint: props.selectedPair?.mintAAddress!,
        outputMint: props.selectedPair?.mintBAddress!,
        slippage,
        amount: (
          debouncedAmt * Math.pow(10, props.selectedPair?.mintADecimals!)
        ).toString(),
      };

      try {
        const response = await getQuote(quoteData);
        setOutAmt(parseFloat(response.outAmount) / Math.pow(10, props.selectedPair?.mintBDecimals!));
      } catch (err) {
        console.error("Quote fetch failed", err);
        setOutAmt(0);
      }
    }

    fetchQuote();
  }, [debouncedAmt, props.selectedPair, slippage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>SWAP</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4">
        {/* FROM Block */}
        <div>
          <Label htmlFor="inputAmt" className="mb-1 block text-sm text-muted-foreground">
            FROM
          </Label>
          <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition focus-within:ring-2 focus-within:ring-black">
            <input
              id="inputAmt"
              type="number"
              inputMode="decimal"
              className="flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-gray-400"
              placeholder="0.0"
              value={inAmt}
              onChange={(e) => setInAmt(parseFloat(e.target.value))}
            />
            <div className="text-right text-sm font-semibold text-black">
              {props.selectedPair?.mintASymbol}
            </div>
          </div>
        </div>

        <div className="flex justify-center text-gray-400">
          <ArrowDownUp size={16} />
        </div>

        {/* TO Block */}
        <div>
          <Label htmlFor="outAmt" className="mb-1 block text-sm text-muted-foreground">
            TO
          </Label>
          <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition focus-within:ring-2 focus-within:ring-black">
            <input
              id="outAmt"
              type="number"
              inputMode="decimal"
              className="flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-gray-400"
              placeholder="0.0"
              value={outAmt}
              readOnly
            />
            <div className="text-right text-sm font-semibold text-black">
              {props.selectedPair?.mintBSymbol}
            </div>
          </div>
        </div>

        {/* Slippage */}
        <SlippageSlider slippage={slippage} onChange={setSlippage} />

        <Button className="mt-2 h-12 rounded-xl text-md font-semibold transition active:scale-95 duration-150 ease-in-out">
          SWAP
        </Button>
      </CardContent>
    </Card>
  );
}
