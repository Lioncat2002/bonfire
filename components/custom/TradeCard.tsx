"use client";
import { Pool } from "@/app/server/models/pool";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ArrowDownUp } from "lucide-react";
import { getQuote, QuoteData } from "@/app/client/getQuote";
import { useState } from "react";
import { SlippageSlider } from "./SlippageSlider";

type TradeCardProps = {
  selectedPair?: Pool;
};

export function TradeCard(props: TradeCardProps) {
  const [inAmt, setInAmt] = useState(0.0);
  const [outAmt, setOutAmt] = useState(0.0);
  const [slippage, setSlippage] = useState(10);
  async function tradeQuote() {
    let data: QuoteData = {
      inputMint: props.selectedPair?.mintAAddress!,
      outputMint: props.selectedPair?.mintBAddress!,
      slippage: 50,
      amount: (
        inAmt * Math.pow(10, props.selectedPair?.mintADecimals!)
      ).toString(),
    };
    const response = await getQuote(data);
    setOutAmt(response.outAmount);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>SWAP</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4">
        {/* FROM BLOCK */}
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
              placeholder="0.0"
              value={inAmt}
              onChange={(e) => {
                setInAmt(parseFloat(e.target.value));
                setTimeout(tradeQuote, 1000);
              }}
            />
            <div className="text-right text-sm font-semibold text-black">
              {props.selectedPair?.mintASymbol}
            </div>
          </div>
        </div>

        <div className="flex justify-center text-gray-400">
          <ArrowDownUp size={16} />
        </div>

        {/* TO BLOCK */}
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
              placeholder="0.0"
              min={0.0}
              value={outAmt}
              onChange={(e) => setOutAmt(parseFloat(e.target.value))}
            />
            <div className="text-right text-sm font-semibold text-black">
              {props.selectedPair?.mintBSymbol}
            </div>
          </div>
        </div>

        {/* SLIPPAGE & BUTTON */}
        <SlippageSlider slippage={slippage} onChange={setSlippage} />

        <Button className="mt-2 h-12 rounded-xl text-md font-semibold transition active:scale-95 duration-150 ease-in-out">
          SWAP
        </Button>
      </CardContent>
    </Card>
  );
}
