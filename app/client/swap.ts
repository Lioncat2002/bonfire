import { Connection, VersionedTransaction } from "@solana/web3.js";
import toast from "react-hot-toast";

const BASE_URL = "https://lite-api.jup.ag";
const PLATFORM_FEE = 20;

export async function BuildSwapTransaction(quote: string, publicKey: string) {
  let quoteResponse = JSON.parse(quote);

  let tokenAccount = "";

  switch (quoteResponse.inputMint) {
    case "So11111111111111111111111111111111111111112": // WSOL
      tokenAccount = "71unA6cYHkqTqv4pf35zB4zGt5qQktt3xRREh9ogiGht";
      break;

    case "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": // USDC
      tokenAccount = "A5Gx5MxMfg8VYT2FjavRU5BziecwBjUEaJvwEjaJDgN2";
      break;

    case "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": // USDT
      tokenAccount = "467tEdZoraXTtssvnzvjDFSXqbVcRM9Lb7SSEiZfrkP8";
      break;
  }

  try {
    const swapResponse = await (
      await fetch(BASE_URL + "/swap/v1/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey: publicKey,

          feeAccount: tokenAccount, //"A5Gx5MxMfg8VYT2FjavRU5BziecwBjUEaJvwEjaJDgN2", //"71unA6cYHkqTqv4pf35zB4zGt5qQktt3xRREh9ogiGht",// jupiter referral account
          feeBps: PLATFORM_FEE,

          // ADDITIONAL PARAMETERS TO OPTIMIZE FOR TRANSACTION LANDING
          // See next guide to optimize for transaction landing
          dynamicComputeUnitLimit: true,
          dynamicSlippage: true,
          prioritizationFeeLamports: {
            priorityLevelWithMaxLamports: {
              maxLamports: 1000000,
              priorityLevel: "veryHigh",
            },
          },
        }),
      })
    ).json();
    console.log("swap response", swapResponse);

    return JSON.stringify(swapResponse);
  } catch (e) {
    console.error("failed to build swap transaction", e);
    toast.error("failed to build swap transaction");
    return "";
  }
}

export async function SendSwapTransaction(
  swap: string,
  signTransaction: any,
  sendTransaction: any
) {
  const connection = new Connection(
    "https://api.mainnet-beta.solana.com",
    "confirmed"
  );
  let swapResponse = JSON.parse(swap);
  const transactionBase64 = swapResponse.swapTransaction;
  let transaction = VersionedTransaction.deserialize(
    Buffer.from(transactionBase64, "base64")
  );
  try {
    transaction = await signTransaction(transaction);
    console.log("Transaction signed");
  } catch (err) {
    console.error("Transaction signing failed:", err);
  }

  try {
    const signature = await sendTransaction(transaction, connection);
    console.log("Transaction signed");
    const confirmation = await connection.confirmTransaction(
      signature,
      "finalized"
    );
    if (confirmation.value.err) {
      toast.error(`transaction failed https://solscan.io/tx/${signature}/`);
      throw new Error(
        `Transaction failed: ${JSON.stringify(
          confirmation.value.err
        )}\nhttps://solscan.io/tx/${signature}/`
      );
    } else {
      console.log(
        `Transaction successful: https://solscan.io/tx/${signature}/`
      );
      toast.success(
        `transaction successful: https://solscan.io/tx/${signature}/`
      );
    }
  } catch (err) {
    console.error("Transaction signing failed:", err);
     toast.error(
        `transaction failed`
      );
  }
}
