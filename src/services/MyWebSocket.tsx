import { useEffect, useState } from "react";

const MyWebSocketComponent = () => {
  // Use state to store server response
  const [serverResponse, setServerResponse] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    socket.onopen = function () {
      console.log("Connection opened.");
    };

    socket.onmessage = function (event) {
      console.log("Received response:", event.data);
      // Update local state based on the message received from the server
      setServerResponse(event.data);
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
      console.log("socket closed");
    };
  }, []); // Runs only once when component mounts

  return (
    <div>
     

    </div>
  );
};
export default MyWebSocketComponent;
