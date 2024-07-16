import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3/';
apiKey = '=adbde5bd448af6fa06ed31189c8e1011'
  constructor(private _httpClient: HttpClient) {}

  getTrending(type: string): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}trending/${type}/week?api_key`
    );
  }
  getTrendingToday(type: string): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}trending/${type}/day?api_key`
    );
  }
  getMovieDetails(id: string): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}movie/${id}?api_key`
    );
  }

  getTvShowDetails(id: string): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}tv/${id}?api_key`
    );
  }

  getPersonDetails(id: string): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}person/${id}?api_key`
    );
  }

  getNetworkDetails(id: string): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}network/${id}?api_key`);
  }

  getPopularMovies(pageCount: number): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}movie/popular?api_key&page=${pageCount}`
    );
  }

  getPopularTvShows(pageCount: number): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}tv/popular?api_key&page=${pageCount}`
    );
  }

  getPopularPeople(pageCount: number): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}person/popular?api_key&page=${pageCount}`
    );
  }

  searchOnMovie(term:string, page:number): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}search/movie?api_key&query=${term}&page=${page}`
    );
  }

  searchOnTV(term:string, page:number): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}search/tv?api_key&query=${term}&page=${page}`
    );
  }

  searchOnPerson(term:string, page:number): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}search/person?api_key&query=${term}&page=${page}`
    );
  }

  searchAllMovies(term: string, totalPages: number): Observable<any[]> {
    const requests = [];
    for (let page = 1; page <= totalPages; page++) {
      requests.push(this.searchOnMovie(term, page));
    }
    return forkJoin(requests).pipe(
      map(results => results.flatMap(res => res.results))
    );
  }

  searchAllTVShows(term: string, totalPages: number): Observable<any[]> {
    const requests = [];
    for (let page = 1; page <= totalPages; page++) {
      requests.push(this.searchOnTV(term, page));
    }
    return forkJoin(requests).pipe(
      map(results => results.flatMap(res => res.results))
    );
  }

  searchAllPeople(term: string, totalPages: number): Observable<any[]> {
    const requests = [];
    for (let page = 1; page <= totalPages; page++) {
      requests.push(this.searchOnPerson(term, page));
    }
    return forkJoin(requests).pipe(
      map(results => results.flatMap(res => res.results))
    );
  }

}

