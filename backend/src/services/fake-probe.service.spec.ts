import { Test, TestingModule } from '@nestjs/testing';
import { FakeProbeService } from './fake-probe.service';
import { doesNotMatch } from 'assert';

describe('FakeProbeService', () => {
  let service: FakeProbeService;

  // Configure before each tests (new instance)
  beforeEach(async () => {
    // Create a test module
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeProbeService],
    }).compile();

    service = module.get<FakeProbeService>(FakeProbeService);
  });

  // The service was successfully instantiated
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Checks that the service emits random numbers
  it('should emit random numbers', () => {
    // Initialize array for numbers emit
    const emittedNumbers: number[] = [];

    // Function call and subscription
    service.getRandomNumber().subscribe({
      next: (num) => emittedNumbers.push(num), // Addition to the table at each broadcast
      complete: () => {
        expect(emittedNumbers.length).toBeGreaterThan(0); // Once the function completes, check that the array is not empty and contains at least one element
      },
    });

    // Start emitting numbers to populate rawData
    service.startEmittingRandomNumbers();

    // Delay before execution control
    setTimeout(() => {
      expect(emittedNumbers.length).toBeGreaterThan(0); // Check that least 1 numbers have been emitted
    }, 10000); // 10 second delay before verification
  }, 15000); // Max delay at 15 seconds


  // Verifies that the service can return raw data
  it('should return raw data', () => {
    // Start emitting numbers
    service.startEmittingRandomNumbers();

    // Delay before execution control
    setTimeout(() => {

      // Call the function 
      const rawData = service.getRawData();
      expect(rawData.length).toBeGreaterThan(0); // Check that least 1 number have been emitted 
    }, 5000); // 5 second delay before verification
  });
});
