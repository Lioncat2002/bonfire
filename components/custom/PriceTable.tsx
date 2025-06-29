"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { WalletMinimal } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { SetStateAction, useState } from "react";

export function PriceTable() {
    const [amt,setAmt]=useState<number>(0.01)
  return (
    <div>
      <div className="flex flex-row w-[100%] justify-end space-x-4 ">
        <RadioGroup defaultValue="top20" className="flex flex-row">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="top20" id="top20" />
            <Label htmlFor="top20">TOP 20</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new" />
            <Label htmlFor="new">NEW</Label>
          </div>
        </RadioGroup>
        <div className="flex flex-row space-x-2  bg-gray-200 rounded-sm pl-2 border-2 border-gray-400">
          <WalletMinimal className="pt-2" />
          <div className="">Buy</div>
          <Input
            type="number"
            className="bg-white font-semibold "
            placeholder="0.01"
            value={amt}
            onChange={(e)=>setAmt(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">TOKEN</TableHead>
            <TableHead>AGE</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>LIQUIDITY</TableHead>
            <TableHead>24H VOL</TableHead>
            <TableHead>24H TXNS</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>1H</TableHead>
            <TableHead>24H</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">TRUMP/SOL</TableCell>
            <TableCell>27s</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="flex flex-row justify-end w-[100px]">
              <div className="flex flex-row">
                <p>{amt}</p>
                <WalletMinimal className="p-[2px]" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
