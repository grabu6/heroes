import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompatibilitiesComponent } from './components/compatibilities/compatibilities.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ArmesComponent } from './components/armes/armes.component';
import { TipusComponent } from './components/tipus/tipus.component';
import { CompatibilitatTipusComponent } from './components/compatibilitat-tipus/compatibilitat-tipus.component';

const routes: Routes = [
  { path: 'compatibilities', component: CompatibilitiesComponent },
  { path: 'hero', component: HeroesComponent },
  { path: 'skills', component: SkillsComponent },
  {path:'armes',component:ArmesComponent},
  {path:'tipus',component:TipusComponent},
  {path:'compatibilitatTipus',component:CompatibilitatTipusComponent},
  { path: '', redirectTo: '/compatibilities', pathMatch: 'full' }, // Ruta per defecte
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }