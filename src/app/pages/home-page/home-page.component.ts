import { Component, OnInit } from '@angular/core';
import { City } from 'src/core/models/city';
import { CityService } from 'src/core/services/city.service';
import { SortablseFilterableComponent } from 'src/core/sortable-filterable/sortable-filterable.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends SortablseFilterableComponent<City> implements OnInit {

  cities: Array<City> = [];

  constructor(private cityService: CityService) {
    super();
  }
   

  ngOnInit() {
    this.cityService.get().then((data: Array<City>) => {
      this.cities = data;
      console.log(this.cities);
    });
  }

  getData(): Array<City> {
    return this.cities;
  }

}
