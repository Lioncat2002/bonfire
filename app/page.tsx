"use client";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect } from "react";

const RAYDIUM_PUBLIC_KEY = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"; //CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK
const HTTP_URL =
  "";
const WSS_URL =
  "";
const RAYDIUM = new PublicKey(RAYDIUM_PUBLIC_KEY);
const INSTRUCTION_NAME = "initialize2";

const connection = new Connection(HTTP_URL, {
  wsEndpoint: WSS_URL,
});

const metaplex = Metaplex.make(connection);
async function fetchRaydiumMints(txId: string, connection: Connection) {
  try {
    const tx = await connection.getParsedTransaction(txId, {
      maxSupportedTransactionVersion: 0,
      commitment: "confirmed",
    });

    //@ts-ignore
    const accounts = (tx?.transaction.message.instructions).find(
      (ix) => ix.programId.toBase58() === RAYDIUM_PUBLIC_KEY
      //@ts-ignore
    ).accounts as PublicKey[];

    if (!accounts) {
      console.log("No accounts found in the transaction.");
      return;
    }

    const tokenAIndex = 8;
    const tokenBIndex = 9;

    const tokenAAccount = accounts[tokenAIndex];
    const tokenBAccount = accounts[tokenBIndex];

    const metadataAccountA = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: tokenAAccount });

    const metadataAccountInfo = await connection.getAccountInfo(
      metadataAccountA
    );

    if (metadataAccountInfo) {
      const token = await metaplex
        .nfts()
        .findByMint({ mintAddress: tokenAAccount });
      let tokenName = token.name;
      let tokenSymbol = token.symbol;
      let tokenLogo = token.json!.image;
      console.log(tokenName, tokenSymbol, token);
    }

    const displayData = [
      { Token: "A", "Account Public Key": metadataAccountInfo },
      { Token: "B", "Account Public Key": tokenBAccount.toBase58() },
    ];

    console.log("New LP Found");
    console.table(metadataAccountInfo);
  } catch {
    console.log("Error fetching transaction:", txId);
    return;
  }
}
async function startConnection(
  connection: Connection,
  programAddress: PublicKey,
  searchInstruction: string
): Promise<void> {
  console.log("Monitoring logs for program:", programAddress.toString());
  connection.onLogs(
    programAddress,
    ({ logs, err, signature }) => {
      if (err) return;

      if (logs && logs.some((log) => log.includes(searchInstruction))) {
        console.log(
          "Signature for 'initialize2':",
          `https://explorer.solana.com/tx/${signature}`
        );
        fetchRaydiumMints(signature, connection);
      }
    },
    "finalized"
  );
}
export default function Home() {
  useEffect(() => {
    async function fetchData() {
      startConnection(connection, RAYDIUM, INSTRUCTION_NAME);
    }
    fetchData();
  }, []);
  return <div>Pussycat</div>;
}
