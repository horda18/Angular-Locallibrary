import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenreCreateComponent } from './components/genre-create/genre-create.component';
import { GenreEditComponent } from './components/genre-edit/genre-edit.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';

import { HttpClientModule } from '@angular/common/http';
import { GenreApiService } from './service/genre-api.service';
import { AuthorApiService } from './service/author-api.service';
import { BookApiService } from './service/book-api.service';
import { BookInstanceApiService } from './service/book-instance-api.service';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthorCreateComponent } from './components/author-create/author-create.component';
import { AuthorEditComponent } from './components/author-edit/author-edit/author-edit.component';
import { AuthorListComponent } from './components/author-list/author-list/author-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookCreateComponent } from './components/book-create/book-create.component';
import { BookInstanceCreateComponent } from './components/book-instance-create/book-instance-create.component';
import { BookInstanceEditComponent } from './components/book-instance-edit/book-instance-edit.component';
import { BookInstanceListComponent } from './components/book-instance-list/book-instance-list.component';
import { CatalogComponent } from './components/catalog/catalog.component';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
registerLocaleData(localeEs, 'es');

import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    GenreCreateComponent,
    GenreEditComponent,
    GenreListComponent,
    AuthorCreateComponent,
    AuthorEditComponent,
    AuthorListComponent,
    BookListComponent,
    BookEditComponent,
    BookCreateComponent,
    BookInstanceCreateComponent,
    BookInstanceEditComponent,
    BookInstanceListComponent,
    CatalogComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule
  ],
  providers: [GenreApiService,
              AuthorApiService,
              BookApiService,
              BookInstanceApiService,
              {provide: LOCALE_ID, useValue:'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
