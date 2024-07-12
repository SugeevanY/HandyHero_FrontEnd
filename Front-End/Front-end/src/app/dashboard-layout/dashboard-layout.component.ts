import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  role:any=''
  active:string = ''
  constructor(private router:Router) {
    this.role = localStorage.getItem('role')
    this.updateActiveState();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveState();
      }
    });
  }

  updateActiveState() {
    let currentUrl = this.router.url;
    let urlSegment: string[] = currentUrl.split('/');
    let lastPart = urlSegment[2];
    this.active = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  }
  isDrawerItemActive(drawerItemText: string): boolean {
    return drawerItemText == this.active;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/auth/login"])
  }

}
