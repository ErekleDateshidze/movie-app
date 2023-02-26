import { FormArray, FormControl, UntypedFormControl } from "@angular/forms";
import { Genre } from "./genres/genres.component";

export interface Movie {
  Released: string | number | Date;
  Year: any;
  Runtime: any;
  title: string;
  year: string;
  actors: string[];
  country: string;
  comments:string[]
;}

export interface Country {
  name: string;
  population: number;
}

export interface NewCountry {
  name : {common:string}
}

export enum Genres {
  Action = 'action' ,
  Adventure = 'adventure' ,
  Comedy =    'comedy',
  Drama  =  ' drama',
  Horror =    'horror ',
  Romance=  'romance',
  Fantasy = 'fantasy',
  Thriller=   'thriller'
}

export enum Type {
  Movie = 'movie',
  TVShow = 'tvshow'
}

export interface MyMovie {
  name: FormControl<string| null>;
  country: FormControl<any>;
  premierEventPlace: FormControl<string| null>;
  releaseDate: FormControl< Date | null>;
  genres: FormControl<any>;
  type: FormControl<Type | null>;
  minutes?: FormControl<number |  null>;
  episodes?: FormControl<number |   null>;
}