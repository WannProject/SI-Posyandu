// Custom scripts for Posyandu Information System

document.addEventListener('DOMContentLoaded', function() {
  // Toggle sidebar on mobile
  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      document.body.classList.toggle('sidebar-toggled');
      document.querySelector('.sidebar').classList.toggle('toggled');
    });
  }

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Form validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function(form) {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Print report functionality
  const printButtons = document.querySelectorAll('.btn-print');
  printButtons.forEach(button => {
    button.addEventListener('click', function() {
      window.print();
    });
  });

  // Current date for forms
  const dateInputs = document.querySelectorAll('.current-date');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => {
    input.value = today;
  });

  // Dashboard charts (if Chart.js is loaded)
  if (typeof Chart !== 'undefined') {
    // Sample chart for dashboard
    const ctx = document.getElementById('growthChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Average Weight (kg)',
            data: [3.2, 4.5, 5.7, 6.8, 7.5, 8.2],
            borderColor: '#198754',
            backgroundColor: 'rgba(25, 135, 84, 0.1)',
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    const nutritionChart = document.getElementById('nutritionChart');
    if (nutritionChart) {
      new Chart(nutritionChart, {
        type: 'pie',
        data: {
          labels: ['Baik', 'Cukup', 'Kurang', 'Buruk'],
          datasets: [{
            data: [65, 20, 10, 5],
            backgroundColor: ['#198754', '#28a745', '#ffc107', '#dc3545']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }
});

// Confirmation dialog for delete actions
function confirmDelete(event, message = 'Apakah Anda yakin ingin menghapus data ini?') {
  if (!confirm(message)) {
    event.preventDefault();
    return false;
  }
  return true;
}

// Function to filter tables
function filterTable() {
  const input = document.getElementById('tableSearch');
  if (!input) return;
  
  const filter = input.value.toUpperCase();
  const table = document.querySelector('.table');
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    let shouldShow = false;
    const cells = rows[i].getElementsByTagName('td');
    
    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      if (cell) {
        const text = cell.textContent || cell.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
          shouldShow = true;
          break;
        }
      }
    }
    
    rows[i].style.display = shouldShow ? '' : 'none';
  }
}