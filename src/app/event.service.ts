import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _specialEventsUrl= "http://localhost:8000/api/special";

  constructor(private http : HttpClient) { }

  
  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl)
  }
}
