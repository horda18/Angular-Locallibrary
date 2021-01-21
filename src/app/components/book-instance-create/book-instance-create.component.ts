import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BookInstanceApiService } from './../../service/book-instance-api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BookApiService } from './../../service/book-api.service';


@Component({
  selector: 'app-book-instance-create',
  templateUrl: './book-instance-create.component.html',
  styleUrls: ['./book-instance-create.component.css']
})
export class BookInstanceCreateComponent implements OnInit {

  submitted = false;
  bookInstanceForm: FormGroup;
  Book: any = [];
  status:any = ['Disponible', 'Mantenimiento', 'Prestado', 'Reservado']

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private bookInstanceApi: BookInstanceApiService,
    private bookApi: BookApiService
  ) {
      this.readBook();
      this.mainForm();
    }

  ngOnInit(): void {
  }

  mainForm() {
    this.bookInstanceForm = this.fb.group({
      book: ['', [Validators.required]],
      imprint: ['', [Validators.required]],
      status: ['', [Validators.required]],
      due_back: []

    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.bookInstanceForm.get('status').setValue(e, {
      onlySelf: true
    })
  }


  // Getter to access form control
  get myForm(){
    return this.bookInstanceForm.controls;
  }

  readBook() {
    this.bookApi.getBooks().subscribe((data) => {
      this.Book = data;
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.bookInstanceForm.valid) {
      return false;
    } else {
      this.bookInstanceApi.createBookInstance(this.bookInstanceForm.value).subscribe(
        (res) => {
          console.log('BookInstance successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/bookinstances'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
