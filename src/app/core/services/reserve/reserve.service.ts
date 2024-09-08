import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDataAccess, ReserveDataAccess, BaseResponse } from '@core/types';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class ReserveDataAccessService implements BaseDataAccess<ReserveDataAccess> {
    private httpClient = inject(HttpClient)
    private _apiBaseUrl = environment.apiBaseUrl + 'reserve'
    create(createEntityDto: Omit<ReserveDataAccess, 'agency' | 'register' | 'passengers'>): Observable<BaseResponse<ReserveDataAccess>> {
        return this.httpClient.post<BaseResponse<ReserveDataAccess>>(this._apiBaseUrl, createEntityDto)
    }
    findAll(): Observable<BaseResponse<ReserveDataAccess[]>> {
        return this.httpClient.get<BaseResponse<ReserveDataAccess[]>>(this._apiBaseUrl)
    }
    findById(id: string): Observable<BaseResponse<ReserveDataAccess>> {
        return this.httpClient.get<BaseResponse<ReserveDataAccess>>(this._apiBaseUrl + '/' + id)
    }
    findByIdAndUpdate(id: string, createEntity: ReserveDataAccess): Observable<BaseResponse<ReserveDataAccess>> {
        return this.httpClient.patch<BaseResponse<ReserveDataAccess>>(this._apiBaseUrl + '/' + id, createEntity)
    }
    findByIdAndDelete(id: string): Observable<BaseResponse<ReserveDataAccess>> {
        return this.httpClient.delete<BaseResponse<ReserveDataAccess>>(this._apiBaseUrl + '/' + id)
    }
}