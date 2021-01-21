import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenreCreateComponent } from './components/genre-create/genre-create.component';
import { GenreEditComponent } from './components/genre-edit/genre-edit.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';

import { AuthorCreateComponent } from './components/author-create/author-create.component';
import { AuthorEditComponent } from './components/author-edit/author-edit/author-edit.component';
import { AuthorListComponent } from './components/author-list/author-list/author-list.component';

import { BookCreateComponent } from './components/book-create/book-create.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookListComponent } from './components/book-list/book-list.component';

import { BookInstanceCreateComponent } from './components/book-instance-create/book-instance-create.component';
import { BookInstanceEditComponent } from './components/book-instance-edit/book-instance-edit.component';
import { BookInstanceListComponent } from './components/book-instance-list/book-instance-list.component';

import { CatalogComponent } from './components/catalog/catalog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalog'},
  { path: 'genres/create', component: GenreCreateComponent },
  { path: 'genre/:id', component: GenreEditComponent },
  { path: 'genres', component: GenreListComponent },
  { path: 'authors/create', component: AuthorCreateComponent },
  { path: 'author/:id', component: AuthorEditComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'books/create', component: BookCreateComponent },
  { path: 'book/:id', component: BookEditComponent },
  { path: 'books', component: BookListComponent },
  { path: 'bookinstances/create', component: BookInstanceCreateComponent },
  { path: 'bookinstance/:id', component: BookInstanceEditComponent },
  { path: 'bookinstances', component: BookInstanceListComponent },
  { path: 'catalog', component: CatalogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
