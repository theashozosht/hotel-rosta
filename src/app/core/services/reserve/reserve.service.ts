import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDataAccess, ReserveDataAccess, BaseResponse } from '@core/types';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class ReserveDataAccessService implements BaseDataAccess<ReserveDataAccess> {
    private httpClient = inject(HttpClient)
    private _apiBaseUrl = environment.apiBaseUrl + 'reserve'
    create(createEntityDto: Omit<ReserveDataAccess, 'reserveCode' | 'agency' | 'register'>): Observable<BaseResponse<ReserveDataAccess>> {
        return this.httpClient.post<BaseResponse<ReserveDataAccess>>(this._apiBaseUrl, createEntityDto)
    }
    findAll(): Observable<BaseResponse<ReserveDataAccess[]>> {
        return this.httpClient.get<BaseResponse<ReserveDataAccess[]>>(this._apiBaseUrl)
    }
    findById(id: string | number): Observable<BaseResponse<ReserveDataAccess>> {
        return this.httpClient.get<BaseResponse<ReserveDataAccess>>(this._apiBaseUrl + '/' + id)
    }
    findByIdAndUpdate(id: string | number, createEntity: Omit<ReserveDataAccess, 'reserveCode' | 'agency' | 'register'>): Observable<BaseResponse<ReserveDataAccess>> {
        return this.httpClient.patch<BaseResponse<ReserveDataAccess>>(this._apiBaseUrl + '/' + id, createEntity)
    }
    findByIdAndDelete(id: string | number): Observable<BaseResponse<ReserveDataAccess>> {
        return this.httpClient.delete<BaseResponse<ReserveDataAccess>>(this._apiBaseUrl + '/' + id)
    }
}