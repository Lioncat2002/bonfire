import { Pool } from "@/app/server/models/pool";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ArrowDownUp } from "lucide-react";

type TradeCardProps = {
  selectedPair?: Pool;
};

export function TradeCard(props: TradeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SWAP</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Label>FROM</Label>
        <div className="p-2 flex flex-row space-x-2 text-md">
          <Input type="number" />{" "}
          <Label>{props.selectedPair?.mintASymbol}</Label>{" "}
        </div>
        <div className="flex flex-row justify-center"><ArrowDownUp size={15}/></div>
        <Label>TO</Label>
        <div className="p-2 flex flex-row space-x-2 text-md">
          <Input type="number" />{" "}
          <Label>{props.selectedPair?.mintBSymbol}</Label>{" "}
        </div>
        <Button>SWAP</Button>
      </CardContent>
    </Card>
  );
}
