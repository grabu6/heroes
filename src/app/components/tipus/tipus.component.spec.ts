import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipusComponent } from './tipus.component';

describe('TipusComponent', () => {
  let component: TipusComponent;
  let fixture: ComponentFixture<TipusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipusComponent]
    });
    fixture = TestBed.createComponent(TipusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
