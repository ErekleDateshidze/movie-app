import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../api.model';
import { MovieApiService } from '../movie-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movieList$: Observable<any> | undefined;

  constructor(private movieApiService: MovieApiService) {} 

  deleteMovie(id: string) {
    this.movieApiService.deleteMovie(id).subscribe(() => this.loadMovies());
  }
  
  loadMovies() {
    this.movieList$ = this.movieApiService.addToMovieList();
  }

  addComment(id: string, comments: string) {
    this.movieApiService.updateMovieComments(id, comments).subscribe(() => this.loadMovies());
  }

  ngOnInit(): void {
    this.loadMovies();
  }
}
