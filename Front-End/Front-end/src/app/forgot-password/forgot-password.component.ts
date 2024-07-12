import { Component, ViewChild } from '@angular/core';
import { NgIf, NgStyle } from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { ForgotPasswordService } from "../../Services/forgot-password.service";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    NgStyle,
    FormsModule,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @ViewChild("forgotPasswordForm") forgotPasswordForm!: NgForm;

  email = '';
  emailError = '';

  constructor(private forgotPasswordService: ForgotPasswordService, private router: Router) {
  }

  onEmailChange(event: any) {
    this.email = event.target.value;
    if (this.email.trim() === '') {
      this.emailError = "This is a required field";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = "Please enter a valid email";
      } else {
        this.emailError = "";
      }
    }
  }

  sendVerificationCode() {
    console.log(this.email);
    if (this.emailError.trim() === '') {
      this.forgotPasswordService.sendVerificationCode(this.email).subscribe(
        (response) => {
         if(response.message="Code_Sent"){
           alert("A Verification Code has been sent to your email.");
           this.router.navigate(['auth/OTP-Verification'])
         }
         else {
           console.log("Some thing went wrong try again later")
         }
          this.email = "";

        },
        (error) => {
          console.log('Error Sending Verification Code', error);
          alert("Failed to send Verification Code, Please try again.");
        }
      );
    } else {
      console.log("Some errors there");
      console.log(this.emailError);
    }
  }
}
