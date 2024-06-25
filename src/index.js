import express from "express";
import cors from "cors";
import rootRouter from "./routes/rootRouter.js";
const app = express();

// middleware
app.use(express.json());

// mở chặn cors
app.use(cors());

app.get("/", (req, res) => {
  res.send({ oke: `oke` });
});
app.use(rootRouter);

// khởi chạy BE
app.listen(8080);
