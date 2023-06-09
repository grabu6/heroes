// GestioArmesComponent.ts
import { Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Arma } from '../../model/interfaces/Iarmes'

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.css']
})

export class ArmesComponent{
  armaForm!: FormGroup;
  armaFormEdicio!: FormGroup;
  armes: Arma[] = [];
  missatgeError: string | null = null;
  missatgeError1: string | null = null;
  missatgeError2: string | null = null;
  missatgeError3: string | null = null;
  armaSeleccionada: Arma | null = null;
  selected!: number;
  MINIM: number = 10;
  MAXIM: number = 100;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.armaForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      damage: [
        (this.MINIM + this.MAXIM) / 2,
        [Validators.required, Validators.min(this.MINIM), Validators.max(this.MAXIM)]
      ],
      abast: [
        (this.MINIM + this.MAXIM) / 2,
        [Validators.required, Validators.min(this.MINIM), Validators.max(this.MAXIM)]
      ],
      velocitat: [
        (this.MINIM + this.MAXIM) / 2,
        [Validators.required, Validators.min(this.MINIM), Validators.max(this.MAXIM)]
      ]      
    });

    this.armaForm.valueChanges.subscribe(() => {
      const nom = this.armaForm.value.nom;
      const damage = this.armaForm.value.damage || 0;
      const abast = this.armaForm.value.abast || 0;
      const velocitat = this.armaForm.value.velocitat || 0;
      
      if(nom.trim() === ''){
        this.missatgeError = 'El nom no pot estar buit';
      }else{
        this.missatgeError = null;
      }

      const sumaPropiedades = damage + abast + velocitat;
      if (sumaPropiedades !== 100) {
        this.missatgeError1 = 'La suma de les tres característiques no és igual a 100';
      } else {
        this.missatgeError1 = null;
      }
    });
   
    this.armaFormEdicio = this.formBuilder.group({
      nom: ['', [Validators.required]],
      damage: [
        [Validators.required, Validators.min(this.MINIM), Validators.max(this.MAXIM)]
      ],
      abast: [
        [Validators.required, Validators.min(this.MINIM), Validators.max(this.MAXIM)]
      ],
      velocitat: [
        [Validators.required, Validators.min(this.MINIM), Validators.max(this.MAXIM)]
      ]
    });

    this.armaFormEdicio.valueChanges.subscribe(() => {
      const nom = this.armaFormEdicio.value.nom;
      const damage = this.armaFormEdicio.value.damage || 0;
      const abast = this.armaFormEdicio.value.abast || 0;
      const velocitat = this.armaFormEdicio.value.velocitat || 0;
  
      if(nom.trim() === ''){
        this.missatgeError2 = 'El nom no pot estar buit';
      }else{
        this.missatgeError2 = null;
      }

      const sumaPropiedades = damage + abast + velocitat;
      if (sumaPropiedades !== 100) {
        this.missatgeError3 = 'La suma de les tres característiques no és igual a 100';
      } else {
        this.missatgeError3 = null;
      }
    });

    const armesGuardades = localStorage.getItem('armes');
    if (armesGuardades) {
      this.armes = JSON.parse(armesGuardades);
    }
  }

  crearArma(): void {
    if (this.armaForm.valid) {
      const arma: Arma = {
        nom: this.armaForm.value.nom,
        damage: this.armaForm.value.damage,
        abast: this.armaForm.value.abast,
        velocitat: this.armaForm.value.velocitat
      };

      this.armes.push(arma);
      localStorage.setItem('armes', JSON.stringify(this.armes));
      this.armes = JSON.parse(localStorage.getItem('armes')!);
      this.armaForm.reset();
    }
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selected = parseInt(target.value, 10);
  }
  

  editarArma(arma: Arma): void {
    this.armaSeleccionada =arma;
    this.armaFormEdicio.patchValue(this.armaSeleccionada);
  }

guardarCanvis() {
  if (this.armaSeleccionada) {
    if (this.armaFormEdicio.valid) {
      this.armaSeleccionada.nom = this.armaFormEdicio.value.nom;
      this.armaSeleccionada.damage = this.armaFormEdicio.value.damage;
      this.armaSeleccionada.abast = this.armaFormEdicio.value.abast;
      this.armaSeleccionada.velocitat = this.armaFormEdicio.value.velocitat;
      
      localStorage.setItem('armes', JSON.stringify(this.armes));
      this.armes = JSON.parse(localStorage.getItem('armes')!);
      this.armaFormEdicio.reset();
      this.armaSeleccionada = null;
    }
  }
}

  eliminarArma(arma: Arma): void {
    const index = this.armes.findIndex(h => h.nom === arma.nom);
    if (index !== -1) {
      this.armes.splice(index, 1);
  
      localStorage.setItem('armes', JSON.stringify(this.armes));
      this.armes = JSON.parse(localStorage.getItem('armes')!);
    }
  }
}
