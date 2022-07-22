import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

interface Interface {
  title: string;
  desc?: string;
}

enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

type OtherDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

@Component({
  selector: 'app-flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  aBoolean = true;
  aString: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  aNumber = 0;

  someStrings: string[] = [];
  numberOrString: number | string;

  @Output() eventEmitter = new EventEmitter<void>();

  constructor() {
    this.aBoolean = !!'string';
    console.warn('constructor');

    this.numberOrString = '2';
    this.numberOrString = 2;

    const i: Interface = { title: 'title' };

    this.takeMyInput(1);
    this.takeMyInput(1, '1');

    console.log(this.aNumber?.toString());

    if (this.aNumber !== null && this.aNumber !== undefined) {
      console.log(this.aNumber.toString());
    } else {
      console.log(this.aNumber);
    }

    const myEnum: Direction = Direction.DOWN;
    const myType: OtherDirection = 'UP';

    console.log(myEnum);
  }

  ngOnInit(): void {
    console.log('initialized');
  }

  ngOnDestroy(): void {
    console.log('destroyed');
  }

  takeMyInput(sth: number, numberOrString: number | string = '1'): number | Function {
    if (typeof numberOrString === 'number') {
      return numberOrString;
    } else {
      return (numberOrString) => numberOrString;
    }
  }
}
