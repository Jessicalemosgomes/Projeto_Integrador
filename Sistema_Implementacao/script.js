document.addEventListener('DOMContentLoaded', function () {
  // Chart.js for the performance chart
  const ctx = document.getElementById('performanceChart').getContext('2d');

  const performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO'],
      datasets: [{
        label: 'VOLUME DE CHUVA ',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Chart.js for user statistics in the analytics area
  const userStatisticsCtx = document.getElementById('userStatisticsChart')?.getContext('2d');
  if (userStatisticsCtx) {
    const userStatisticsChart = new Chart(userStatisticsCtx, {
      type: 'line',
      data: {
        labels: ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO'],
        datasets: [{
          label: 'PONTOS DE ALAGAMENTO',
          data: [120, 150, 180, 220, 240, 300],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Chart.js for traffic sources in the analytics area
  const trafficSourcesCtx = document.getElementById('trafficSourcesChart')?.getContext('2d');
  if (trafficSourcesCtx) {
    const trafficSourcesChart = new Chart(trafficSourcesCtx, {
      type: 'doughnut',
      data: {
        labels: ['AREAS AFETADAS', 'CHUVA', 'TESTE', 'TESTES'],
        datasets: [{
          label: 'Traffic Sources',
          data: [300, 150, 100, 250],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  // Chart.js for performance overview in the analytics area
  const performanceOverviewCtx = document.getElementById('performanceOverviewChart')?.getContext('2d');
  if (performanceOverviewCtx) {
    const performanceOverviewChart = new Chart(performanceOverviewCtx, {
      type: 'bar',
      data: {
        labels: ['VOLUME DE CHUVAS ', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Revenue',
          data: [5000, 7000, 8000, 9000],
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Sidebar logic
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('closeSidebar');

  menuToggle.addEventListener('click', function () {
    sidebar.classList.add('active');
  });

  closeSidebar.addEventListener('click', function () {
    sidebar.classList.remove('active');
  });

  // Notifications dropdown logic
  const notifications = document.getElementById('notifications');
  const notificationDropdown = document.getElementById('notificationDropdown');

  notifications.addEventListener('click', function () {
    notifications.classList.toggle('active');
  });

  // Close dropdown when clicked outside
  window.addEventListener('click', function (e) {
    if (!notifications.contains(e.target)) {
      notifications.classList.remove('active');
    }
  });

  // Logic for switching main content
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.sidebar ul li');

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Hide all sections
      sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
      });

      // Show target section based on data-target attribute
      const target = this.getAttribute('data-target');
      const targetSection = document.getElementById(target);
      targetSection.style.display = 'block';
      targetSection.classList.add('active');
    });
  });


  const downloadButton = document.getElementById('downloadReport');

  downloadButton.addEventListener('click', function () {
    const table = document.querySelector('.reports-table');
    let csvContent = '';

    // Get headers
    const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent).join(',');
    csvContent += headers + '\n';

    // Get rows of data
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent).join(',');
      csvContent += rowData + '\n';
    });

    // Create CSV file for download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sales_report.csv';
    link.click();

    URL.revokeObjectURL(url);
  });


  const contactForm = document.getElementById('contactForm');
  const formConfirmation = document.getElementById('formConfirmation');

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Here you could send the form data to a backend
    // For this example, only a confirmation message is displayed

    contactForm.style.display = 'none'; // Hide form
    formConfirmation.style.display = 'block'; // Show confirmation message
  });
});