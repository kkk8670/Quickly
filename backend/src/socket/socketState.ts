import { Server, Socket } from "socket.io";

let io: Server | null = null;
const connectedUsers = new Map<string, Socket>();

export const setIO = (server: Server) => {
    io = server;
};

export const getIO = () => io;

export const getConnectedUsers = () => connectedUsers;