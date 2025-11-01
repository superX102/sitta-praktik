document.addEventListener('DOMContentLoaded', function() {
  const noResi = document.getElementById("noResi");
  const lacakResi = document.getElementById("lacak");
  const formResi = document.getElementById("formLacak");

  if (!formResi || !noResi || !lacakResi) {
    return;
  }

  formResi.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const nomerResi = noResi.value.trim();
    if (!nomerResi) {
      alert("No Resi kosong, harap isi terlebih dahulu");
      return;
    }
    
    try {
      if (typeof dataTracking === 'undefined') {
        throw new Error("Data tracking belum tersedia");
      }

      const validasiTracking = dataTracking[nomerResi];
      
      if (!validasiTracking) {
        throw new Error("Nomor resi tidak ditemukan");
      }

      const cardResult = document.getElementById("cardResult");
      const timelineResult = document.getElementById("timelineResult");
      
      if (!cardResult || !timelineResult) {
        throw new Error("Element hasil tidak ditemukan");
      }

      cardResult.style.display = "block";
      timelineResult.style.display = "block";

      const cardHeader = cardResult.querySelector(".card-header");
      const cardNumber = cardResult.querySelector(".card-number");
      const cardDetails = cardResult.querySelector(".card-details");

      if (cardHeader) cardHeader.textContent = validasiTracking.nama;
      if (cardNumber) cardNumber.textContent = validasiTracking.nomorDO;
      if (cardDetails) {
        cardDetails.innerHTML = `
          ${validasiTracking.status} >> ${validasiTracking.ekspedisi}<br />
          Paket: ${validasiTracking.paket} | Total: ${validasiTracking.total}
        `;
      }

      const timeline = document.querySelector(".timeline");
      if (timeline && validasiTracking.perjalanan) {
        timeline.innerHTML = "";
        validasiTracking.perjalanan.forEach(function(item) {
          const timelineItem = document.createElement("div");
          timelineItem.className = "timeline-item";
          timelineItem.innerHTML = `
            <div class="timeline-content">
              <div class="timeline-text">${item.keterangan}</div>
              <div class="timeline-date">${item.waktu}</div>
            </div>
          `;
          timeline.appendChild(timelineItem);
        });
      }

    } catch (error) {
      const cardResult = document.getElementById("cardResult");
      const timelineResult = document.getElementById("timelineResult");
      
      if (cardResult) cardResult.style.display = "none";
      if (timelineResult) timelineResult.style.display = "none";
      
      alert(error.message);
      console.error("Error:", error);
    }
  });
});