import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {OtpverificationService} from "../../Services/otpverification.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-otpverification',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OTPVerificationComponent {
  otp: string[] = ['', '', '', '', '', ''];

  otpCode='';
  otpCodeError='';

  constructor(
    private OtpverificationService: OtpverificationService,
    private router: Router
  ) {}

  moveToNext(currentInput: HTMLInputElement, nextInput: HTMLInputElement | null, prevInput: HTMLInputElement | null) {
    const maxLength = parseInt(currentInput.getAttribute('maxlength') || '0', 10);
    const currentLength = currentInput.value.length;
    this.otpCode+=currentInput.value

    if (currentLength >= maxLength && nextInput !== null) {
      nextInput.focus();
    } else if (currentLength === 0 && prevInput !== null) {
      prevInput.focus();
    }
  }

  verifyOtp() {
    console.log(this.otpCode);
    if(this.otpCodeError.trim() === ''){
    this.OtpverificationService.verifyOtp(this.otpCode).subscribe(
      response => {
        if (response.message === 'OTP_Verified') {
          alert('OTP Verified Successfully');
          this.router.navigate(['auth/ResetPassword']); // Update this route as needed

        } else {
          console.log("Some thing went wrong try again later")

        }
        this.otpCode="";



      },
      error => {
        console.error('Error verifying OTP', error);
        alert('Failed to verify OTP. Please try again.');
      }
    );
  } else {
      console.log("Some errors there");
      console.log(this.otpCodeError);
    }
  }
}

