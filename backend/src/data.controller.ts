import { Controller, Get } from '@nestjs/common';
import { FakeProbeService } from './services/fake-probe.service';
import { FilteringService } from './services/filtering.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('data')
export class DataController {
  constructor(
    private readonly fakeProbeService: FakeProbeService,
    private readonly filteringService: FilteringService,
  ) {
    this.fakeProbeService.startEmittingRandomNumbers();
  }

  // Path with GET to return raw data
  @Get()
  getRawData() {
    const rawData = this.fakeProbeService.getRawData();
    // console.log('Raw data:', rawData); // For debugging
    return { data: rawData };
  }

  // Path with GET to return filtered data
  @Get('filtered')
  getFilteredData(): Observable<any> {
    // Retrieve raw data form the FakeProbeService
    const rawData = this.fakeProbeService.getRawData();

    // For each number (rawData), filter via filterNumber of the filteringService
    const filteredData = rawData.map(num => this.filteringService.filterNumber(num));

    // Wait for filteredData to provide results
    return forkJoin(filteredData).pipe(
      // Create an object that contains the filtered data
      map(filteredData => ({ data: filteredData }))
    );
  }
}
