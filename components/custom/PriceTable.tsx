"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef, useState } from "react";
import { getPrice } from "@/app/server/getPrice";
import { Pool } from "@/app/server/models/pool";
import { TradeCard } from "./TradeCard";
import { Button } from "../ui/button";
import { animate } from "animejs";
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
  const [selectPair, setSelectedPair] = useState<Pool>();
  const [pools, setPools] = useState<Pool[]>();
  useEffect(() => {
    async function fetchPrice() {
      const p = await getPrice();
      setPools(p);
      setSelectedPair(p[0]);
    }
    fetchPrice();
  }, []);

  return (
    <div className="flex flex-col-reverse space-y-reverse space-y-2 
                sm:flex-col sm:space-y-2 
                md:flex-row md:space-x-2 md:space-y-0">
      <div className="lg:w-2/3 sm:w-[100%]">
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
                  <TableCell className="font-medium flex flex-row space-x-2">
                    <img
                      src={pool.mintBLogo ? pool.mintBLogo : pool.mintALogo}
                      alt={pool.mintBSymbol}
                    />
                    <span>
                      {pool.mintASymbol}/{pool.mintBSymbol}
                    </span>
                  </TableCell>
                  <TableCell>$ {pool.price.toFixed(6)}</TableCell>
                  <TableCell>$ {formatNumber(pool.volume24h)}</TableCell>
                  <TableCell
                    className={
                      get24hPriceChange(pool.price, pool.price1day) > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {get24hPriceChange(pool.price, pool.price1day) > 0
                      ? "+"
                      : ""}
                    {get24hPriceChange(pool.price, pool.price1day).toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    <Button
                      className="transition active:scale-95 duration-150 ease-in-out"
                      onClick={(e) => {
                        setSelectedPair(pool);
                      }}
                    >
                      TRADE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="lg:w-1/3 sm:w-[100%] font-semibold text-2xl flex flex-col space-y-4">
        <span>TRADE</span>
        <TradeCard selectedPair={selectPair} />
      </div>
    </div>
  );
}
