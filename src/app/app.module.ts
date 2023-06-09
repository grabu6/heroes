import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompatibilitiesComponent } from './components/compatibilities/compatibilities.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ArmesComponent } from './components/armes/armes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TipusComponent } from './components/tipus/tipus.component';
import { CompatibilitatTipusComponent } from './components/compatibilitat-tipus/compatibilitat-tipus.component';

@NgModule({
  declarations: [
    AppComponent,
    CompatibilitiesComponent,
    HeroesComponent,
    SkillsComponent,
    ArmesComponent,
    TipusComponent,
    CompatibilitatTipusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
