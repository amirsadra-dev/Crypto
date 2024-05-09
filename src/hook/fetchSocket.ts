import { useEffect, useState } from "react";
import { ICrypto } from "../services/asset";
export const useFetchSocket = (cryptoNames: [ICrypto[], React.Dispatch<React.SetStateAction<ICrypto[]>>]) => {
  const [serverResponse, setServerResponse] = useState([]);
  const [crypto, setCrypto] = cryptoNames;
  console.log(crypto);

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=ALL`);

    socket.onopen = function () {
      console.log("Connection opened.");
    };

    socket.onmessage = function (event) {
      console.log("Received response:", JSON.parse(event.data));
      const responseSocket = JSON.parse(event.data);
      setServerResponse(responseSocket);

      crypto.map((item) => {
        if (item.Desk) {
          item.Desk = "";
        }
        const result = Object.keys(responseSocket).find(
          (key) => key === item.id
        );
        if (result) {
          setCrypto((pre) => {
            const preState = [...pre];

            const selectedItem = preState.find((res) => res.id === result);

            if (selectedItem) {
              if (selectedItem.priceUsd > responseSocket[result]) {
                selectedItem.Desk = "red";
              } else if (selectedItem.priceUsd < responseSocket[result])
                selectedItem.Desk = "green";

              selectedItem.priceUsd = responseSocket[result];
            }

            return preState;
          });
        }
      });
    };

    socket.onclose = function () {
      console.log("Connection closed.");
    };

    socket.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    // Clean up function
    return () => {
      socket.close();
    };
  }, [serverResponse]);

  return {};
};
