import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvaseComponent } from './envase.component';

describe('EnvaseComponent', () => {
  let component: EnvaseComponent;
  let fixture: ComponentFixture<EnvaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
