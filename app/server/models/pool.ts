export interface Pool {
  mintASymbol: string;
  mintAAddress: string;
  mintADecimals: number;
  mintBSymbol: string;
  mintBAddress: string;
  mintBDecimals: number;

  mintBLogo: string;
  mintALogo: string;

  price: number;
  price1day: number;

  mintAmountA: number;
  mintAmountB: number;
  volume24h: number; // 24 hour volume
  month1apr: number; // 1 month apr
}
