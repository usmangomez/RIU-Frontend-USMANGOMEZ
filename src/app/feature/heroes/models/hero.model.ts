import { Power } from './power.model';
import { Publisher } from './publisher.model';

export interface Hero {
  id: string;
  name: string;
  powerId: string;
  publisherId: string;
  firstAppearance: number;
}

export interface HeroDetail extends Hero {
  power: Power;
  publisher: Publisher;
}
