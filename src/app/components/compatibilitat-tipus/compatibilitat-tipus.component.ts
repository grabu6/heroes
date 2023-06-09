import { Component } from '@angular/core';
import { Types } from '../../model/implementations/types';
import { Arma } from '../../model/interfaces/Iarmes'

@Component({
  selector: 'app-compatibilitat-tipus',
  templateUrl: './compatibilitat-tipus.component.html',
  styleUrls: ['./compatibilitat-tipus.component.css']
})
export class CompatibilitatTipusComponent {
  tipus: Types[] = [];
  armes:Arma[] = [];
  compatibilities: Record<string, Record<string, boolean>> = {};
  ngOnInit() {
    const tipusGuardats = localStorage.getItem('tipus');
    if (tipusGuardats) {
      this.tipus = JSON.parse(tipusGuardats);
      if (!Array.isArray(this.tipus)) {
        this.tipus = [this.tipus]; 
      }
    }

    const armesGuardades = localStorage.getItem("armes");
    if (armesGuardades) {
      this.armes = JSON.parse(armesGuardades);
    }
  
    this.initializeCompatibilities();
  }

  initializeCompatibilities() {
  this.compatibilities = {};

  const compatibilitiesGuardades = localStorage.getItem('compatibilitiesTipus');
  if (compatibilitiesGuardades) {
    this.compatibilities = JSON.parse(compatibilitiesGuardades);
  }

  for (let tipu of this.tipus) {
    for (let name of tipu.name) {
      if (!this.compatibilities.hasOwnProperty(name)) {
        this.compatibilities[name] = {};
          for (let arma of this.armes) {
            this.compatibilities[name][arma.nom] = false;
          }
      
  } else {
    for (let tipu of this.tipus) {
      for (let name of tipu.name) {
        if (!this.compatibilities.hasOwnProperty(name)) {
          this.compatibilities[name] = {};
            for (let arma of this.armes) {
              this.compatibilities[name][arma.nom] = false;
            
            }
          }
          }
        }
        }
      }
    }
  }

        
  compatibilitatAutomatica(tipu1: string[], tipu2: string, event: any) {
  const valorActual = event.target.checked;
  this.compatibilities[tipu1[0]][tipu2] = valorActual;
  this.compatibilities[tipu2][tipu1[0]] = valorActual;
  
}
  

  guardarCompatibilitats() {
    localStorage.setItem('compatibilitiesTipus', JSON.stringify(this.compatibilities));
    console.log('Compatibilities guardades:', this.compatibilities);
  }

  getTipuValues(tipu: any): any[] {
    return Object.values(tipu.value);
  }
}
