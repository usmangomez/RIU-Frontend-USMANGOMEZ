import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Hero, Paginated, Power, Publisher } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HeroesApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.heroesApi;

  getHeroes(page: number, perPage: number = 10): Observable<Paginated<Hero[]>> {
    const params = new HttpParams().set('_page', page).set('_per_page', perPage);
    return this.http.get<Paginated<Hero[]>>(`${this.apiUrl}/heroes`, { params });
  }

  getPowers(): Observable<Power[]> {
    return this.http.get<Power[]>(`${this.apiUrl}/powers`);
  }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${this.apiUrl}/publishers`);
  }
}
