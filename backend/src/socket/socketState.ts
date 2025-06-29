import { Server, Socket } from "socket.io";

let ioInstance: Server | null = null;
const connectedUsers = new Map<string, Socket>();

export const setIO = (io: Server) => {
    ioInstance = io;
};

export const getIO = () => ioInstance;

export const getConnectedUsers = () => connectedUsers;