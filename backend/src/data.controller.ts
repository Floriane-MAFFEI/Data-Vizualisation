import { Controller, Get, Query } from '@nestjs/common';
import { FakeProbeService } from './services/fake-probe.service';

@Controller('data')
export class DataController {

  constructor(
    private readonly fakeProbeService: FakeProbeService,
  ) {
    // Start the data generation service when calling the DataController
    this.fakeProbeService.startEmittingRandomNumbers();
  }

  // Path with GET to return raw data
  @Get()
  getRawData() {
    const rawData = this.fakeProbeService.getRawData();
    // console.log('Raw data:', rawData); // For debugging
    return { data: rawData };
  }
}
