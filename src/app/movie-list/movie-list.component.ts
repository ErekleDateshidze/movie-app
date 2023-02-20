import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../api.model';
import { MovieApiService } from '../movie-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movieList$: any= this.movieApiService.addToMovieList();
  
  
  constructor(private movieApiService: MovieApiService) {}

  deleteMovie (id:string) {
    this.movieApiService.deleteMovie(id).subscribe(() => console.log('Movie Deleted'))
  }

  ngOnInit(): void {}

}
