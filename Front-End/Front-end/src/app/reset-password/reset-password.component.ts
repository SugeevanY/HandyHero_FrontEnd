import {Component, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ResetPasswordService} from "../../Services/reset-password.service";
import {FormsModule, NgForm} from '@angular/forms';
import {NgIf, NgStyle} from "@angular/common";
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf,
    NgStyle
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  @ViewChild("resetPasswordForm") resetPasswordForm!: NgForm;

  newPassword = '';
  confirmPassword = '';
  passwordError = '';

  constructor(
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) {}

  onPasswordChange() {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match';
    } else {
      this.passwordError = '';
    }
  }

  resetPassword() {
    if (this.newPassword.trim() === '' || this.confirmPassword.trim() === '') {
      this.passwordError = 'Both fields are required';
      return;
    }

    if (this.passwordError.trim() === '') {
      this.resetPasswordService.resetPassword(this.newPassword).subscribe(
        (response) => {
          if (response.message === 'Password_Updated') {
            alert('Password updated successfully');
            this.router.navigate(['auth/login'])// Navigate to login page
          } else {
            console.log('Something went wrong. Try again later.');
          }
          this.newPassword="";
          this.confirmPassword="";
        },
        (error) => {
          console.log('Error resetting password', error);
          alert('Failed to reset password. Please try again.');
        }
      );
    }
  }
}
