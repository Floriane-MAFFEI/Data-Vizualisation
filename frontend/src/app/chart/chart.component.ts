import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

// Defines the shape of the object to be received
interface ApiResponse {
  data: number[];
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  // URL of API to retrieve data
  private rawApiUrl = 'http://localhost:3000/data';
  private filteredApiUrl = 'http://localhost:3000/data/filtered'

  // Initialize variables
  public chart: any;
  private intervalId: any;
  private labels: string[] = [];
  private rawValues: number[] = [];
  private filteredValues: number[] = [];

  // Declaration of a variable for the number of visible elements
  private visibleElement: number = 15;

  // Injection into constructor for initialization
  constructor(private http: HttpClient) {
    // Register Chart.js plugins on initialization 
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.fetchData(); // Fetch data on initialization
    this.intervalId = setInterval(() => this.fetchData(), 3000); // Data update every 3 seconds
  }


  // Data recovery method
  private fetchData() {
    // Call the HttpClient method via the get() method
    // .susbscribe enables to manage errors 
    this.http.get<ApiResponse>(this.rawApiUrl).subscribe(
      response => {
        this.rawValues = response.data; // Retrieve raw data
        // console.log(this.rawValues)
        this.labels = this.rawValues.map((index) => `Label ${index + 1}`); // Create labels //! False Labels
        // console.log('label:', this.labels)
        this.fetchFilteredData(); // Fetch also filtered data      
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  private fetchFilteredData() {
    // Fetch filtered data from the API
    this.http.get<ApiResponse>(this.filteredApiUrl).subscribe(
      response => {
        this.filteredValues = response.data; // Store filtered data
        this.updateChart(); // Update the chart with new data
      },
      error => {
        console.error('Error fetching filtered data', error);
      }
    );
  }


  private updateChart() {
    const displayedRawValues = this.rawValues.slice(-this.visibleElement); // Get recent raw values
    const displayedLabels = this.labels.slice(-this.visibleElement); // Get recent labels //! Previous Error to be corrected

    // If chart exists, update it
    if (this.chart) {
      // Data recovery
      this.chart.data.labels = displayedLabels;
      this.chart.data.datasets[0].data = displayedRawValues;
      this.chart.data.datasets[1].data = this.filteredValues.slice(-this.visibleElement);
      this.chart.update(); // Update Chart
    } else {
      // If chart does not exist, create it
      this.createChart(displayedLabels, displayedRawValues);
    }
  }

  // Method for creating the graph
  private createChart(labels: string[], rawValues: number[]) {

    // Retrieves the canvas's contenar
    const ctx = document.getElementById('combinedChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Raw Data',
            data: this.rawValues,
            backgroundColor: 'rgba(50, 165, 217, 0.2)',
            borderColor: 'rgba(50, 165, 217, 1)',
            borderWidth: 2,
          },
          {
            label: 'filtered Data',
            data: this.filteredValues.slice(-this.visibleElement),
            backgroundColor: 'rgba(30,62,105, 0.2)',
            borderColor: 'rgba(30,62,105, 1)',
            borderWidth: 2,
          }
        ]
      },
      options: {
        scales: {
          x: {
            ticks: { display: false }, // Hide labels
            grid: { display: false } // Hide grid
          },
          y: {
            beginAtZero: true,
            min: -15,
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  // Method to load more data
  public loadMoreData() {
    this.visibleElement += 15; // Increase number of displayed data points
    this.updateChart(); // Update the chart with new data
  }

  // Method to load less data
  public loadLessData() {
    if (this.visibleElement > 15) {
      this.visibleElement -= 15; // Decrease number of displayed data points
      this.updateChart(); // Update the chart with reduced data
    }
  }
}
