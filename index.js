const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// initialiser multer
const upload = multer({ storage: storage });

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// GET /api/fileanalyse
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    name: req.file.filename,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

// Serveur
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
