export interface Movie {
  Released: string | number | Date;
  Year: any;
  Runtime: any;
  title: string;
  year: string;
  actors: string[];
  country: string;
}

export interface Country {
  name: string;
  population: number;
}