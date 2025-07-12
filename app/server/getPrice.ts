"use server";

import axios from "axios";
import { Pool } from "./models/pool";

const BASE_URL = process.env.BASE_URL;
export async function getPrice() {
  const resp = await axios.get(
    `${BASE_URL}/pools/info/list?poolType=all&poolSortField=volume24h&sortType=desc&pageSize=50&page=1`
  );
  const pools: Pool[] = [];
  for(const pool of resp.data.data.data){
    const p:Pool={
        mintAAddress: pool.mintA.address,
        mintASymbol: pool.mintA.symbol,
        mintALogo: pool.mintA.logoURI,
        mintADecimals: pool.mintA.decimals,
        
        mintBAddress: pool.mintB.address,
        mintBSymbol: pool.mintB.symbol,
        mintBLogo: pool.mintB.logoURI,
        mintBDecimals: pool.mintB.decimals,
        
        price: pool.price,
        price1day:pool.day.priceMin,
        mintAmountA: pool.mintAmountA,
        mintAmountB: pool.mintAmountB,
        volume24h: pool.day.volume,
        month1apr: pool.month.apr
    }

    pools.push(p)
  }

  console.log(resp.data.data.data)
  return pools
}
