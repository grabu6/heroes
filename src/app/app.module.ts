import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompatibilitiesComponent } from './components/compatibilities/compatibilities.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ArmesComponent } from './components/armes/armes.component';

@NgModule({
  declarations: [
    AppComponent,
    CompatibilitiesComponent,
    HeroesComponent,
    SkillsComponent,
    ArmesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
