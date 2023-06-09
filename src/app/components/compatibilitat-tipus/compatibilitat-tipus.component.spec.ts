import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibilitatTipusComponent } from './compatibilitat-tipus.component';

describe('CompatibilitatTipusComponent', () => {
  let component: CompatibilitatTipusComponent;
  let fixture: ComponentFixture<CompatibilitatTipusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompatibilitatTipusComponent]
    });
    fixture = TestBed.createComponent(CompatibilitatTipusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
