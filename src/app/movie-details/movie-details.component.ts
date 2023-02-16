import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Movie ,Country } from '../api.model';
import { MovieApiService } from '../movie-api.service';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieName: string='';
  movie$: Observable<Movie>| undefined;
  releaseYear$: Observable<number>| undefined;
  actorNames$: Observable<string> | undefined;
  currencies$: Observable<{ name: string; symbol: string; flagUrl: string; }[]> | undefined;

  constructor( private movieApiService: MovieApiService) {}

  ngOnInit(): void {}


  getMovieDetails() {
    this.movieApiService.getMovieDetails(this.movieName).pipe(
      switchMap((movie) => {
        console.log(movie)
        const actor= movie.Actors
        const title= movie.Title;
        const countries = movie.Country.split(', ').map((country:any) => this.fetchFlagsAndCurrencies(country));
        return forkJoin([ of({actor}), of({title}),...countries]);
      })
    ).subscribe(console.log)
  }

  private fetchFlagsAndCurrencies(country:string) {
    return this.movieApiService.getCountryDetails(country)
    .pipe(
      map((x:any) => x.map((x:any) => {
        console.log(x)
        return {
          flag: x.flags,
          currencies : x.currencies
        }
      }))
      )
  }

}

