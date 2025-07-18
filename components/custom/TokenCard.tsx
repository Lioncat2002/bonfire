import { Card, CardHeader, CardTitle } from "../ui/card";

export function TokenCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start h-full">
        <img
          src="https://img-v1.raydium.io/icon/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v.png"
          alt=""
          className="w-12 h-12 mr-4 self-start"
        />
        <div className="flex flex-col justify-between h-full">
          <CardTitle>$TOKEN</CardTitle>
          <p>Token Name</p>
          <p>MCap $1.8M</p>
          <p className="text-xs">Token description</p>
        </div>
      </CardHeader>
    </Card>
  );
}
