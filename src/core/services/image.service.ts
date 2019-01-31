import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  // Key removed for security purposes. With valid key set, this service will fetch images based on location name.
  apiKey = "";
  placeSearchBase = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=photos&key=${this.apiKey}`;
  placePhotoBase = `https://maps.googleapis.com/maps/api/place/photo?key=${this.apiKey}`;

  photoReference: string;
  maxWidth: number;

  constructor(private http: HttpClient) { }

  fetchPhoto(place: string) {
    return new Promise((res, rej) => {
      this.http.get(`${this.placeSearchBase}&input=${place}`).subscribe((data: any) => {
        console.log("Place Search Data: " + JSON.stringify(data));
        this.photoReference = data.candidates[0].photos[0].photo_reference;
        this.maxWidth = data.candidates[0].photos[0].width;
        console.log("Photo Reference: " + this.photoReference);
        this.http.get(`${this.placePhotoBase}&photoreference=${this.photoReference}&maxwidth=${this.maxWidth}`, { responseType: 'blob' }).subscribe((data: any) => {
          console.log("Image Data: " + data);
          res(data);
        },
        error => {
          rej(error);
        });
      });
    })
  }
}
