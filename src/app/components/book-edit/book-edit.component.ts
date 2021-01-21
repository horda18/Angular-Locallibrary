import { Component, OnInit } from '@angular/core';
import { Book } from './../../model/book';
import { ActivatedRoute, Router } from "@angular/router";
import { BookApiService } from './../../service/book-api.service';
import { GenreApiService } from './../../service/genre-api.service';
import { AuthorApiService } from './../../service/author-api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  submitted = false;
  selectedBook: Book;
  editForm: FormGroup;
  Author: any = [];
  Genre: any = [];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private bookApi: BookApiService,
    private router: Router,
    private authorApi: AuthorApiService,
    private genreApi: GenreApiService,
    public modal: NgbActiveModal,
    public toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.readAuthor();
    this.readGenre();
    this.updateBook();
    /*Original Form*/
    /*let id = this.actRoute.snapshot.paramMap.get('id');
    this.getBook(id);
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    })*/
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  /*Original Form*/
  /*getBook(id) {
    this.bookApi.getBook(id).subscribe(data => {
      console.log(data)
      this.editForm.setValue({
        title: data.book['title'],
        author: data.book.author['id'],
        summary: data.book['summary'],
        isbn: data.book['isbn'],
        genre: data.book.genre[0]['id'],
      });*/
  /*this.editForm.setValue({
    title: data[0]['title'],
    author: data[0]['author'],
    summary: data[0]['summary'],
    isbn: data[0]['isbn'],
    genre: data[0]['genre'],
  });*/ //For MySql
  /*console.log(this.editForm.controls)
});
}*/

  updateBook() {
    console.log(this.selectedBook)
    this.editForm = this.fb.group({
      id: [this.selectedBook.id],
      title: [this.selectedBook.title, [Validators.required]],
      author: [this.selectedBook.author.id, [Validators.required]],
      summary: [this.selectedBook.summary, [Validators.required]],
      isbn: [this.selectedBook.isbn, [Validators.required]],
      genre: [this.selectedBook.genre[0].id, [Validators.required]]
    })
  }

  readAuthor() {
    this.authorApi.getAuthors().subscribe((data) => {
      this.Author = data;
    })
  }

  readGenre() {
    this.genreApi.getGenres().subscribe((data) => {
      this.Genre = data;
    })
  }

  showSuccessg() {
    this.toastService.show('Book updated successfuly!', {
      classname: 'bg-success text-white font-weight-bold',
      delay: 2000,
      autohide: true
    });
  }

  onSubmit() {
    if (!this.editForm.valid || this.submitted) {
      return false;
    }
    this.submitted = true;
    this.bookApi.updateBook(this.editForm.value)
      .subscribe(res => {
        this.submitted = false;
        this.modal.close('Yes');
        this.showSuccessg();
        console.log('Content updated successfully!')
      }, (error) => {
        console.log(error)
      })

    /*Original Form*/
    /*else {
     if (window.confirm('Are you sure?')) {
       let id = this.actRoute.snapshot.paramMap.get('id');
       this.bookApi.updateBook(id, this.editForm.value)
         .subscribe(res => {
           this.router.navigateByUrl('/books');
           console.log('Content updated successfully!')
         }, (error) => {
           console.log(error)
         })
     }
   }*/
  }

}
