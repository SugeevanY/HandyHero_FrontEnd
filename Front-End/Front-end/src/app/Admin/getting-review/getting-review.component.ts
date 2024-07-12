// admin-review.component.ts
import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf } from "@angular/common";
import { ReviewService } from "../../../Services/common/review.service";

@Component({
  selector: 'app-getting-review',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './getting-review.component.html',
  styleUrl: './getting-review.component.css'
})
export class GettingReviewComponent implements OnInit {

  role: any = '';
  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    this.role = localStorage.getItem('role') ?? '';
    if (this.role === 'admin') {
      this.reviewService.getAllReviews().subscribe(
        (data: any) => {
          this.reviews = data.body;
          console.log(this.reviews);
        },
        (error) => {
          console.error("Error while fetching reviews", error);
        }
      );
    }
  }
}
