function jumlahStok(stok) {
  if (stok > 400) return "stok-tinggi";
  if (stok > 150) return "stok-sedang";
  return "stok-rendah";
}

function dataTabel() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  dataBahanAjar.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td><span class="badge">${item.kodeLokasi}</span></td>
          <td><span class="kode-barang">${item.kodeBarang}</span></td>
          <td>${item.namaBarang}</td>
          <td><span class="badge">${item.jenisBarang}</span></td>
          <td>${item.edisi}</td>
          <td><span class="stok-badge ${jumlahStok(item.stok)}">${
      item.stok
    } unit</span></td>
          <td><button class="btn-details" onclick="showDetail(${index})">Detail</button></td>
        `;
    tableBody.appendChild(row);
  });
}
function showDetail(index) {
  const item = dataBahanAjar[index];
  const modal = document.getElementById("modalDetailBahanAjar");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <img src="img/${item.cover}" alt="${item.namaBarang}" class="book-cover"">
    <div class="detail-item">
      <div class="detail-label">Kode Lokasi:</div>
      <div class="detail-value">${item.kodeLokasi}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Kode Barang:</div>
      <div class="detail-value">${item.kodeBarang}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Nama Barang:</div>
      <div class="detail-value">${item.namaBarang}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Jenis Barang:</div>
      <div class="detail-value">${item.jenisBarang}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Edisi:</div>
      <div class="detail-value">Edisi ${item.edisi}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Stok:</div>
      <div class="detail-value"><span class="stok-badge ${jumlahStok(
        item.stok
      )}">${item.stok} unit</span></div>
    </div>
  `;

  openModal(modal);
}

function openModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("closeBahanAjar").onclick = function () {
  closeModal(document.getElementById("modalDetailBahanAjar"));
};

window.onclick = function (event) {
  const modal = document.getElementById("modalDetailBahanAjar");
  if (event.target === modal) {
    closeModal(modal);
  }
};

dataTabel();