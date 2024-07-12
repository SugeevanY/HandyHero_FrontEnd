import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { StarRatingComponent } from "../../star-rating/star-rating.component";
import { FindWorkerService } from "../../../Services/Customer/find-worker.service";
import * as bootstrap from 'bootstrap';
import {HireModalComponent} from "../../hire-modal/hire-modal.component";

@Component({
  selector: 'app-find',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    StarRatingComponent,
    HireModalComponent
  ],
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  noProfilePhoto = "https://res.cloudinary.com/dpmqdx02n/image/upload/v1711616632/noProfile_jwjkro.jpg";

  districts: { name: string, number: number }[] = [
    {name: 'Colombo', number: 1},
    {name: 'Gampaha', number: 2},
    {name: 'Kalutara', number: 3},
    {name: 'Kandy', number: 4},
    {name: 'Matale', number: 5},
    {name: 'Nuwara Eliya', number: 6},
    {name: 'Galle', number: 7},
    {name: 'Matara', number: 8},
    {name: 'Hambantota', number: 9},
    {name: 'Jaffna', number: 10},
    {name: 'Kilinochchi', number: 11},
    {name: 'Mannar', number: 12},
    {name: 'Vavuniya', number: 13},
    {name: 'Mullaithivu', number: 14},
    {name: 'Batticaloa', number: 15},
    {name: 'Ampara', number: 16},
    {name: 'Trincomalee', number: 17},
    {name: 'Kurunegala', number: 18},
    {name: 'Puttalam', number: 19},
    {name: 'Anuradhapura', number: 20},
    {name: 'Polonnaruwa', number: 21},
    {name: 'Badulla', number: 22},
    {name: 'Monaragala', number: 23},
    {name: 'Ratnapura', number: 24},
    {name: 'Kegalle', number: 25}
  ];

  rating: string[] = ['5-star', '4-star', '3-star', '2-star', '1-star'];

  selectedDistrict: string = '';
  selectedRating: string = '';

  employees: any[] = [];
  employeesStatistic: any[] = [];



  selectedEmployeeId: string = "";

  constructor(private findWorkerService: FindWorkerService) { }

  ngOnInit() {
    this.loadWorkers();
  }

  loadWorkers() {
    this.findWorkerService.getAllWorkers().subscribe(
      (data: any[]) => {
        console.log(data)
        this.employees = data.filter(worker => worker.status === 'true');
        this.employeesStatistic = data.filter(worker => worker.status === 'true');
        this.filterEmployees();

        console.log(this.employeesStatistic)
      },
      (error) => {
        console.error("Error while getting workers", error);
      }
    );
  }

  onDistrictSortChange(event: any) {
    this.selectedDistrict = event.target.value;
    this.filterEmployees();
  }

  onRatingChange(event: any) {
    this.selectedRating = event.target.value;
    this.filterEmployees();
  }

  filterEmployees() {
    const districtFilter = this.selectedDistrict !== '' ?
      (employee: any) => employee.district === this.selectedDistrict :
      () => true;

    const ratingFilter = this.selectedRating !== '' ?
      (employee: any) => employee.rating === this.convertRatingToInt(this.selectedRating) :
      () => true;

    this.employees = this.employees.filter(employee => districtFilter(employee) && ratingFilter(employee));
  }

  searchWord = "";
  onSearchChange(event:any){
    this.searchWord = event.target.value
    this.searchEmployee();
  }
  searchEmployee() {
    if (this.searchWord.trim() === '') {
      this.loadWorkers();
      return;
    }

    const searchFilter = (employee: any) =>
      employee.workType.toLowerCase().includes(this.searchWord.toLowerCase());

    this.employees = this.employeesStatistic.filter(searchFilter);
  }

  openHireModal(employeeId: string) {
    this.selectedEmployeeId = employeeId;
    const modalElement = document.getElementById('hireModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found!');
    }
  }


  convertRatingToInt(ratingValue: string): number {
    switch (ratingValue) {
      case '5-star':
        return 5;
      case '4-star':
        return 4;
      case '3-star':
        return 3;
      case '2-star':
        return 2;
      case '1-star':
        return 1;
      default:
        return 0;
    }
  }
}
