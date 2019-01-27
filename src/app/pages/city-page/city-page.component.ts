import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ImageService } from 'src/core/services/image.service';
import { City } from 'src/core/models/city';
import { CityService } from 'src/core/services/city.service';
import { ExperienceService } from 'src/core/services/experience.service';
import { ListResponse } from 'src/core/services/resource.service';
import { Experience } from 'src/core/models/experience';

@Component({
  selector: 'app-city-page',
  templateUrl: './city-page.component.html',
  styleUrls: ['./city-page.component.scss']
})
export class CityPageComponent implements OnInit {

  cityId: number;
  city: City;
  cityImage: any;
  experiences: Array<Experience>;
  imageIsLoading = true;

  constructor(private route: ActivatedRoute, private cityService: CityService, private imageService: ImageService, private experienceService: ExperienceService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.cityId = params['id'];
    });

    this.cityService.findById(this.cityId).get().then((result: any) => {
      this.city = result.data;
      console.log("City: " + JSON.stringify(this.city));
      this.experienceService.findWhere("city", this.city.name).get().then((result: ListResponse<Experience>) => {
        this.experiences = result.data;
        console.log("Experiences: " + JSON.stringify(this.experiences));
      });
      this.imageIsLoading = true;
      this.imageService.fetchPhoto(this.city.name).then((data: Blob) => {
        this.createImageFromBlob(data);
        setTimeout(() => {
          this.imageIsLoading = false;
        }, 500);
      },
        error => {
          this.imageIsLoading = false;
          console.log(error);
        });
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.cityImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  incrementVote(experience: Experience) {
    experience.votes++;
    this.experienceService.update(experience).then(isSuccess => {
      console.log("Added one vote to experience with title " + experience.title);
    })
  }
}
