import { Component, NgZone, OnInit } from '@angular/core';
import { GenreApiService } from './../../service/genre-api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css']
})
export class GenreCreateComponent implements OnInit {

  submitted = false;
  genreForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private GenreApi: GenreApiService
  ) {
      this.mainForm();
    }

  ngOnInit(): void {
  }

  mainForm(){
    this.genreForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  get myForm() {
    return this.genreForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(!this.genreForm.valid) {
      return false;
    }else {
      this.GenreApi.createGenre(this.genreForm.value).subscribe(
        (res) => {
          console.log('Genre successfully create!')
          this.ngZone.run(() => this.router.navigateByUrl('/genres'))
        }, (error) => {
          console.log(error);
        })
    }
  }

}
