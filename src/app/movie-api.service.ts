import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie ,Country } from './api.model'


@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private apikey = '91059a25';
  constructor(private http:HttpClient) {}

   getMovieDetails(title: string): Observable<any> {
    const url = `https://www.omdbapi.com/?t=${title}&apikey=${this.apikey}`;
    return this.http.get(url)
  }

  private baseUrl = 'https://restcountries.com/v3.1/name/';

  getCountryDetails(name: string): Observable<any> {
    const url = `${this.baseUrl}${name}`;
    return this.http.get(url)
  }  
}
