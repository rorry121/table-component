import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HzTdComponent } from './hz-td.component';

describe('HzTdComponent', () => {
  let component: HzTdComponent;
  let fixture: ComponentFixture<HzTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HzTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HzTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
