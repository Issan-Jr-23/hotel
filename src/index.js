// import app from "./app.js";
// import { PORT } from "./config.js";
// import { connectDB } from "./db.js";

// async function main() {
//   try {
//     await connectDB();
//     app.listen(PORT);
//     console.log(`Listening on port http://localhost:${PORT}`);
//     console.log(`Environment: ${process.env.NODE_ENV}`)
//   } catch (error) {
//     console.error(error);
//   }
// }

// main();



import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import https from "https"

async function main() {
  try {
    await connectDB();
    app.listen(8080, console.log("Server running"));
    console.log(`Listening on port http://localhost:8080`);
    console.log(`Environment: ${process.env.NODE_ENV}`)
  } catch (error) {
    console.error(error);
  }
}

main();
