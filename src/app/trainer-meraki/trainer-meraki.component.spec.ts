import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerMerakiComponent } from './trainer-meraki.component';

describe('TrainerMerakiComponent', () => {
  let component: TrainerMerakiComponent;
  let fixture: ComponentFixture<TrainerMerakiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerMerakiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerMerakiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
