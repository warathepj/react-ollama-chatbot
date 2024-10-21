import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';  // Change 'server' to 'Server'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

const { dirname, fileURLToPath } = require('path');
const __dirname = dirname(fileURLToPath(import.meta.url));
// TODO:
const model = new LlamaModel({
  modelFile: 'notus-7b-v1.Q4_K_S.gguf',
  path: './model'
});
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Express middleware for handling Content-Type header
app.use(express.json()); // Parses incoming JSON data

// Your Express application routes here

// Socket.IO event listeners here

io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle socket events
});

server.listen(3007, () => {
  console.log('Server listening on port 3007');
});
// /////////////////////
// const port = 3007;

// server.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

