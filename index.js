import express from "express";
const app = express();
import connectDB from "./src/helper/dbConnection.js";
import router from "./routes.js";

import dotenv from "dotenv";
dotenv.config({ quiet: true });

//to allow json formats and accept data from urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
router(app);

app.listen(process.env.PORT, () => {
  console.log("server listening to PORT", process.env.PORT);
});

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })
