import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/core/services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'nwhacks-dashboard';
  url = 'http://localhost:3000'

  constructor(private urlService: UrlService) {

  }

  ngOnInit() {
    this.urlService.setEndpoint(this.url);
  }
}
