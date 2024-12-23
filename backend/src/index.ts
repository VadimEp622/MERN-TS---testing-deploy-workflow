import "dotenv/config";
import http from "http";
import path from "path";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { logger } from "./services/logger.service.js";
import { connectDB } from "./services/db.service.ts";
import { appConfig } from "./config/app.config.ts";

// TODO: add verification to appConfig's env vars, and shutdown if error/missing

// ***************** Express App Config *****************
const app = express();
const server = http.createServer(app);
connectDB();

app.use(cookieParser());
app.use(express.json());

if (appConfig.NODE_ENV === "production") {
  app.use(express.static(path.resolve("public")));
} else {
  const corsOptions = {
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3030",
      "http://127.0.0.1:3030",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// ***************** Routes *****************
import { setupAsyncLocalStorage } from "./middlewares/setupAls.middleware.ts";
import { userRoutes } from "./api/user/user.routes.ts";

app.all("*", setupAsyncLocalStorage);
app.use("/api/user", userRoutes);

// ***************** Graceful shutdown *****************
const shutdown = async () => {
  logger.warn("Shutdown initiated...");
  try {
    server.close(() => logger.info("HTTP server closed."));
    await mongoose.connection.close();
    logger.info("MongoDB connection closed.");
    process.exit(0);
  } catch (err) {
    logger.error("Error during shutdown:", err);
    process.exit(1);
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// ***************** Get static React app *****************
if (appConfig.NODE_ENV === "production") {
  app.get("/**", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });
}

// ***************** Run Server *****************
const port = appConfig.PORT ?? 3030;
server.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
