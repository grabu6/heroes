import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Types } from '../../model/implementations/types';

@Component({
  selector: 'app-tipus',
  templateUrl: './tipus.component.html',
  styleUrls: ['./tipus.component.css']
})
export class TipusComponent {
  tipusForm!: FormGroup;
  tipus: Types = new Types();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const tipusGuardats = localStorage.getItem('tipus');
    if (tipusGuardats) {
      this.tipus = JSON.parse(tipusGuardats);
    }
    this.tipusForm = this.formBuilder.group({
      tipus: [this.tipus.name.join(', '), Validators.required]
    });
  }

  guardarTipus(): void {
    if (this.tipusForm.valid) {
      const tipusArray = this.tipusForm.value.tipus.split(',').map((tipu: string) => tipu.trim());
      this.tipus.name = tipusArray;
      localStorage.setItem('tipus', JSON.stringify(this.tipus));
    }
  }
}
