import { FC, useEffect } from "react";
import { useNumberFormater } from "./hook/numberFormater";
import Skeleton from "./Skleton";
import { ICrypto } from "./services/asset";

interface IProps{
  crypto : [ICrypto[], React.Dispatch<React.SetStateAction<ICrypto[]>>]
}

const ShowCoins: FC<IProps> = ({ crypto }) => {
  console.log(crypto);

  const [cryptoState] = crypto;

  useEffect(() => {
    cryptoState.map((item) => {
      const element = document.getElementById(`coin${item.id}`);
      if (element) {
        element.classList.add(
          item.Desk == "green"
            ? "bg-green-200/30"
            : item.Desk === "red"
            ? "bg-red-200/30"
            : "bg-[#0F1C2E]"
        );
        setTimeout(() => {
          element.classList.remove(
            "bg-green-200/30",
            "bg-red-200/30",
            "bg-[#0F1C2E]"
          );
        }, 800);
      }
    });
  }, [cryptoState]);
  const NumberFormater = useNumberFormater 

  return (
    <>
      <div dir="ltr" className="font-DanaMedium bg-[#0F1C2E] text-[#C6DEF8]">
        <div className="flex w-full items-center justify-between py-8	px-7 bg-[#0D1726] border-b border-white/60 rounded-sm">
          <div className="flex pl-10 gap-x-8 ">
            <span>Rank</span>
            <span>Name</span>
          </div>
          <div className="flex gap-x-16 justify-between font-DanaMedium">
            <div className="w-28">Price</div>
            <div className="w-24">Market Cap</div>
            <div className="w-48">VWAP (24Hr)	</div>
            <div className="w-24">Supply</div>
            <div className="w-28">Volume (24Hr)</div>
            <div className="">Change (24Hr)</div>
          </div>
        </div>
        {!cryptoState.length
          ? new Array(10).fill("").map(() => <Skeleton />)
          : cryptoState.map((item) => (
              <div
                id={`coin${item.id}`}
                key={item.id}
                className={`flex items-center justify-between gap-x-10 px-16 border-b border-white/20 py-4`}
              >
                <div className="flex gap-x-8 text-[#C6DEF8]">
                  <div className="flex justify-center w-5">{item.rank}</div>
                  <div className="flex justify-end gap-x-2">
                    <img
                      className="w-8 h-8"
                      src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`}
                    />
                    <div className="flex flex-col ">
                      <div>{item.name}</div>
                      <div className="text-xs text-zinc-500">{item.symbol}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between   w-9/12 font-DanaRegular text-[#C6DEF8]">
                  <div className="w-32 flex justify-start">
                    {Number(item.priceUsd).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                  <div className="w-32 flex justify-start">
                    {NumberFormater(item.marketCapUsd)}
                  </div>
                  <div className="w-32 flex justify-start">
                    {Number(item.vwap24Hr).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                  <div className="w-32 flex justify-start">
                    {NumberFormater(item.supply)}
                  </div>
                  <div className="w-32">
                    {NumberFormater(item.volumeUsd24Hr)}
                  </div>
                  <div
                    className={
                      item.changePercent24Hr >= 0
                        ? "text-green-900 bg-green-100 px-2 py-1 rounded-md"
                        : "text-red-800 bg-red-100 px-2 py-1 rounded-md"
                    }
                  >
                    {Number(item.changePercent24Hr).toFixed(2) + "%"}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};
export default ShowCoins;
