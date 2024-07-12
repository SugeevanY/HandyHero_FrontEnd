import { Component } from '@angular/core';
import {NgStyle} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router ,RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    NgStyle,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

  layoutTitle = '';
  backGroundImage: string = 'assets/images/main_background.png'

  constructor(private router: Router) {
    let currentUrl = this.router.url;
    let urlSegment: string[] = currentUrl.split('/');
    let lastPart: string = urlSegment[urlSegment.length - 1];

    if (lastPart == 'login') {
      this.layoutTitle = 'Login';
    } else if (lastPart == 'signup') {
      this.layoutTitle = 'Signup'
    } else if (lastPart == 'OTP-Verification') {
      this.layoutTitle = "Confirmation"
    } else if (lastPart == 'ForgotPassword') {
      this.layoutTitle = 'Forgot Password';
    } else if (lastPart == 'ResetPassword') {
      this.layoutTitle = 'ChangePassword';
    }
  }
}






