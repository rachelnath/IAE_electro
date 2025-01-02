import express, { urlencoded } from "express";
import cors from "cors";
import router from "./router/router.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathURI = path.join(__dirname, "public", "post", "PR-lmXA-18S3HNjw.png");

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/image", express.static("public/post"));
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
