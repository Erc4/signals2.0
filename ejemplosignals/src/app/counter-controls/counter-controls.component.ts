import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css']
})
export class CounterControlsComponent {
  @Input() multiplier!: () => number;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() updateMultiplier = new EventEmitter<number>();

  onMultiplierChange(value: string) {
    const numValue = parseInt(value);
    this.updateMultiplier.emit(isNaN(numValue) ? 1 : numValue);
  }
}