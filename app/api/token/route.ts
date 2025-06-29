"use server";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

const HTTP_URL =process.env.HTTP_URL!;
const WSS_URL =process.env.WSS_URL!;

const connection = new Connection(HTTP_URL, {
  wsEndpoint: WSS_URL,
});

const metaplex = Metaplex.make(connection);

export async function POST(req: NextRequest) {
  try {
    const tx = await req.json();
    console.log(JSON.stringify(tx));

    const accounts = tx[0]?.accountData;

    if (!accounts) {
      console.log("No accounts found in the transaction.");
      return new NextResponse("fail", {
        status: 200, // just to make helius top from overloading our server
      });
    }

    const tokenAIndex = 8;
    const tokenBIndex = 9;

    const tokenAAccount = new PublicKey(
      accounts[tokenAIndex].tokenBalanceChanges[0].mint
    );
    const tokenBAccount = new PublicKey(
      accounts[tokenBIndex].tokenBalanceChanges[0].mint
    );

    const tokenAMetadata = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: tokenAAccount });
    const tokenBMetadata = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: tokenBAccount });

    const tokenAmetadataAccountInfo = await connection.getAccountInfo(
      tokenAMetadata
    );
    const tokenBmetadataAccountInfo = await connection.getAccountInfo(
      tokenBMetadata
    );

    if (tokenAmetadataAccountInfo) {
      const token = await metaplex
        .nfts()
        .findByMint({ mintAddress: tokenAAccount });
      const tokenAName = token.name;
      const tokenASymbol = token.symbol;
      //let tokenLogo = token.json!.image;
      console.log("First token", tokenAName, tokenASymbol, token);
    }
    if (tokenBmetadataAccountInfo) {
      const token = await metaplex
        .nfts()
        .findByMint({ mintAddress: tokenBAccount });
      const tokenBName = token.name;
      const tokenBSymbol = token.symbol;
      //let tokenLogo = token.json!.image;
      console.log("second token", tokenBName, tokenBSymbol, token);
    }
    return new NextResponse("success", {
      status: 200,
    });
  } catch (e) {
    return new NextResponse("fail", {
      status: 200,
    });
  }
}
