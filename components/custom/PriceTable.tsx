"use client";
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
import { useEffect, useState } from "react";
import { getPrice } from "@/app/server/getPrice";
import { Pool } from "@/app/server/models/pool";

function formatNumber(num: number): string {
  if (Math.abs(num) >= 1_000_000) {
    return (num / 1_000_000).toFixed(4).replace(/\.0$/, "") + "M";
  }
  if (Math.abs(num) >= 1_000) {
    return (num / 1_000).toFixed(4).replace(/\.0$/, "") + "K";
  }
  return num.toFixed(4);
}

function get24hPriceChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function PriceTable() {
  const [amt, setAmt] = useState<number>(0.01);
  const [pools, setPools] = useState<Pool[]>();
  useEffect(() => {
    async function fetchPrice() {
      const p = await getPrice();
      setPools(p);
    }
    fetchPrice();
  }, []);
  console.log(pools);
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
      </div>
      <div className="flex flex-row space-x-2">
        <div className="w-2/3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TOKEN</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>24H VOL.</TableHead>
                <TableHead>24H CHANGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pools?.map((pool, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {pool.mintASymbol}/{pool.mintBSymbol}
                    </TableCell>
                    <TableCell>$ {pool.price.toFixed(6)}</TableCell>
                    <TableCell>$ {formatNumber(pool.volume24h)}</TableCell>
                    <TableCell className={get24hPriceChange(pool.price, pool.price1day)>0?"text-green-400":"text-red-400"}>
                      {get24hPriceChange(pool.price, pool.price1day)>0?"+":""}
                      {get24hPriceChange(pool.price, pool.price1day).toFixed(2)}
                      %
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="w-1/3 font-semibold text-2xl">TRADE</div>
      </div>
    </div>
  );
}
