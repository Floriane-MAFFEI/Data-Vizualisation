import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

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

}