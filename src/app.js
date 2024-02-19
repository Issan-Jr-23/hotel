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
// import ranchRoutes from "./routes/ranch.routes.js";
// import bebidasRoutes from "./routes/inventario.routes.js";
// import preciosRoutes from "./routes/precios.routes.js";
// import mensajeRoutes from "./routes/mesaje.routes.js"
// import inventarioRanch from "./routes/inventario.ranch.routes.js"
// import preciosRanch from "./routes/precios.ranch.routes.js"
// import welcome from "./routes/welcome.routes.js"
// import transferencia from "./routes/transferencia.routes.js"
// import graficas from "./routes/graficas.routes.js"
// import cabaniaStock from "./routes/stockCabania.routes.js"
// import estateRoutes from "./routes/estate.routes.js"

// const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: ["https://www.hotelmeqo.com/","https://hotelmeqo.com/",
//     "https://www.hotelmeqo.com/meqo/","https://hotelmeqo.com/meqo/"
//     ,"http://localhost:5173"], 
//   })
// );
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cookieParser());



// app.use("/api/auth", authRoutes);
// app.use("/api", clientRoutes,ranchRoutes,mensajeRoutes, preciosRoutes);
// app.use("/api", clienteHabitacionesModel);
// app.use("/api", clientCabaniasRoutes);
// app.use("/api", bebidasRoutes);
// app.use("/api", grahps);
// app.use("/api", grahpsStock);
// app.use("/api", inventarioRanch);
// app.use("/api", preciosRanch);
// app.use("/api", welcome);
// app.use("/api", transferencia);
// app.use("/api", graficas);
// app.use("/api", cabaniaStock);
// app.use("/api", estateRoutes);
// app.use(express.urlencoded({ extended: true }));

// if (process.env.NODE_ENV === "production") {
//   const path = await import("path");
//   app.use(express.static("client/dist"));

//   app.get("*", (req, res) => {
//     console.log(path.resolve("client", "dist", "index.html" ));
//     res.sendFile(path.resolve("client", "dist", "index.html"));
//   });
// }

// export default app;



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
import preciosRoutes from "./routes/precios.routes.js";
import mensajeRoutes from "./routes/mesaje.routes.js"
import inventarioRanch from "./routes/inventario.ranch.routes.js"
import preciosRanch from "./routes/precios.ranch.routes.js"
import welcome from "./routes/welcome.routes.js"
import transferencia from "./routes/transferencia.routes.js"
import graficas from "./routes/graficas.routes.js"
import cabaniaStock from "./routes/stockCabania.routes.js"
import estateRoutes from "./routes/estate.routes.js"

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", clientRoutes,ranchRoutes,mensajeRoutes, preciosRoutes);
app.use("/api", clienteHabitacionesModel);
app.use("/api", clientCabaniasRoutes);
app.use("/api", bebidasRoutes);
app.use("/api", grahps);
app.use("/api", grahpsStock);
app.use("/api", inventarioRanch);
app.use("/api", preciosRanch);
app.use("/api", welcome);
app.use("/api", transferencia);
app.use("/api", graficas);
app.use("/api", cabaniaStock);
app.use("/api", estateRoutes);

if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html" ));
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;
