import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BookInstance } from './../../model/book-instance';
import { BookInstanceApiService } from './../../service/book-instance-api.service';
import { BookApiService } from './../../service/book-api.service';

import { ToastService } from '../../service/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-book-instance-edit',
  templateUrl: './book-instance-edit.component.html',
  styleUrls: ['./book-instance-edit.component.css']
})
export class BookInstanceEditComponent implements OnInit {

  submitted = false;
  selectedBookInstance: BookInstance;
  editForm: FormGroup;
  Book: any = [];
  status:any = ['Disponible', 'Mantenimiento', 'Prestado', 'Reservado']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private bookInstanceApi: BookInstanceApiService,
    private bookApi: BookApiService,
    private router: Router,
    public modal: NgbActiveModal,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.readBook();
    this.updateBookInstance();
    /*Original Form*/
    /*let id = this.actRoute.snapshot.paramMap.get('id');
    this.getBookInstance(id);
    this.editForm = this.fb.group({
      book: ['', [Validators.required]],
      imprint: ['', [Validators.required]],
      status: ['', [Validators.required]],
      due_back: ['', [Validators.required]],
    })*/
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('status').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  /*Original Form*/
  /*getBookInstance(id) {
    this.bookInstanceApi.getBookInstance(id).subscribe(data => {
      this.editForm.setValue({
        book: data.book['id'], // Hay que llamar al id no al objeto completo data['book'] esto no!! si no data.book['id']
        imprint: data['imprint'],
        status: data['status'],
        due_back: moment(data['due_back']).add(1, 'days').format('YYYY-MM-DD'),
      });
      /*this.editForm.setValue({
        book: data[0]['book'], // Hay que llamar al id no al objeto completo data['book'] esto no!! si no data.book['id']
        imprint: data[0]['imprint'],
        status: data[0]['status'],
        due_back: moment(data[0]['due_back']).add(1, 'days').format('YYYY-MM-DD'),
      });*/  // For MySql
    /*});
  }*/

  readBook() {
    this.bookApi.getBooks().subscribe((data) => {
      this.Book = data;
    })
  }

  updateBookInstance() {
    console.log(this.selectedBookInstance);
    this.editForm = this.fb.group({
      id:[this.selectedBookInstance.id],
      book: [this.selectedBookInstance.book.id, [Validators.required]],
      imprint: [this.selectedBookInstance.imprint, [Validators.required]],
      status: [this.selectedBookInstance.status, [Validators.required]],
      due_back: [(moment(this.selectedBookInstance.due_back).add(1, 'days').format('YYYY-MM-DD'))],
    })
  }

  showSuccessg() {
    this.toastService.show('BookInstance updated successfuly!', {
      classname: 'bg-success text-white font-weight-bold',
      delay: 2000 ,
      autohide: true
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    }
    this.submitted = true;
    this.bookInstanceApi.updateBookInstance(this.editForm.value)
      .subscribe(res => {
        this.submitted = false;
        this.modal.close('Yes');
        this.showSuccessg();
        console.log('Content updated successfully!')
      }, (error) => {
        console.log(error)
      })

    /*Original Form*/
    /* else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.bookInstanceApi.updateBookInstance(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/bookinstances');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }*/
  }

}
