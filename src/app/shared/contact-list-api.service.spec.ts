import { TestBed } from '@angular/core/testing';

import { ContactListApiService } from './contact-list-api.service';

describe('ContactListApiService', () => {
  let service: ContactListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
