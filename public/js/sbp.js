document.addEventListener('DOMContentLoaded', function() {
  // Fetch data from the API endpoint
  fetch('../sales_by_product')
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

      // Extracting product names and total quantity sold from the fetched data
      const products = data.map(item => item.product);
      const totalQuantitySold = data.map(item => item.total_quantity_sold);
      const totalValueSold = data.map(item => item.total_value_sold);

      // Chart.js setup for sales by product
      const ctx = document.getElementById('salesByProductChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: products,
          datasets: [{
            label: 'Sales by Product',
            data: totalQuantitySold,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },             {
            label: 'Value by Product',
            data: totalValueSold,
            backgroundColor: 'rgba(255, 199, 132, 0.2)',
            borderColor: 'rgba(255, 199, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Totals Sold'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Products'
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