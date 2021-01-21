import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GenreApiService } from './../../service/genre-api.service';
import { AuthorApiService } from './../../service/author-api.service';
import { BookApiService } from './../../service/book-api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  submitted = false;
  bookForm: FormGroup;
  Author: any = [];
  Genre: any = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private bookApi: BookApiService,
    private authorApi: AuthorApiService,
    private genreApi: GenreApiService
  ) {
    this.mainForm();
    this.readAuthor();
    this.readGenre();
  }

  ngOnInit(): void {
  }

  mainForm() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.bookForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.bookForm.valid) {
      return false;
    } else {
      this.bookApi.createBook(this.bookForm.value).subscribe(
        (res) => {
          console.log('Employee successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/books'))
        }, (error) => {
          console.log(error);
        });
    }
  }

  readAuthor(){
    this.authorApi.getAuthors().subscribe((data) => {
    this.Author = data;
    })
  }

  readGenre() {
    this.genreApi.getGenres().subscribe((data) => {
      this.Genre = data;
    })
  }


}
