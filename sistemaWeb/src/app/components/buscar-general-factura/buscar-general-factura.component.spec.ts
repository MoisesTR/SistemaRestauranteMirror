import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarGeneralFacturaComponent } from './buscar-general-factura.component';

describe('BuscarGeneralFacturaComponent', () => {
  let component: BuscarGeneralFacturaComponent;
  let fixture: ComponentFixture<BuscarGeneralFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarGeneralFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarGeneralFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
