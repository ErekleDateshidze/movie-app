import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap ,tap} from 'rxjs/operators';
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
  currencies$: Observable<any> | undefined;
  homeData: Observable <any[]> | undefined
 
  constructor( private movieApiService: MovieApiService) {}

  ngOnInit(): void {}

  getMovieDetails() {
    this.homeData=this.movieApiService.getMovieDetails(this.movieName).pipe(
      switchMap((movie) => {
        const actor = movie.Actors.split(',').map((a:string) => a.trim().split(' ')[0]);
        const poster= movie.poster
        const title = movie.Title;
        const releaseDate = new Date(movie.Released);
        const currentYear = new Date().getFullYear();
        const yearsAgo = currentYear - releaseDate.getFullYear();
        const countries = movie.Country.split(', ').map((country: any) =>
          this.fetchFlagsAndCurrencies(country)
        );
        return forkJoin([of({ actor }), of({ title }), of({yearsAgo}, of({poster})), ...countries]);
      }),tap(console.log)
    )
  }

  private fetchFlagsAndCurrencies(country: string) {
    return this.movieApiService.getCountryDetails(country).pipe(
      map((x: any) => {
        console.log(x , 'bla')
        return x.map((element:any) => {
          return {flag: element.flags,
          currencies: Object.keys(element.currencies),
          country: element.name}
        })
        // return {
        //   flag: x.flags,
        //   currencies:Object.keys( x.currencies),
        //   country: x.name
        // };
      })
    );
  }
  
}



