import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInstanceEditComponent } from './book-instance-edit.component';

describe('BookInstanceEditComponent', () => {
  let component: BookInstanceEditComponent;
  let fixture: ComponentFixture<BookInstanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookInstanceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInstanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
