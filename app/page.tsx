"use client";

import { DataPage } from "@/components/custom/DataPage";
import { NavBar } from "@/components/custom/NavBar";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

const RAYDIUM_PUBLIC_KEY = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"; //CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK
const HTTP_URL = process.env.HTTP_URL!;
const WSS_URL = process.env.WSS_URL!;
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

    //@ts-expect-error no proper types in web3js for some of the classes
    const accounts = (tx?.transaction.message.instructions).find(
      (ix) => ix.programId.toBase58() === RAYDIUM_PUBLIC_KEY
      //@ts-expect-error no proper types in web3js for some of the classes
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
      const tokenName = token.name;
      const tokenSymbol = token.symbol;
      //let tokenLogo = token.json!.image;
      console.log(tokenName, tokenSymbol, token);
    }

    const displayData = [
      { Token: "A", "Account Public Key": metadataAccountInfo },
      { Token: "B", "Account Public Key": tokenBAccount.toBase58() },
    ];

    console.log("New LP Found");
    console.table(displayData);
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
  return (
    <div className="p-8">
      <NavBar />
      <DataPage />
    </div>
  );
}
