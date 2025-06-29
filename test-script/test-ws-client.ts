// backend/test-clients/test-ws-client.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
    transports: ["websocket"]
});

socket.on("connect", () => {
    console.log("Connected to WebSocket server");

    // mock Job（Quick Book）
    socket.emit("create-job", {
        type: "QUICK_BOOK",
        customerId: "cus_test",
        description: "fix air conditioner"
    });
});

socket.on("job-created", (job) => {
    console.log("get job-created response:", job);
});

socket.on("new-job", (job) => {
    console.log("broadcast new-job:", job);
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected");
});