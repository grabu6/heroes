import { Component } from '@angular/core';

interface Habilitat {
  nom: string;
  compatibles: string[];
}

@Component({
  selector: 'app-compatibilities',
  templateUrl: './compatibilities.component.html',
  styleUrls: ['./compatibilities.component.css']
})

export class CompatibilitiesComponent {
  habilitats: Habilitat[] = [];
  compatibilities: { [key: string]: { [key: string]: boolean } } = {};

  ngOnInit() {
    const habilitatGuardades = localStorage.getItem('habilitats');
    if (habilitatGuardades) {
      this.habilitats = JSON.parse(habilitatGuardades);
    }

    this.initializeCompatibilities();
  }

  initializeCompatibilities() {
  this.compatibilities = {};
  const compatibilitiesGuardades = localStorage.getItem('compatibilities');
  if (compatibilitiesGuardades) {
    this.compatibilities = JSON.parse(compatibilitiesGuardades);
    for (let habilitat of this.habilitats) {
      if (!this.compatibilities.hasOwnProperty(habilitat.nom)) {
        this.compatibilities[habilitat.nom] = {};
        for (let compatibility of this.habilitats) {
          if (habilitat.nom === compatibility.nom) {
            this.compatibilities[habilitat.nom][compatibility.nom] = true;
          } else {
            this.compatibilities[habilitat.nom][compatibility.nom] = false;
          }
        }
      }
    }
    
  } else {
    for (let habilitat of this.habilitats) {
      this.compatibilities[habilitat.nom] = {};
      for (let compatibility of this.habilitats) {
        if (habilitat.nom === compatibility.nom) {
          this.compatibilities[habilitat.nom][compatibility.nom] = true;
        } else {
          this.compatibilities[habilitat.nom][compatibility.nom] = false;
        }
      }
    }
    
  }
}

compatibilitatAutomatica(habilitat1: string, habilitat2: string, event: any) {
    const valorActual = event.target.checked;
    this.compatibilities[habilitat1][habilitat2] = valorActual;
    this.compatibilities[habilitat2][habilitat1] = valorActual;
  }

  guardarCompatibilitats() {
    localStorage.setItem('compatibilities', JSON.stringify(this.compatibilities));
    console.log('Compatibilities guardades:', this.compatibilities);
  }
}