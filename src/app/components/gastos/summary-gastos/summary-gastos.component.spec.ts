import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGastosComponent } from './summary-gastos.component';

describe('SummaryGastosComponent', () => {
  let component: SummaryGastosComponent;
  let fixture: ComponentFixture<SummaryGastosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryGastosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
