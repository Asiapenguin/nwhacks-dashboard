import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/core/models/experience';
import { ExperienceService } from 'src/core/services/experience.service';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { User } from 'src/core/models/user';

@Component({
  selector: 'app-experience-new-page',
  templateUrl: './experience-new-page.component.html',
  styleUrls: ['./experience-new-page.component.scss']
})
export class ExperienceNewPageComponent implements OnInit {

  experience: Experience;
  user: User;

  constructor(private experienceService: ExperienceService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.experience = new Experience();
    this.user = this.authenticationService.getUser();
  }

  create() {
    this.experienceService.create(this.experience).then((result) => {
      console.log(result);
    },
    error => {
      console.log(error);
    });
  }

}
