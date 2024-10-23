/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FilteringService } from './filtering.service';
import { TestingModule, Test } from '@nestjs/testing';

describe('FilteringService', () => {
  let service: FilteringService;

  // Configure before each tests (new instance)
  beforeEach(async () => {
    // Create a test module
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilteringService],
    }).compile();

    service = module.get<FilteringService>(FilteringService);
  });

  it('should generate the Fibonacci sequence up to a limit : 100 ', () => {
    const limit = 100;
    const expectedSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

    const generatedSequence = service.generateFibonacci(limit);

    expect(generatedSequence).toEqual(expectedSequence)

  });

  it('should generate the Fibonacci sequence up to a limit : 250 ', () => {
    const limit = 250;
    const expectedSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

    const generatedSequence = service.generateFibonacci(limit);

    expect(generatedSequence).toEqual(expectedSequence)

  });

});
