const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Book = require("../models/Book");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        const books = results.map((row) => ({
          title: row.title,
          author: row.author,
          class: row.class,
          subject: row.subject,
          price: Number(row.price),
          image: row.image,
        }));

        await Book.insertMany(books);

        fs.unlinkSync(req.file.path); // delete temp file

        res.json({ message: "Books uploaded successfully", count: books.length });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
});

module.exports = router;