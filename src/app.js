import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import clientRoutes from "./routes/client.routes.js"
import clientCabaniasRoutes from "./routes/client.cabania.routes.js"
import authRoutes from "./routes/auth.routes.js";
import bebidasRoutes from "./routes/inventario.routes.js";
// import taksRoutes from "./routes/tasks.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: [FRONTEND_URL, "https://human-sczd.vercel.app"], 
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
// app.use("/api", taksRoutes);
app.use("/api", clientRoutes);
app.use("/api", clientCabaniasRoutes);
app.use("/api", bebidasRoutes);

if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    // console.log(path.resolve("client", "dist", "index.html" ));
    // res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;
