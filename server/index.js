import express from "express";
import router from "./route/route.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());
const PORT = 8000;
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
