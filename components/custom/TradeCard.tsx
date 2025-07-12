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
  const [slippage, setSlippage] = useState(0.1);
  async function tradeQuote() {
    let data: QuoteData = {
      inputMint: props.selectedPair?.mintAAddress!,
      outputMint: props.selectedPair?.mintBAddress!,
      slippage: 50,
      amount: inAmt.toString(),
    };
    const response = await getQuote(data);
    setOutAmt(response.outAmount);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>SWAP</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Label>FROM</Label>
        <div className="p-2 flex flex-row space-x-2 text-md">
          <Input
            id="inputAmt"
            type="number"
            value={inAmt}
            onChange={(e) => setInAmt(parseFloat(e.target.value))}
          />{" "}
          <Label>{props.selectedPair?.mintASymbol}</Label>{" "}
        </div>
        <div className="flex flex-row justify-center">
          <ArrowDownUp size={15} />
        </div>
        <Label>TO</Label>
        <div className="p-2 flex flex-row space-x-2 text-md">
          <Input
            id="outAmt"
            value={outAmt}
            onChange={(e) => setOutAmt(parseFloat(e.target.value))}
            type="number"
          />{" "}
          <Label>{props.selectedPair?.mintBSymbol}</Label>{" "}
        </div>

        <SlippageSlider slippage={slippage} onChange={setSlippage}/>

        <Button className="transition active:scale-95 duration-150 ease-in-out">
          SWAP
        </Button>
      </CardContent>
    </Card>
  );
}
