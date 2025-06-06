let categories = [
    { name: "Konsumsi", percentage: 40, color: "#6bcff6" },
    { name: "Hiburan", percentage: 30, color: "#d15cf8" },
    { name: "Transportasi", percentage: 30, color: "#7dd47d" }
  ];

  const legendContainer = document.getElementById("expenses-legend");
  const totalExpensesEl = document.getElementById("total-expenses");

  // Fungsi untuk membuat warna acak
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Fungsi render legend
  function renderLegend() {
    legendContainer.innerHTML = "";
    categories.forEach(cat => {
      const item = document.createElement("div");
      item.className = "legend-item";
      item.innerHTML = `
        <div class="dot" style="background: ${cat.color};"></div>
        <div>
          <span>${cat.name} (${cat.percentage.toFixed(1)}%)</span>
          <span class="amount">Rp ${(cat.percentage * 10000).toLocaleString("id-ID")},-</span>
        </div>
      `;
      legendContainer.appendChild(item);
    });

    // Dummy total value (optional logic)
    const totalNominal = categories.reduce((sum, cat) => sum + (cat.percentage * 10000), 0);
    totalExpensesEl.textContent = `Rp ${totalNominal.toLocaleString("id-ID")}`;
  }

  // Setup Chart.js Doughnut Chart
  const ctxPie = document.getElementById("expenses-pie-chart").getContext("2d");
  let pieChart = new Chart(ctxPie, {
    type: "doughnut",
    data: {
      labels: categories.map(cat => cat.name),
      datasets: [{
        data: categories.map(cat => cat.percentage),
        backgroundColor: categories.map(cat => cat.color),
        borderWidth: 0,
      }]
    },
    options: {
      cutout: "75%",
      responsive: true,
      plugins: {
        legend: { display: false },
      }
    }
  });

  function updateChart() {
    pieChart.data.labels = categories.map(cat => cat.name);
    pieChart.data.datasets[0].data = categories.map(cat => cat.percentage);
    pieChart.data.datasets[0].backgroundColor = categories.map(cat => cat.color);
    pieChart.update();
  }

  // Modal logic
  const modal = document.getElementById("editModal");
  const btn = document.querySelector(".btn-edit-expenses");
  const span = document.querySelector(".close");

  btn.onclick = () => modal.style.display = "block";
  span.onclick = () => modal.style.display = "none";
  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
  };

  // Form handler
  document.getElementById("editForm").onsubmit = function (event) {
    event.preventDefault();
    const category = document.getElementById("category").value;
    const percentage = parseFloat(document.getElementById("percentage").value);

    const currentTotal = categories.reduce((sum, c) => sum + c.percentage, 0);

    // Jika total lebih dari 100, sesuaikan kategori lain
    const newTotal = currentTotal + percentage;
    if (newTotal > 100) {
      const excess = newTotal - 100;
      categories.forEach(c => {
        const reduction = (c.percentage / currentTotal) * excess;
        c.percentage -= reduction;
      });
    }

    categories.push({
      name: category,
      percentage,
      color: getRandomColor()
    });

    renderLegend();
    updateChart();
    modal.style.display = "none";
    this.reset();
  };

  // Initial render
  renderLegend();
  updateChart();

// Fungsi search untuk transaction history
document.addEventListener('DOMContentLoaded', function() {
  const searchBox = document.querySelector('.search-box');
  const tableRows = document.querySelectorAll('.history-table tbody tr');
  
  // Event listener untuk input search
  searchBox.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    // Loop semua baris tabel
    tableRows.forEach(row => {
      const rowText = row.textContent.toLowerCase();
      
      // Tampilkan atau sembunyikan baris berdasarkan pencarian
      if (rowText.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
    
    // Tampilkan pesan jika tidak ada hasil
    showNoResults(searchTerm);
  });
  
  // Fungsi untuk menampilkan pesan "tidak ditemukan"
  function showNoResults(searchTerm) {
    const visibleRows = Array.from(tableRows).filter(row => 
      row.style.display !== 'none'
    );
    
    let noResultsRow = document.querySelector('.no-results-message');
    
    if (searchTerm && visibleRows.length === 0) {
      if (!noResultsRow) {
        noResultsRow = document.createElement('tr');
        noResultsRow.className = 'no-results-message';
        noResultsRow.innerHTML = `
          <td colspan="5" style="text-align: center; padding: 20px; color: #999;">
            No transactions found for "${searchTerm}"
          </td>
        `;
        document.querySelector('.history-table tbody').appendChild(noResultsRow);
      }
    } else if (noResultsRow) {
      noResultsRow.remove();
    }
  }
});




