import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface Genre {
  label:string;
  emoji:string
}

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => GenresComponent),
  //     multi:true,
  //   }
  // ]
})
export class GenresComponent implements OnInit {
  // @Input() genres:Genre[] = []

  private _selectedGenres:string[] = [] 

  // onChange: (genres:string[]) => void = () => {}
  // onTouched: () => void = () => {}

  constructor() {}
  // writeValue(genres: string[]) {
  //   this._selectedGenres = genres|| null;
  //   this.onChange(genres);
  // }
  // registerOnChange(fn:(genres:string[]) => void) {
  //   this.onChange=fn
  // }
  // registerOnTouched(fn: () => void) {
  //   this.onTouched=fn;
  // }
  // setDisabledState?(isDisabled: boolean) {
    
  // }

  // isSelected(label:string) {
  //   return this._selectedGenres.includes(label)
  // }

  // select(label:string) {
  //   this._selectedGenres.push(label)
  //   this.onChange(this._selectedGenres);
  // }



  ngOnInit(): void {}

}
