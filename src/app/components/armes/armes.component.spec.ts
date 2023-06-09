import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmesComponent } from './armes.component';

describe('ArmesComponent', () => {
  let component: ArmesComponent;
  let fixture: ComponentFixture<ArmesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmesComponent]
    });
    fixture = TestBed.createComponent(ArmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
