import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/core/services/route.service';
import { AuthenticationService } from 'src/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private routeService: RouteService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.routeService.goLoginPage();
  }

  goHome() {
    this.routeService.goHomePage();
  }
}
