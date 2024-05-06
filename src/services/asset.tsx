import axios from "axios";
import { useState, useEffect } from "react";

export default function Asset() {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    axios.get("https://api.coincap.io/v2/assets").then((res) => {
      setCrypto(res.data.data);
      console.log("Response:", res.data);
    });
  }, []);

  return (
    <>
      {crypto.map((item) => (
        <div key={item.id}>
          <div>
            {item.rank}
            {item.name}
          </div>
          <div>
            {item.marketCapUsd}
            {item.vwap24Hr}
            {item.supply}
            {item.volumeUsd24Hr}
            {item.changePercent24Hr}
          </div>
        </div>
      ))}
    </>
  );
}
