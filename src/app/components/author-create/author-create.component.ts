import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorApiService } from './../../service/author-api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import * as moment from 'moment';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css']
})
export class AuthorCreateComponent implements OnInit {

  submitted = false;
  authorForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiAuthor: AuthorApiService
  ) {
    this.mainForm();
    }

  ngOnInit(): void {
  }

  mainForm() {
    this.authorForm = this.fb.group({
      first_name: ['', [Validators.required]],
      family_name: ['', [Validators.required]],
      date_of_birth:[],
      date_of_death:[]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.authorForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.authorForm.valid) {
      return false;
    } else {
      this.apiAuthor.createAuthor(this.authorForm.value).subscribe(
        (res) => {
          console.log('Author successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/authors'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
