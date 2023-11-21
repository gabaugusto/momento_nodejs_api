document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from the API endpoint
    fetch('../sales_over_time')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }

        // Extracting dates and total sales from the fetched data
        const dates = data.map(item => item.date);
        const totalSales = data.map(item => item.total_sales);
        console.log(dates);
        console.log(totalSales);

        // Chart.js setup
        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: 'Total Sales Over Time',
              data: totalSales,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day' // You can adjust this as needed (day, month, year)
                },
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Total Sales'
                }
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error fetching or processing data:', error);
      });
  });