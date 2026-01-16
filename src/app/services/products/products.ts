import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Products {

  constructor(private http:HttpClient){}

  url: string = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ1Y1Y_o9k82WbKPeaywgZ9j5yQXPfC1jEW8DNzWOjhYzLwWrEdvx7ILATOREiDinorUnNg160BhuW/pub?output=csv";

  getData() {
    return this.http.get(this.url, { responseType: 'text' })
  }

  csvToJson(csv: string) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].replace(/"/g, '').split(',').map(h => h.trim());

    return lines.slice(1).map(line => {
      const values = line.replace(/"/g, '').split(',').map(v => v.trim());
      const obj: any = {};

      headers.forEach((header, index) => {
        obj[header] = values[index];
      });

      return obj;
    });
  }
  
}
