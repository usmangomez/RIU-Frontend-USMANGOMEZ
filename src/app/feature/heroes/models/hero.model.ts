import { Power } from './power.model';
import { Publisher } from './publisher.model';

export interface Hero {
  id: number;
  name: string;
  powerId: number;
  publisherId: number;
  firstAppearance: number;
}

export interface HeroDetail extends Hero {
  power: Power;
  publisher: Publisher;
}
