import { Component, OnInit } from '@angular/core';
import { City } from 'src/core/models/city';
import { CityService } from 'src/core/services/city.service';
import { SortablseFilterableComponent } from 'src/core/sortable-filterable/sortable-filterable.component';
import { Router } from '@angular/router';
import { ListResponse } from 'src/core/services/resource.service';
import { RouteService } from 'src/core/services/route.service';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends SortablseFilterableComponent<City> implements OnInit {

  cities: Array<City> = [];

  constructor(private http: HttpClient, private cityService: CityService, private routeService: RouteService) {
    super();
    // this.temporary().then((data) => {
    //   console.log(data);
    // })
  }


  ngOnInit() {
    this.cityService.list().then((data: ListResponse<City>) => {
      this.cities = data.data;
      console.log(this.cities);
    },
    (error) => {
      console.log(error);
    });
  }

  getData(): Array<City> {
    return this.cities;
  }

  goToCity(city: City) {
    this.routeService.goCity(city.id);
  }

  goToCreateExperience() {
    this.routeService.goCreateExperience();
  }

  // temporary() {
  //   return new Promise((res, rej) => {
  //     this.http.get("http://localhost:8080").subscribe((data) => {
  //       res(data);
  //     },
  //     error => {
  //       rej(error.statusText);
  //     });
  //   });
  // }
}
