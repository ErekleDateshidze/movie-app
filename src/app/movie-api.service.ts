import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, map, Observable } from 'rxjs';
import { Movie, Country, NewCountry, MyMovie } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private apikey = '91059a25';
  constructor(private http: HttpClient) {}

  getMovieDetails(title: string): Observable<any> {
    const url = `https://www.omdbapi.com/?t=${title}&apikey=${this.apikey}`;
    return this.http.get(url);
  }

  // getMoviePoster(imdbId: string): Observable<string> {
  //   const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=${this.apikey}`;
  //   return this.http.get(url).pipe(
  //     map((res: any) => {
  //       return res.Poster;
  //     })
  //   );
  // }

  
  getAllCountries() {
    return this.http.get<NewCountry[]>('https://restcountries.com/v3.1/all').pipe(map(
      countries => countries.map((country: NewCountry) => country.name.common)
    ))
  }
  

  private baseUrl = 'https://restcountries.com/v3.1/name/';

  getCountryDetails(name: string): Observable<any> {
    const url = `${this.baseUrl}${name}`;
    return this.http.get(url);
  }

  addToMovieList() {
    return this.http.get('http://localhost:3000/movieList');
  }

  saveMovie(data: any) {
    return this.http.post('http://localhost:3000/movieList', data);
  }

  updateMovieComments(id: string, comments: string): Observable<any> {
  const url = `http://localhost:3000/movieList/${id}`;
  const data = { comments: comments };
  return this.http.patch(url, data);
}


  deleteMovie(id: string) {
    return this.http.delete(`http://localhost:3000/movieList/${id}`);
  }

  private moviesUrl = 'http://localhost:3000/movieList';


  addMovie(movie: MyMovie): Observable<MyMovie> {
    return this.http.post<MyMovie>(this.moviesUrl, movie);
  }
}
