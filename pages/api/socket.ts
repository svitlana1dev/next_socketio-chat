import { Server as IOServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Socket } from "net";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const httpServer: HTTPServer = res.socket.server;
    const io = new IOServer(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("message", (msg) => {
        io.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
