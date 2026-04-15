import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Heroes } from '../heroes';
import { Hero, Paginated } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HeroesApi {
  private readonly http = inject(HttpClient);

  private readonly heroesApi = environment.heroesApi;

  public getHeroes(page: number, perPage: number = 10): Observable<Paginated<Hero[]>> {
    const params = new HttpParams()
      .set('_embed', 'power')
      .append('_embed', 'publisher')
      .set('_page', page)
      .set('_per_page', perPage);

    return this.http.get<Paginated<Hero[]>>(`${this.heroesApi}/heroes`, { params });
  }
}
