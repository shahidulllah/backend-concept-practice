import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//auth api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
    })
    .send({ success: true });
});

app.get("/", async (req, res) => {
  res.send("Concept practice server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
