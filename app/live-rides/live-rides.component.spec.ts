import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRidesComponent } from './live-rides.component';

describe('LiveRidesComponent', () => {
  let component: LiveRidesComponent;
  let fixture: ComponentFixture<LiveRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
