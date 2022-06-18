import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicestatusComponent } from './devicestatus.component';

describe('DevicestatusComponent', () => {
  let component: DevicestatusComponent;
  let fixture: ComponentFixture<DevicestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicestatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
