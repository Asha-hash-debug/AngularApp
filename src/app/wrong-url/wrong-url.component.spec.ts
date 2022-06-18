import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongURLComponent } from './wrong-url.component';

describe('WrongURLComponent', () => {
  let component: WrongURLComponent;
  let fixture: ComponentFixture<WrongURLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongURLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
