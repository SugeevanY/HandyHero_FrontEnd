import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');

    if (role === 'customer' || role === 'fieldWorker' || role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/auth/login']).then(r => {
        console.log('Failed login')
      });
      return false;
    }
  }
}
