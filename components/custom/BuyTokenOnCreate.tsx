"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function BuyTokenOnCreateDialog({
  open,
  setOpen,
  tokenData,
  tokenAmount,
  setTokenAmount,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setTokenAmount: (amount: string) => void;
  tokenAmount: string;
  tokenData?: { symbol: string } | null;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Choose how many ${tokenData?.symbol} you want to buy
          </DialogTitle>
          <DialogDescription>
            tip: it's optional but buying a small amount of your own token can
            help with initial liquidity and protect your coin from snipers.
          </DialogDescription>
        </DialogHeader>

        {/* Use flex-col layout here */}
        <div className="flex flex-col space-y-4 py-4">
          <Input
            placeholder="0.0"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.currentTarget.value)}
            type="number"
          />
          {parseFloat(tokenAmount) <= 0 ||
          tokenAmount == "" ||
          Number.isNaN(tokenAmount) ? (
            <Button variant="outline" onClick={() => setOpen(false)}>
              JUST CREATE THE TOKEN
            </Button>
          ) : (
            <Button
              onClick={() => {
                setOpen(false);
                window.open("https://jup.ag/swap/SOL-USDC", "_blank");
              }}
            >
              CREATE AND BUY {tokenAmount} ${tokenData?.symbol}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
