const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // Permitir conexiones desde cualquier origen
});

io.on("connection", socket => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("message", data => {
    console.log("Mensaje recibido:", data);
    io.emit("message", `Servidor recibió: ${data}`); // Reenvía a todos los clientes
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

server.listen(8000, () => {
  console.log("Servidor corriendo en http://localhost:8000");
});
