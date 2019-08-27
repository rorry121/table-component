import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HzTheadComponent } from './hz-thead.component';

describe('HzTheadComponent', () => {
  let component: HzTheadComponent;
  let fixture: ComponentFixture<HzTheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HzTheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HzTheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
