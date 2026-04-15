import { Component, effect, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HeroDetail } from '../../models';

@Component({
  selector: 'app-hero-card',
  imports: [MatCardModule],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.scss',
})
export class HeroCard {
  hero = input<HeroDetail>();

  defaultImg =
    'https://img.freepik.com/free-vector/superhero-standing-front-sunburst_603843-1871.jpg';
}
