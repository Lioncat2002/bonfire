"use client"

import { Connection } from "@solana/web3.js";
import { DynamicBondingCurveClient } from "@meteora-ag/dynamic-bonding-curve-sdk";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const dbcClient = new DynamicBondingCurveClient(connection, "confirmed");
