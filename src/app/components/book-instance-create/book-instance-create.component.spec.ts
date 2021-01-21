import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInstanceCreateComponent } from './book-instance-create.component';

describe('BookInstanceCreateComponent', () => {
  let component: BookInstanceCreateComponent;
  let fixture: ComponentFixture<BookInstanceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookInstanceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInstanceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
