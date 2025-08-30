const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Concept practice server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
