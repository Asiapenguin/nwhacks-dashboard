import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) { }

  goHomePage() {
    this.router.navigate(["/home"], { replaceUrl: true });
  }

  goCity(id: number) {
    this.router.navigate(["/city", id]);
  }

  goCreateExperience() {
    this.router.navigate(["/experience/new"]);
  }

  goLoginPage() {
    this.router.navigate(["/login", { replaceUrl: true }]);
  }
}
