// script.js
const barangList = document.getElementById('barang-list');

async function getData() {
  try {
    const response = await fetch('/barang'); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function renderData() {
  const data = await getData();

  // Menghapus data sebelumnya
  barangList.innerHTML = '';

  // Menambahkan data ke daftar barang
  data.forEach(barang => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>ID:</strong> ${barang.id}<br>
      <strong>Nama:</strong> ${barang.nama}<br>
      <strong>Deskripsi:</strong> ${barang.deskripsi}<br>
      <strong>Harga:</strong> ${barang.harga}<br>
      <strong>Jumlah:</strong> ${barang.jumlah}<br>
      <hr>
    `;
    barangList.appendChild(listItem);
  });
}

renderData();
