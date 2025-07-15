import axios from "axios";

const BASE_URL = "https://lite-api.jup.ag";
const PLATFORM_FEE = 20;
export interface QuoteData {
  inputMint: string;
  outputMint: string;
  amount: string;
  slippage: number;
}
export async function getQuote(data: QuoteData) {
  const response = await axios.get(
    `${BASE_URL}/swap/v1/quote?inputMint=${data.inputMint}&outputMint=${data.outputMint}&amount=${data.amount}&slippageBps=${data.slippage}&&platformFeeBps=${PLATFORM_FEE}`
  );

  return response.data;
}
