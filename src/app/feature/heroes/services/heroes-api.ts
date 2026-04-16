import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Hero, HeroDetail, Paginated, Power, Publisher } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HeroesApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.heroesApi;

  getHeroes(
    name: string = '',
    page: number = 1,
    perPage: number = 10,
  ): Observable<Paginated<HeroDetail>> {
    let params = new HttpParams()
      .set('_embed', 'power')
      .append('_embed', 'publisher')
      .set('_page', page)
      .set('_per_page', perPage);
    if (name) params = params.set('name_contains', name);
    return this.http.get<Paginated<HeroDetail>>(`${this.apiUrl}/heroes`, { params });
  }

  getHeroById(id: string): Observable<HeroDetail> {
    const params = new HttpParams().set('_embed', 'power').append('_embed', 'publisher');
    return this.http.get<HeroDetail>(`${this.apiUrl}/heroes/${id}`, { params });
  }

  getPowers(): Observable<Power[]> {
    return this.http.get<Power[]>(`${this.apiUrl}/powers`);
  }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${this.apiUrl}/publishers`);
  }

  postHero(body: Omit<Hero, 'id'>): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiUrl}/heroes`, body);
  }

  putHero(id: string, body: Omit<Hero, 'id'>): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/heroes/${id}`, body);
  }
}
