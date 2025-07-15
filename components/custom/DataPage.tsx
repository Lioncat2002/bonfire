import { Clock, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PriceTable } from "./PriceTable";

export function DataPage() {
  return (
    <Tabs defaultValue="tokens">
      <TabsList>
        <TabsTrigger value="tokens">TOKENS</TabsTrigger>
        <TabsTrigger value="leader-board">LEADER BOARD</TabsTrigger>
      </TabsList>

      <TabsContent value="leader-board">
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 animate-fade-in">
          <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
          <h2 className="text-xl font-semibold">Coming Soon</h2>
          <p className="text-gray-500 text-sm max-w-sm">
            We're cooking up something new and exciting! 🚀
            <br />
            Stay tuned for upcoming features.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="tokens">
        <PriceTable />
      </TabsContent>
    </Tabs>
  );
}
