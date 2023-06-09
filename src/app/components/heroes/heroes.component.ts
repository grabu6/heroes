import { Component } from '@angular/core';

interface Heroes {
  nom: string;
  descripcio: string;
  habilitat:string;
}

interface Habilitat {
  nom: string;
  compatibles: string[];
  seleccionada: boolean;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  herois: Heroes[] = [];
  nom: string = '';
  descripcio: string = '';
  
  missatgeError: string | null = null;
  
  habilitats: Habilitat[] = [];
  habilitatsSeleccionada: Habilitat[] = [];

ngOnInit() {
  const heroesGuardats = localStorage.getItem('heroes');
  if (heroesGuardats) {
    this.herois = JSON.parse(heroesGuardats);
  }

  const habilitatGuardades = localStorage.getItem('habilitats');
  if (habilitatGuardades) {
    this.habilitats = JSON.parse(habilitatGuardades);
  }

  const compatibilitatsGuardades = localStorage.getItem('compatibilities');
  if (compatibilitatsGuardades) {
    const compatibilities = JSON.parse(compatibilitatsGuardades);
    
    for (const habilitat of this.habilitats) {
      if (compatibilities.hasOwnProperty(habilitat.nom)) {
        habilitat.compatibles = Object.keys(compatibilities[habilitat.nom]).filter(h => compatibilities[habilitat.nom][h]);
      } else {
        habilitat.compatibles = [habilitat.nom]; 
      }
    }
  } else {
    for (const habilitat of this.habilitats) {
      habilitat.compatibles = [habilitat.nom]; 
    }
  } 
}

crearHeroe() {

  const nomRegex= /^[a-z ]{2,20}$/;
  if(!nomRegex.test(this.nom)) {
    this.missatgeError="El nom de l'heroi ha de tenir entre 2 i 20 caràcters";
    return;
  }else if(this.descripcio.length>199){
    this.missatgeError="La descripció de l'heroi no pot superar els 200 caràcters";
    return;
  }
  
  const heroiExistent = this.herois.find(h => h.nom.toLowerCase() === this.nom.toLowerCase());
  if (heroiExistent) {
    this.missatgeError = 'Ja existeix una heroi amb aquest nom.';
    return;
  }

  const checkboxesMarcat = this.habilitatsSeleccionada.filter(h => h.nom !== this.nom);
  if (checkboxesMarcat.length === 0) {
    this.missatgeError = 'Cal seleccionar com a mínim una habilitat.';
    return;
  }

  const nouHeroe: Heroes = {
    nom: this.nom,
    descripcio: this.descripcio,
    habilitat: checkboxesMarcat.map(h => h.nom).join(', ')
  };

  this.herois.push(nouHeroe);

  localStorage.setItem('heroes', JSON.stringify(this.herois));

  this.herois = JSON.parse(localStorage.getItem('heroes')!);

}  

seleccionarHabilitat(habilitat: Habilitat) {
  if (this.habilitatsSeleccionada.length === 0) {
    this.habilitatsSeleccionada.push(habilitat);

    for (const h of this.habilitats) {
      if (h.nom !== habilitat.nom && (!habilitat.compatibles || !habilitat.compatibles.includes(h.nom))) {
        h.seleccionada = false;
      }
    }
  } else {
    const index = this.habilitatsSeleccionada.findIndex(h => h.nom === habilitat.nom);
    if (index !== -1) {
      this.habilitatsSeleccionada.splice(index, 1);
    } else {
      this.habilitatsSeleccionada.push(habilitat);
    }
  }
}

estaSeleccionada(habilitat: Habilitat) {
  return this.habilitatsSeleccionada.some(h => h.nom === habilitat.nom);
}

noCompatible(habilitat: Habilitat): boolean {
  if (this.habilitatsSeleccionada.length === 0) {
    return false; 
  }
  if (this.habilitatsSeleccionada.length > 0) {
    const primeraHabilitatSeleccionada = this.habilitatsSeleccionada[0];
    return !primeraHabilitatSeleccionada.compatibles.includes(habilitat.nom);
  }

  return true;

}
}