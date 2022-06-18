import { TestBed } from '@angular/core/testing';

import { ConsultingServiceService } from './consulting-service.service';

describe('ConsultingServiceService', () => {
  let service: ConsultingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
