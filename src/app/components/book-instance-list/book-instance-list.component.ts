import { Component, OnInit } from '@angular/core';
import { BookInstanceApiService } from './../../service/book-instance-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../service/toast.service';
import { BookInstance } from 'src/app/model/book-instance';
import { BookInstanceEditComponent } from 'src/app/components/book-instance-edit/book-instance-edit.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-instance-list',
  templateUrl: './book-instance-list.component.html',
  styleUrls: ['./book-instance-list.component.css']
})
export class BookInstanceListComponent implements OnInit {

  BookInstance: any = [];
  bookinstance: BookInstance;

  constructor(private bookInstanceApi: BookInstanceApiService,
    public modalService: NgbModal,
    public toastService: ToastService) {
    this.readbookInstance();
  }

  ngOnInit(): void {
  }

  readbookInstance() {
    this.bookInstanceApi.getBookInstances().subscribe((data) => {
      this.BookInstance = data;
      console.log(data)
      })
  }

  editBookInstance(bookinstance: BookInstance) {
    const ref = this.modalService.open(BookInstanceEditComponent, { centered: true });
    ref.componentInstance.selectedBookInstance = bookinstance;

    ref.result.then((yes) => {
      console.log("Ok Click");

      this.readbookInstance();
    },
    (cancel) => {
      console.log("Cancel Click");
    })
  }

  showSuccess() {
    this.toastService.show('BookInstance deleted successfuly!', {
      classname: 'bg-danger text-white font-weight-bold',
      delay: 2000 ,
      autohide: true
    });
  }

  removeBookInstance(bookInstance, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete bookinstance!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookInstanceApi.deleteBookInstance(bookInstance.id).subscribe((data) => {
          this.BookInstance.splice(index, 1);
          this.showSuccess();
        })
      }
    })
  }

}
