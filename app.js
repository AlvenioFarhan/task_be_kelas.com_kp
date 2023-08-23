// app.js
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Selamat datang di Aplikasi CRUD Pendataan Barang!");
});

const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API - Create
app.post("/barang", (req, res) => {
  const { nama, deskripsi, harga, jumlah } = req.body;
  connection.query(
    "INSERT INTO barang (nama, deskripsi, harga, jumlah) VALUES (?, ?, ?, ?)",
    [nama, deskripsi, harga, jumlah],
    (err, results) => {
      if (err) throw err;
      res.send("Data barang berhasil ditambahkan");
    }
  );
});

// API - Read
app.get('/barang', (req, res) => {
  connection.query('SELECT * FROM barang', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Data retrieved:', results);
      res.json(results);
    }
  });
});


// API - Update
app.put("/barang/:id", (req, res) => {
  const id = req.params.id;
  const { nama, deskripsi, harga, jumlah } = req.body;
  connection.query(
    "UPDATE barang SET nama = ?, deskripsi = ?, harga = ?, jumlah = ? WHERE id = ?",
    [nama, deskripsi, harga, jumlah, id],
    (err, results) => {
      if (err) throw err;
      res.send("Data barang berhasil diperbarui");
    }
  );
});

// API - Delete
app.delete("/barang/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM barang WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.send("Data barang berhasil dihapus");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
