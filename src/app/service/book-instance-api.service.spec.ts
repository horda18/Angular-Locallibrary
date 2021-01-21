import { TestBed } from '@angular/core/testing';

import { BookInstanceApiService } from './book-instance-api.service';

describe('BookInstanceApiService', () => {
  let service: BookInstanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookInstanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
