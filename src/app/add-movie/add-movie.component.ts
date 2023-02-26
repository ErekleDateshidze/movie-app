
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country, Genres, MyMovie, Type } from '../api.model';
import { Genre } from '../genres/genres.component';
import { MovieApiService } from '../movie-api.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  movieForm: FormGroup = this.buildForm();
  allCountries!: Observable<string[]>;
  populationDisabled = false;

  isSubmitted= false;

  country = []

  genres:Genre[] = [
    {
      label: 'Comedy' , 
      emoji: '😂'
    },
     {
      label: 'Drama' , 
      emoji: '🎭'
    }, {
      label: 'Action' , 
      emoji: '🔫 '
    }, {
      label: 'Western' , 
      emoji: '🤠'
    }, {
      label: 'Horror' , 
      emoji: '💀'
    }
  ]

  // <i class="fa-solid fa-face-laugh"></i>
  // <i class="fa-solid fa-masks-theater"></i>
  // <i class="fa-solid fa-gun"></i>
  // <i class="fa-solid fa-knife"></i>
  // <i class="fa-solid fa-user-secret"></i>

  constructor (private fb: FormBuilder, private movieApiService: MovieApiService) {   
  
  }

  populateCountries() {
    this.allCountries =  this.movieApiService.getAllCountries();
  }

   currentOrFutureDateValidator(control: FormControl): {[key: string]: any} | null {
    const dateValue = control.value;
    const currentDate = new Date();
    if (dateValue < currentDate) {
      return {validationError: true};
    }
    return null;
  }

  handleSubmission() {
    console.log(this.movieForm);
    this.isSubmitted = true;
    if (this.movieForm.valid) {
    this.movieApiService.addMovie(this.movieForm.value).subscribe((movie) => {
      console.log('Movie added:', movie);
      // Clear the form after successful submission
      this.movieForm.reset();
    });
  }
  }


  
  private buildForm() {
    return this.fb.group<MyMovie>({
      name: this.fb.control('' ,  [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      country: this.fb.control ([] , [Validators.required] ),
      premierEventPlace: this.fb.control (''),
      releaseDate:this.fb.control(null , [Validators.required]),
      genres: this.fb.control(null),
      type: this.fb.control(Type.Movie),
      minutes:this.fb.control(null , [ Validators.min(60), Validators.max(190)]),
      episodes: this.fb.control(null)

    })
  }

   addCountryControl() {
    console.log('adding movie')
  }


  ngOnInit(): void {
    this.buildForm();
    this.populateCountries();
  }
}

