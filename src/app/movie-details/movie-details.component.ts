import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Movie ,Country } from '../api.model';
import { MovieApiService } from '../movie-api.service';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieName: string | undefined;
  movie$: Observable<Movie>| undefined;
  releaseYear$: Observable<number>| undefined;
  actorNames$: Observable<string> | undefined;
  currencies$: Observable<{ name: string; symbol: string; flagUrl: string; }[]> | undefined;

  constructor( private movieApiService: MovieApiService) {}

  ngOnInit(): void {
    this.movie$ = this.movieService.getMovieDetails(this.movieName);

    this.releaseYear$ = this.movie$.pipe(
      switchMap(movie => {
        const releaseDate = new Date(movie.Released);
        const currentYear = new Date().getFullYear();
        return Observable.of(currentYear - releaseDate.getFullYear());
      })
    );

    this.actorNames$ = this.movie$.pipe(
      switchMap(movie => {
        const actors = movie.actors.split(', ');
        const actorNames = actors.map(actor => actor.split(' ')[0]);
        return Observable.of(actorNames.join(', '));
      })
    );

    this.currencies$ = this.movie$.pipe(
      switchMap(movie => {
        const countryNames = movie.country.split(', ');
        const observables = countryNames.map(countryName => this.countryService.getCountryDetails(countryName));
        return combineLatest(observables);
      }),
      switchMap(countries => {
        const currencies = countries.map(country => {
          return {
            name: country.currencies[0].name,
            symbol: country.currencies[0].symbol,
            flagUrl: `https://flagpedia.net/data/flags/icon/36x27/${country.alpha2Code.toLowerCase()}.png`
          };
        });
        return Observable.of(currencies);
      })
    );
  }

  getMovieDetails() {
    this.ngOnInit();
  }

}
