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

//Token verify
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized accesss" });
    }
    req.user = decoded;
    next();
  });
};

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

//logout
app.post("/logout", async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
    })
    .send({ success: true });
});
app.get("/posts", async (req, res) => {
  console.log(req.body);
});

app.get("/", async (req, res) => {
  res.send("Concept practice server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
