import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  constructor() {}

  filledStars(): number[] {
    return Array(this.rating).fill(0).map((x, i) => i);
  }

  emptyStars(): number[] {
    return Array(5 - this.rating).fill(0).map((x, i) => i);
  }
}



