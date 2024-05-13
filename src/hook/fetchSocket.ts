import { useEffect, useState } from "react";

export const useFetchSocket = () => {
  const [serverResponse, setServerResponse] = useState([]);
  
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
  }, []);

  return {serverResponse};
};
