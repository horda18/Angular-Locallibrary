import { Component, OnInit } from '@angular/core';
import { Genre } from './../../model/genre';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreApiService } from './../../service/genre-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {

  selectedGenre: Genre;
  submitted = false;
  editForm: FormGroup;
  genreData: Genre[];


  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private genreApi: GenreApiService,
    private router: Router,
    public modal: NgbActiveModal,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.updateGenre();
    /*Original Form*/
    /*let id = this.actRoute.snapshot.paramMap.get('id');
    this.getGenre(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
    })*/
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  /*Original Form*/
  /*getGenre(id) {
    this.genreApi.getGenre(id).subscribe(data => {
      console.log(data)
      this.editForm.setValue({
        name: data.genre['name']
        //name: data[0]['name'] //syntexis for MySql
      });
    });
  }*/

  updateGenre() {
    console.log(this.selectedGenre);

    this.editForm = this.fb.group({
      id: [this.selectedGenre.id],
      name: [this.selectedGenre.name, [Validators.required]]
    })
  }

  showSuccessg() {
    this.toastService.show('Genre updated successfuly!', {
      classname: 'bg-success text-white font-weight-bold',
      delay: 2000 ,
      autohide: true
    });
  }

  onSubmit() {
    if (!this.editForm.valid || this.submitted) {
      return false;
    }
    this.submitted = true;
    this.genreApi.updateGenre(this.editForm.value)
      .subscribe(res => {
        this.submitted = false;
        this.modal.close('Yes');
        this.showSuccessg();
        console.log('Content updated successfully!')
      }, (error) => {
        console.log(error)
      })

  }

}
