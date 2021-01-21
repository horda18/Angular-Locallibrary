import { Component, OnInit } from '@angular/core';
import { Author } from './../../../model/author';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorApiService } from './../../../service/author-api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../service/toast.service';

import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  selectedAuthor: Author;
  submitted = false;
  editForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private authorApi: AuthorApiService,
    private router: Router,
    public modal: NgbActiveModal,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.updateAuthor();
    /*Original Form*/
    /*let id = this.actRoute.snapshot.paramMap.get('id');
    this.getAuthor(id);
    this.editForm = this.fb.group({
      first_name: ['', [Validators.required]],
      family_name: ['', [Validators.required]],
      date_of_birth:[],
      date_of_death:[]
    })*/
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  /*Original Form*/
  /*getAuthor(id) {
    this.authorApi.getAuthor(id).subscribe(data => {
      this.editForm.setValue({
        first_name: data.author['first_name'],
        family_name: data.author['family_name'],
        date_of_birth: (null===data.author['date_of_birth']) ? '' : moment(data.author['date_of_birth']).add(1, 'days').locale('es').format('YYYY-MM-DD'),
        date_of_death: (null===data.author['date_of_death']) ? '' : moment(data.author['date_of_death']).add(1, 'days').format('YYYY-MM-DD')
      });
      /*this.editForm.setValue({
        first_name: data[0]['first_name'],
        family_name: data[0]['family_name'],
        date_of_birth: (null===data[0]['date_of_birth']) ? '' : moment(data[0]['date_of_birth']).locale('es').format('YYYY-MM-DD'),
        date_of_death: (null===data[0]['date_of_death']) ? '' : moment(data[0]['date_of_death']).format('YYYY-MM-DD')
      });*/
  /*console.log(this.editForm.controls)
});
}*/

  updateAuthor() {
    console.log(moment(this.selectedAuthor.date_of_birth).locale('es').format('YYYY-MM-DD'));
    this.editForm = this.fb.group({
      id: [this.selectedAuthor.id],
      first_name: [this.selectedAuthor.first_name, [Validators.required]],
      family_name: [this.selectedAuthor.family_name, [Validators.required]],
      date_of_birth: [(null===this.selectedAuthor.date_of_birth) ? '' : moment(this.selectedAuthor.date_of_birth).locale('es').add(1, 'days').format('YYYY-MM-DD')],
      date_of_death: [(null===this.selectedAuthor.date_of_death) ? '' : moment(this.selectedAuthor.date_of_death).locale('es').add(1, 'days').format('YYYY-MM-DD')]
    })
  }

  showSuccessg() {
    this.toastService.show('Author updated successfuly!', {
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
    this.authorApi.updateAuthor(this.editForm.value)
      .subscribe(res => {
        this.submitted = false;
        this.modal.close('Yes');
        this.showSuccessg();
        console.log('Content updated successfully!')
      }, (error) => {
        console.log(error)
      })
    /*Original Form*/
    /*this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.authorApi.updateAuthor(id,this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/authors');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }*/
  }


}
