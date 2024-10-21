import { Injectable } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable() // can be injected as a dependency
export class FakeProbeService {
  private rawData: number[] = []; // Array to store issued numbers

  constructor() { }

  // Method to start emitting random numbers
  startEmittingRandomNumbers() {
    // Subscription to start receiving numbers
    this.getRandomNumber().subscribe((randomNum) => {
    });
  }

  // Method for emitting random numbers
  getRandomNumber(): Observable<number> {
    return interval(this.getRandomIntegerOrTime(2000, 4000)).pipe(
      map(() => {
        // On each broadcast, generate a random number 
        const randomNum = this.getRandomIntegerOrTime(-10, 150);
        // and add it to rawData
        this.rawData.push(randomNum);
        return randomNum;
      })
    );
  }

  // Method to obtain raw data emitted
  getRawData(): number[] {
    return this.rawData;
  }

  // Private method to generate a random integer between min and max
  private getRandomIntegerOrTime(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Return a random integer
  }

} 