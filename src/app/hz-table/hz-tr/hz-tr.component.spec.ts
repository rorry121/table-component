import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HzTrComponent } from './hz-tr.component';

describe('HzTrComponent', () => {
  let component: HzTrComponent;
  let fixture: ComponentFixture<HzTrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HzTrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HzTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
