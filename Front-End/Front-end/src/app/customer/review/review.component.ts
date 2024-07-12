import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgIf, NgForOf } from "@angular/common";
import { ReviewService } from "../../../Services/common/review.service";
import { FieldWorkerService } from "../../../Services/fieldworker.service";
import {StarRatingComponent} from "../../star-rating/star-rating.component";

@Component({
  selector: 'app-review',
  standalone: true,
    imports: [
        NgIf,
        NgForOf,
        StarRatingComponent
    ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {



  role: any = '';
  reviewId='';
  email = '';
  reviewText ='';
  reviewerId ='';
  ratingValue ='';

  review = '';
  emailError = '';
  reviewError = '';
  reviews: any[] = [];

  constructor(private reviewService: ReviewService, private fieldWorkerService: FieldWorkerService) {
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    if (this.role === 'fieldWorker') {
      this.fieldWorkerService.getFieldWorkerReviews().subscribe(
        (data: any) => {
          this.reviews = data.body;
        },
        (error) => {
          console.error("Error while fetching reviews", error);
        }
      );
    }
  }

  onEmailChange(event: any) {
    this.email = event.target.value;
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(this.email)) {
      this.emailError = "";
    } else if (this.email === '') {
      this.emailError = "You must provide an email";
    } else {
      this.emailError = "Please enter a valid email";
    }
  }

  onReviewChange(event: any) {
    this.review = event.target.value

    if (this.review === '') {
      this.reviewError = "You must enter a review";
    } else {
      this.reviewError = '';
    }
  }


  onSubmitReview() {
    if (this.reviewError === '' && this.emailError === '') {
      console.log("Review submitted successfully");
      let reviewerId = localStorage.getItem('Id');
      let reviewId = "5";
      console.log(reviewerId);
      if (reviewerId != null) {
        console.log("Review submitted successfully");
        console.log('Review ID:', reviewId); // Log to check
        console.log('Reviewer ID:', reviewerId);// Log to check
        console.log('Email:', this.email); // Log to check
        console.log('Review Text:', this.review);
        console.log('Review Rating:', this.rating)
        this.reviewService.submitReview( parseInt(reviewerId), this.email,this.review, "2024-07-01T00:00:00Z",this.rating.toString()).subscribe(
          (response) => {
            console.log("Review submitted successfully");
            this.email = "";
            this.review = "";
            alert("Your review has been successfully submitted");
          },
          (error) => {
            console.error("Error while submitting review", error);
          }
        );
      }
    } else {
      console.log("Please fill all fields");
    }
  }
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  setRating(rating: number) {
    this.rating = rating;
    this.ratingChange.emit(rating);
  }





}
