import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import clientRoutes from "./routes/client.routes.js"
import clientCabaniasRoutes from "./routes/client.cabania.routes.js"
import clienteHabitacionesModel from "./routes/cliente.habitaciones.routes.js";
import grahps from "./routes/grahps.routes.js"
import grahpsStock from "./routes/grahps.stock.routes.js"
import authRoutes from "./routes/auth.routes.js";
import ranchRoutes from "./routes/ranch.routes.js";
import bebidasRoutes from "./routes/inventario.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["https://www.hotelmeqo.com/","https://hotelmeqo.com/",
    "https://www.hotelmeqo.com/meqo/","https://hotelmeqo.com/meqo/"
    ,"http://localhost:5173"], 
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", clientRoutes,ranchRoutes);
app.use("/api", clienteHabitacionesModel);
app.use("/api", clientCabaniasRoutes);
app.use("/api", bebidasRoutes);
app.use("/api", grahps);
app.use("/api", grahpsStock);

if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html" ));
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;



// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import clientRoutes from "./routes/client.routes.js"
// import clientCabaniasRoutes from "./routes/client.cabania.routes.js"
// import clienteHabitacionesModel from "./routes/cliente.habitaciones.routes.js";
// import grahps from "./routes/grahps.routes.js"
// import grahpsStock from "./routes/grahps.stock.routes.js"
// import authRoutes from "./routes/auth.routes.js";
// import bebidasRoutes from "./routes/inventario.routes.js";

// const app = express();

// if (process.env.NODE_ENV !== 'production') {
//   app.use(cors());
// }
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api", clientRoutes);
// app.use("/api", clienteHabitacionesModel);
// app.use("/api", clientCabaniasRoutes);
// app.use("/api", bebidasRoutes);
// app.use("/api", grahps);
// app.use("/api", grahpsStock);

// if (process.env.NODE_ENV === "production") {
//   const path = await import("path");
//   app.use(express.static("client/dist"));

//   app.get("*", (req, res) => {
//     console.log(path.resolve("client", "dist", "index.html" ));
//     res.sendFile(path.resolve("client", "dist", "index.html"));
//   });
// }

// export default app;
