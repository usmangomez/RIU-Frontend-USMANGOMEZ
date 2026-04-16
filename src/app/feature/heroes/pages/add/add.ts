import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HeroesStore } from '../../store/heroes.store';
import { Hero } from '../../models';
import { HeroForm } from '../../components/hero-form/hero-form';

@Component({
  selector: 'app-add',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HeroForm,
  ],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {
  private readonly heroesStore = inject(HeroesStore);

  handleHeroCreate(hero: Omit<Hero, 'id'>): void {
    this.heroesStore.createHero(hero);
  }
}
