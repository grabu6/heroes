import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibilitiesComponent } from './compatibilities.component';

describe('CompatibilitiesComponent', () => {
  let component: CompatibilitiesComponent;
  let fixture: ComponentFixture<CompatibilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompatibilitiesComponent]
    });
    fixture = TestBed.createComponent(CompatibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
