import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MakeComplaintService} from "../../Services/common/make-complaint.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FieldWorkerHandleService} from "../../Services/Admin/field-worker-handle.service";

@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.css'
})
export class ComplaintComponent implements OnInit{

  role: any = '';
  email = '';
  name = '';
  complaint = '';

  emailError = '';
  complaintError = '';

  complaints: any[] = [];

  constructor(private makeComplaintService: MakeComplaintService, private workerHandle: FieldWorkerHandleService) {
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    let role = localStorage.getItem('role') ?? '';
    if (role === 'admin') {
      this.makeComplaintService.getAllComplaint().subscribe(
        (data: any) => {
          this.complaints = data.body;
          console.log(this.complaints)
        },
        (error) => {
          console.error("error while get data", error);
        }
      );
    }
  }


  onEmailChange(event:any){
    this.email = event.target.value;

    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(this.email)){
      this.emailError = "";
    }else if (this.email === ''){
      this.emailError = "You must want to provide email"
    }
    else {
      this.emailError = "Please enter a valid email"
    }
  }

  onNameChange(event:any){
    this.name = event.target.value;
  }

  onComplaintChange(event:any){
    this.complaint = event.target.value;

    if (this.complaint === ''){
      this.complaintError = "You muster enter any complaint"
    }else {
      this.complaintError = '';
    }
  }


  onComplaint() {
    if (this.complaintError === '' && this.emailError === '') {
      let complainant = localStorage.getItem('Id');
      if (complainant != null){
        this.makeComplaintService.makeComplaint(parseInt(complainant),this.email,this.complaint).subscribe(
          (response) => {
            console.log("complaint succes");
            this.email = "";
            this.complaint = "";
            alert("Your Complaint is successfully submitted to Admin")
          },
          (error) => {
            console.error("Error while complaint", error)
          }
        );
      }else {

      }
    } else {
      console.log("Please fill all fields");
    }
  }

  blockedList: any[] = [];

  isBlock(mail:string){
    return this.blockedList.includes(mail);
  }
  block(email: string) {
    let userId = Number(localStorage.getItem('Id'));
    this.workerHandle.block(userId, email).subscribe(
      (response) => {
        console.log("Blocked successfully:", email);
      },
      (error) => {
        console.error("Error while blocking:", error);
        // Optionally, handle error here
      }
    );
  }




}

