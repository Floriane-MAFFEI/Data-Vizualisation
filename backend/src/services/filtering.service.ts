import { Injectable } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class FilteringService {

  private fibonacciSequence: number[];

  constructor() {
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
    return of(num).pipe(
      map(num => {
        if (num >= 100) {
          return 100;
        } else {
          return "OK"
        }
      })
    )
    //TODO Return the near more fibonacci sequence number via map

  }

  // TODO: Find the near more Fibonacci number
  // TODO: Initialize the counter (near more)
  // TODO: Loop through the Fibonacci sequence
  // TODO: Compare the number with each Fibonacci number
  // TODO: If the Fibonacci number is greater than num, keep it as a candidate
  // TODO: If the Fibonacci number is less than or equal to num, update the near more
}