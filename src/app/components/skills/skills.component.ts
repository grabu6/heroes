import { Component } from '@angular/core';

interface Habilitat {
  nom: string;
  descripcio: string;
  damage: number;
  mana: number;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  
habilitats: Habilitat[] = [];
nom: string = '';
descripcio: string = '';
damage: number | undefined;
mana: number | undefined;
missatgeError: string | null = null;

ngOnInit(): void {
  this.llistarHabilitats();
}


llistarHabilitats() {
  const habilitatsGuardades = localStorage.getItem('habilitats');
    if (habilitatsGuardades) {
      this.habilitats = JSON.parse(habilitatsGuardades);
  }
}

crearHabilitat() {

  const nomRegex= /^[A-Z][a-z ]{3,20}$/;
  if(!nomRegex.test(this.nom)) {
    this.missatgeError="El nom de l'habilitat ha de tenir entre 3 i 20 caràcters i cal que comenci per majúscula";
    return;
  }else if(this.descripcio.length>199){
    this.missatgeError="La descripció de l'habilitat no pot superar els 200 caràcters";
    return;
  }else if(this.damage==null||this.mana==null||this.damage < 10 || this.mana < 10 || this.damage + this.mana !== 100){
    this.missatgeError = 'El damage i el mana han de tenir un valor mínim de 10, un valor màxim de 100, i la seva suma ha de ser 100.';
    return;
  }
  
  const habilitatExistent = this.habilitats.find(h => h.nom.toLowerCase() === this.nom.toLowerCase());
  if (habilitatExistent) {
    this.missatgeError = 'Ja existeix una habilitat amb aquest nom.';
    return;
  }

  const novaHabilitat: Habilitat = {
    nom: this.nom,
    descripcio: this.descripcio,
    damage: this.damage!,
    mana: this.mana!
  };

  this.habilitats.push(novaHabilitat);

  localStorage.setItem('habilitats', JSON.stringify(this.habilitats));

  this.habilitats = JSON.parse(localStorage.getItem('habilitats')!);

}
habilitatSeleccionada: Habilitat | null = null;

editarHabilitat(habilitat: Habilitat) {
  this.habilitatSeleccionada = { ...habilitat };
}

guardarCanvis() {
  if (this.habilitatSeleccionada) {
    const index = this.habilitats.findIndex(h => h.nom === this.habilitatSeleccionada?.nom);
    if (index !== -1) {
      this.habilitats[index] = { ...this.habilitatSeleccionada };
    }

    localStorage.setItem('habilitats', JSON.stringify(this.habilitats));
    this.habilitats = JSON.parse(localStorage.getItem('habilitats')!);

    this.habilitatSeleccionada = null;
  }
}

eliminarHabilitat(habilitat: Habilitat) {
  const index = this.habilitats.findIndex(h => h.nom === habilitat.nom);
  if (index !== -1) {
    this.habilitats.splice(index, 1);

    localStorage.setItem('habilitats', JSON.stringify(this.habilitats));
    this.habilitats = JSON.parse(localStorage.getItem('habilitats')!);
  }
}
}
