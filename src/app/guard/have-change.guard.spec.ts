import { TestBed } from '@angular/core/testing';

import { HaveChangeGuard } from './have-change.guard';

describe('HaveChangeGuard', () => {
  let guard: HaveChangeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HaveChangeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
