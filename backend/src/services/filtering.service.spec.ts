/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilteringService } from './filtering.service';

describe('Service: Filtering', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilteringService]
    });
  });

  it('should ...', inject([FilteringService], (service: FilteringService) => {
    expect(service).toBeTruthy();
  }));
});
