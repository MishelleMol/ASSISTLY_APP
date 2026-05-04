import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ShopperGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('assistly_token');
    if (!token) {
      this.router.navigate(['']);
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.rol === 'shopper') {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    } catch {
      this.router.navigate(['']);
      return false;
    }
  }
}