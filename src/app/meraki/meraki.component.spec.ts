import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerakiComponent } from './meraki.component';

describe('MerakiComponent', () => {
  let component: MerakiComponent;
  let fixture: ComponentFixture<MerakiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerakiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerakiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
