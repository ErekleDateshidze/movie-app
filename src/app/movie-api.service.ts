import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  getMoviePoster(imdbId: string): Observable<string> {
  const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=${this.apikey}`;
  return this.http.get(url).pipe(
    map((res: any) => {
      return res.Poster;
    })
  );
}

  private baseUrl = 'https://restcountries.com/v3.1/name/';

  getCountryDetails(name: string): Observable<any> {
    const url = `${this.baseUrl}${name}`;
    return this.http.get(url)
  }  
}
