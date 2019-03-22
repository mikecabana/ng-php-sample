import { TestBed } from '@angular/core/testing';

import { ContactRequestService } from './contact-request.service';

describe('ContactRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactRequestService = TestBed.get(ContactRequestService);
    expect(service).toBeTruthy();
  });
});
