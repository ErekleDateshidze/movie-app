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

   getMovieDetails(title: string): Observable<Movie> {
    const url = `https://www.omdbapi.com/?t=${title}&apikey=${this.apikey}`;
    return this.http.get<Movie>(url).pipe(
      map((response: any) => ({
        title: response.Title,
        year: response.Year,
        Runtime: response.Runtime,
        actors: response.Actors.split(',').map((actor: string) => actor.split(' ')[0]),
        country: response.Country,
      }))
    );
  }



  private baseUrl = 'https://restcountries.com/v3.1/name/';


  getCountryDetails(name: string): Observable<Country> {
    const url = `${this.baseUrl}${name}`;
    return this.http.get(url).pipe(
      map((response: any) => ({
        name: response[0].name.common,
        population: response[0].population
      }))
    );
  }

}
