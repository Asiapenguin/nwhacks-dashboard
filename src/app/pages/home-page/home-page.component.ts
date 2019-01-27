import { Component, OnInit } from '@angular/core';
import { City } from 'src/core/models/city';
import { CityService } from 'src/core/services/city.service';
import { SortablseFilterableComponent } from 'src/core/sortable-filterable/sortable-filterable.component';
import { Router } from '@angular/router';
import { ListResponse } from 'src/core/services/resource.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends SortablseFilterableComponent<City> implements OnInit {

  cities: Array<City> = [];

  constructor(private cityService: CityService, private router: Router) {
    super();
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
    this.router.navigate(["/city", city.id]);
  }

}
