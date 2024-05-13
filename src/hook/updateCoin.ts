import { ICrypto } from "../services/asset";
import { useEffect } from "react";
import { useFetchSocket } from "./fetchSocket";
export const useUpdateCoin = (cryptoNames: [ICrypto[], React.Dispatch<React.SetStateAction<ICrypto[]>>]) => {
    const [crypto, setCrypto] = cryptoNames;
    const {serverResponse} = useFetchSocket()

    useEffect(() => {
        crypto.map((item) => {
            if (item.Desk) {
              item.Desk = "";
            }
            const result = Object.keys(serverResponse).find(
              (key) => key === item.id
            );
            if (result) {
              setCrypto((pre) => {
                const preState = [...pre];
    
                const selectedItem = preState.find((res) => res.id === result);
    
                if (selectedItem) {
                  if (selectedItem.priceUsd > serverResponse[result]) {
                    selectedItem.Desk = "red";
                  } else if (selectedItem.priceUsd < serverResponse[result])
                    selectedItem.Desk = "green";
    
                  selectedItem.priceUsd = serverResponse[result];
                }
    
                return preState;
              });
            }
          });
      }
    , [serverResponse])
    
}