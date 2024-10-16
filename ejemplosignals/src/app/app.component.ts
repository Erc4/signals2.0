import { Component, signal, computed, effect, untracked, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterDisplayComponent } from './counter-display/counter-display.component';
import { CounterControlsComponent } from './counter-controls/counter-controls.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map, take } from 'rxjs';

interface CounterState {
  value: number;
  lastUpdated: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CounterDisplayComponent, CounterControlsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Mutable signal
  counterState = signal<CounterState>({ value: 0, lastUpdated: new Date() });
  
  // Regular signals
  multiplier = signal(2);
  
  // Computed signals
  counter = computed(() => this.counterState().value);
  squareCounter = computed(() => this.counter() * this.counter());
  multipliedCounter = computed(() => this.counter() * this.multiplier());
  isCounterEven = computed(() => this.counter() % 2 === 0);
  
  // Async signal
  asyncCounter: Signal<number>;
  
  constructor() {
    // Effect
    effect(() => {
      console.log(`Counter updated to: ${this.counter()}`);
    });
    
    // Async signal
    this.asyncCounter = toSignal(
      interval(1000).pipe(
        take(10),
        map(x => x + 1)
      ),
      { initialValue: 0 }
    );
  }
  
  increment() {
    this.counterState.update(state => ({
      value: state.value + 1,
      lastUpdated: new Date()
    }));
  }

  decrement() {
    this.counterState.update(state => ({
      value: state.value - 1,
      lastUpdated: new Date()
    }));
  }

  reset() {
    this.counterState.set({ value: 0, lastUpdated: new Date() });
  }

  updateMultiplier(value: number) {
    this.multiplier.set(value);
    // Using untracked
    console.log(`Multiplier updated to: ${value}, current counter: ${untracked(this.counter)}`);
  }
  
  getLastUpdated(): Date {
    return this.counterState().lastUpdated;
  }
}