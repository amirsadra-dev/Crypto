import axios from "axios";
import ShowCoins from "../ShowCoins";
import { useState, useEffect } from "react";
import { useFetchSocket } from "../hook/fetchSocket";
import { useUpdateCoin } from "../hook/updateCoin";

export interface ICrypto {
  id: string;
  rank: number;
  name: string;
  priceUsd: number;
  supply: number;
  symbol: string;
  volumeUsd24Hr: number;
  vwap24Hr: number;
  Desk : string;
  changePercent24Hr : number;
  marketCapUsd : number
}

export default function Asset() {
  const crypto = useState<ICrypto[]>([]);

  useEffect(() => {
    axios.get("https://api.coincap.io/v2/assets").then((res) => {
      crypto[1](res.data.data);
    });
  }, []);
  useUpdateCoin(crypto);

  return (
    <>
      <ShowCoins crypto={crypto} />
    </>
  );
}
