// Counter value
let counter = 0;

// Increment counter button
const incrementBtn = document.getElementById('increment-btn');

// Counter display
const counterDisplay = document.getElementById('counter');

// Hours left display
const hoursLeftDisplay = document.getElementById('hours-left');

// Increment counter function
incrementBtn.addEventListener('click', () => {
    counter++;
    counterDisplay.textContent = counter;
    updateHoursLeft();
    updateMilestones();
    renderCharts();
});

// Function to update hours left display
function updateHoursLeft() {
    const hoursLeft = 10000 - counter;
    hoursLeftDisplay.textContent = `Hours Left: ${hoursLeft}`;
}

// Function to update milestones
function updateMilestones() {
    const milestonesList = document.getElementById('milestones-list');
    milestonesList.innerHTML = ''; // Clear existing milestones
    // Define milestones (hours and description)
    const milestones = [
        { hours: 1000, description: 'Reached 1000 hours' },
        { hours: 5000, description: 'Reached 5000 hours' },
        { hours: 10000, description: 'Congratulations! Completed 10000 hours' }
    ];
    // Add milestones to the list
    milestones.forEach(milestone => {
        if (counter >= milestone.hours) {
            const listItem = document.createElement('li');
            listItem.textContent = milestone.description;
            milestonesList.appendChild(listItem);
        }
    });
}

// Function to render charts
function renderCharts() {
    // Render the pie chart
    renderPieChart();

    // Render the line chart
    renderLineChart();
}

// Function to render the pie chart
function renderPieChart() {
    var ctx = document.getElementById('pie-chart').getContext('2d');
    if (window.pieChart) {
        window.pieChart.data.datasets[0].data[0] = counter;
        window.pieChart.data.datasets[0].data[1] = 10000 - counter;
        window.pieChart.update();
    } else {
        window.pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Completed', 'Remaining'],
                datasets: [{
                    data: [counter, 10000 - counter],
                    backgroundColor: ['#007bff', '#f2f2f2']
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Progress Pie Chart'
                }
            }
        });
    }
}

// Function to render the line chart
function renderLineChart() {
    var ctx = document.getElementById('line-chart').getContext('2d');
    if (window.lineChart) {
        window.lineChart.data.datasets[0].data[1] = counter;
        window.lineChart.update();
    } else {
        window.lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['0', '1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000', '10000'],
                datasets: [{
                    label: 'Hours Progress',
                    data: [0, counter],
                    backgroundColor: '#007bff',
                    borderColor: '#007bff',
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Progress Line Chart'
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Total Hours'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Hours Completed'
                        }
                    }]
                }
            }
        });
    }
}

