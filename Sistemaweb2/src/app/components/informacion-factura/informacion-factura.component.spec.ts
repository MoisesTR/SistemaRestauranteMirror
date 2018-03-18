import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionFacturaComponent } from './informacion-factura.component';

describe('InformacionFacturaComponent', () => {
  let component: InformacionFacturaComponent;
  let fixture: ComponentFixture<InformacionFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
