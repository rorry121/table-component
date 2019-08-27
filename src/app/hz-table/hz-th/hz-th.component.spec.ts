import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HzThComponent } from './hz-th.component';

describe('HzThComponent', () => {
  let component: HzThComponent;
  let fixture: ComponentFixture<HzThComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HzThComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HzThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
