import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class FilteringService {

  private fibonacciSequence: number[];

  constructor() {
    // Generate the Fibonacci Sequence up to 100
    this.fibonacciSequence = this.generateFibonacci(100);
  }

  // Fibonacci Sequence Up to a Certain Number
  public generateFibonacci(limit: number): number[] {
    const sequence: number[] = []

    let n1 = 0, n2 = 1, nextTerm;

    nextTerm = n1 + n2;

    while (n1 <= limit) {
      sequence.push(n1);

      nextTerm = n1 + n2;
      n1 = n2;
      n2 = nextTerm;
    }

    return sequence;

  }

  // Filter number based on Fibonacci sequence
  filterNumber(num: number): Observable<any> {

    //  Return to 100 if the number is greater than or equal to 100
    if (num >= 100) {
      num = 100;
    }

    // Return the near more fibonacci sequence number via map
    return of(num).pipe(
      map(num => this.findNearMoreFibonacci(num)))

  }

  // Find the near more Fibonacci number
  private findNearMoreFibonacci(num: number): number {
    // Initialize the nearMore of type number or undefined
    let nearMore: number | undefined;

    // Loop through the Fibonacci sequence
    for (const fibonacciNum of this.fibonacciSequence) {
      // console.log("fibnum:", fibonacciNum); // for debugging

      // Compare the number with each Fibonacci number
      if (fibonacciNum >= num) {
        // If the Fibonacci number is greater than num, 
        // keep it as a candidate
        nearMore = fibonacciNum;
        // console.log("nearMore:", nearMore) // for debugging

        // Exit the loop after finding the more near
        break;
      }
    }

    return nearMore !== undefined ? nearMore : 100; // Return  if not number found

  }

}
