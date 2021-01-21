import { Component, OnInit, ViewChild } from '@angular/core';
import { GenreApiService } from './../../service/genre-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenreEditComponent } from '../../components/genre-edit/genre-edit.component'
import { Genre } from 'src/app/model/genre';

import { ToastService } from '../../service/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  genre: Genre;
  Genre: any = [];


  constructor(private genreApi: GenreApiService,
    private router: Router,
    public modalService: NgbModal,
    public toastService: ToastService) {
    this.readGenre();
  }

  ngOnInit(): void {}



  readGenre() {
    this.genreApi.getGenres().subscribe((data) => {
      this.Genre = data;
    })
  }

  editGenre(genre: Genre) {
    //this.router.navigateByUrl(`/genre/${genre.id}`);
    const ref = this.modalService.open(GenreEditComponent, { centered: true });
    ref.componentInstance.selectedGenre = genre;

    ref.result.then((yes) => {
      console.log("Ok Click");
      this.readGenre();
    },
      (cancel) => {
        console.log("Cancel Click");
      })
  }

  showSuccess() {
    this.toastService.show('Genre deleted successfuly!', {
      classname: 'bg-danger text-white font-weight-bold',
      delay: 2000,
      autohide: true
    });
  }

  removeGenre(genre, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete genre!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.genreApi.deleteGenre(genre.id).subscribe((data) => {
          this.Genre.splice(index, 1);
          this.showSuccess();
        })
      }
    })
  }

}
