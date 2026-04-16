import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HeroesStore } from '../../store/heroes.store';
import { Hero } from '../../models';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add {
  private readonly fb = inject(FormBuilder);
  private readonly heroesStore = inject(HeroesStore);

  powers = computed(() => this.heroesStore.powers());
  publishers = computed(() => this.heroesStore.publishers());

  loading = computed(() => this.heroesStore.loading());

  form = this.fb.group({
    name: ['', Validators.required],
    powerId: ['', Validators.required],
    publisherId: ['', Validators.required],
    firstAppearance: [null as number | null, [Validators.required, Validators.min(1900)]],
  });

  constructor() {
    if (this.powers().length === 0) this.heroesStore.loadCatalogs();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.heroesStore.createHero(this.form.getRawValue() as Omit<Hero, 'id'>);
  }
}
