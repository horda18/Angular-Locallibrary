import { Component, OnInit } from '@angular/core';
import { BookApiService } from './../../service/book-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/model/book';
import { BookEditComponent } from 'src/app/components/book-edit/book-edit.component';

import Swal from 'sweetalert2';

import { ToastService } from '../../service/toast.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  book: Book;
  Books: any = [];

  constructor(private bookApi: BookApiService,
    public modalService: NgbModal,
    public toastService: ToastService) {
    this.readBook();
  }

  ngOnInit(): void {
  }

  readBook() {
    this.bookApi.getBooks().subscribe((data) => {
      this.Books = data;
      console.log(data)
    })
  }

  editBook(book: Book) {
    const ref = this.modalService.open(BookEditComponent, { centered: true });
    ref.componentInstance.selectedBook = book;

    ref.result.then((yes) => {
      console.log("Ok Click");
      this.readBook();
    },
    (cancel) => {
      console.log("Cancel Click");
    })
  }

  showSuccess() {
    this.toastService.show('Book deleted successfuly!', {
      classname: 'bg-danger text-white font-weight-bold',
      delay: 2000 ,
      autohide: true
    });
  }

  removeBook(book, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete book!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookApi.deleteBook(book.id).subscribe((data) => {
          this.Books.splice(index, 1);
          this.showSuccess();
          this.readBook();
        })
      }
    })
  }

}
