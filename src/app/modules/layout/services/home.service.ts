import { TransferState, makeStateKey } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { roots } from '../../shared/configs/endPoints';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiUrl: string = environment?.apiUrl;

  homeDataServerSubj = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) { }

  getHomeData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.homePage?.getData}`);
  }
  contactUs(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${roots?.homePage?.contactUs}`, data);
  }


  getTripForSave(id: any): Observable<any> {
    let params = new HttpParams();
    if (id != null) {
      params = params.append('id', id);
    }
    return this.http.get(
      `${this.apiUrl}/${roots?.homePage?.getData}`,
      { params: params });
  }

  prepareTrip(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${roots?.homePage?.getData}`, data);
  }

  getSuggestedPlaces(skipCount?: any, maxResultCount?: any, keyWord?: any): Observable<any> {
    let params = new HttpParams();
    if (skipCount != null) {
      params = params.append('skipCount', skipCount);
    }
    if (maxResultCount != null) {
      params = params.append('maxResultCount', maxResultCount);
    }
    if (keyWord != null) {
      params = params.append('keyWord', keyWord);
    }
    return this.http.get(
      `${this.apiUrl}/${roots?.homePage?.getData}`, { params: params });
  }
  getTripById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roots?.homePage?.getData}/${id}`);
  }
  deleteTrip(id?: any): Observable<any> {
    let params = new HttpParams();
    if (id != null) {
      params = params.append('id', id);
    }
    return this.http.delete(
      `${this.apiUrl}/${roots?.homePage?.getData}/${id}`);
  }
}
