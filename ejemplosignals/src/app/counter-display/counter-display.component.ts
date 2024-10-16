import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-display.component.html',
  styleUrls: ['./counter-display.component.css']
})
export class CounterDisplayComponent {
  @Input() counter!: () => number;
  @Input() squareCounter!: () => number;
  @Input() multipliedCounter!: () => number;
  @Input() isCounterEven!: () => boolean;
}