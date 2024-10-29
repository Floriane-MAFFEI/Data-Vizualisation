import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Defines the shape of the object to be received
interface ApiResponse {
  data: number[];
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [FormsModule],
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

  public newUsername: string = ''; // Property for new username

  // Injection into constructor for initialization
  constructor(private http: HttpClient, private router: Router, public authService: AuthService) {
    // Register Chart.js plugins on initialization 
    Chart.register(...registerables);
  }

  ngOnInit() {
    // Checks if a user is logged in
    if (!this.authService.isLoggedIn()) {
      // Redirect to login page if not logged in 
      this.router.navigate(['login']);
    } else {
      // data recovery call all 5 seconds
      this.fetchData();
      this.intervalId = setInterval(() => this.fetchData(), 5000);
      // console.log(this.authService.getUsername()); // for debug
    }
  }

  // Method to update name without register it in BDD
  public updateUsername() {
    if (this.newUsername) {
      this.authService.updateUsername(this.newUsername);
      this.newUsername = ''; // Reset the input field
      // alert(`Nom d'utilisateur mis à jour en : ${this.authService.getUsername()}`); // for debug
    }
  }

  public logout() {
    // Call the Auth service method
    this.authService.logout();
    this.router.navigate(['login']); // Redirect to login page
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

    // Event on click on chart
    ctx.onclick = (event) => {
      // Retrieve point nearest to the click
      const activePoints = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
      // check if points clicked
      if (activePoints.length > 0) {

        const clickedIndex = activePoints[0].index; // Get the index of the clicked point

        // Find matching index in visible raw values (all data (number) - visible element (number) + index of the clicked point (number) )
        const actualIndex = this.rawValues.length - this.visibleElement + clickedIndex;

        const newValue = this.filteredValues[actualIndex]; // Retrieve the filtered value corresponding to the previously obtained index

        // Update raw value with filtered value
        this.rawValues[actualIndex] = newValue;

        this.updateChart(); // Update the chart
      };

    };
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
