import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/core/services/authentication.service';
import { User } from 'src/core/models/user';
import { UserService } from 'src/core/services/user.service';
import { MatchService } from 'src/core/services/match.service';
import { Match } from 'src/core/models/match';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: User;
  staticName: string;
  matches: any; // Array<User>;
  
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private matchService: MatchService) { }

  ngOnInit() {
    this.user = this.authenticationService.getUser();
    if (this.user) {
      this.staticName = this.user.firstName + " " + this.user.lastName;
      console.log("User in profile: " + JSON.stringify(this.user));
    }
    
  }

  save() {
    this.userService.update(this.user).then((result) => {
      console.log(result);
    })
  }

  findMatches() {
    this.matches = this.matchService.findMatches(this.user);
  }

}
