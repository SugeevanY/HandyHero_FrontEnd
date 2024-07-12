import { Component } from '@angular/core';
import {NgStyle} from "@angular/common";
import { Router } from '@angular/router';
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {


  constructor(private router : Router) {
  }

  backGroundImage = 'assets/images/main_background.png'

  letsStart(): void{
    this.router.navigate(['/auth/login'])
  }
}
