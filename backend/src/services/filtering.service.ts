import { Injectable } from '@nestjs/common';

@Injectable()
export class FilteringService {

  private fibonacciSequence: number[];

  // Fibonacci Sequence Up to a Certain Number
  public generateFibonacci(n: number): number[] {
    const limit = 100;

    let n1 = 0, n2 = 1, nextTerm;

    nextTerm = n1 + n2;

    while (nextTerm <= limit) {

      n1 = n2;
      n2 = nextTerm;
      nextTerm = n1 + n2;
    }

    nextTerm.push(this.fibonacciSequence);

    return this.fibonacciSequence;

  }
}