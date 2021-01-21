import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/model/author';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorEditComponent } from '../../../components/author-edit/author-edit/author-edit.component';
import { AuthorApiService } from './../../../service/author-api.service';

import Swal from 'sweetalert2';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  author: Author;
  Author: any = [];

  constructor(private authorApi: AuthorApiService,
    public modalService: NgbModal,
    public toastService: ToastService) {
    this.readAuthor();
  }

  ngOnInit(): void {
  }

  readAuthor(){
    this.authorApi.getAuthors().subscribe((data) => {
    this.Author = data;
    console.log(data)
    })
  }

  editAuthor(author: Author) {
    const ref = this.modalService.open(AuthorEditComponent, { centered: true });
    ref.componentInstance.selectedAuthor = author;

    ref.result.then((yes) => {
      console.log("Ok Click");

      this.readAuthor();
    },
    (cancel) => {
      console.log("Cancel Click");
    })
  }

  showSuccess() {
    this.toastService.show('Author deleted successfuly!', {
      classname: 'bg-danger text-white font-weight-bold',
      delay: 2000 ,
      autohide: true
    });
  }

  showSuccessg() {
    this.toastService.show('Author updated successfuly!', {
      classname: 'bg-success text-white font-weight-bold',
      delay: 2000 ,
      autohide: true
    });
  }

  removeAuthor(author, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete author!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorApi.deleteAuthor(author.id).subscribe((data) => {
          this.Author.splice(index, 1);
          this.showSuccess();
        })
      }
    })
  }

}
