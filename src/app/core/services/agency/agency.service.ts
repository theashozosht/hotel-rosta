import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDataAccess, BaseResponse, AgencyDataAccess, AgencyDataAccessDTO } from '@core/types';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class AgencyDataAccessService  {
    private httpClient = inject(HttpClient)
    private _apiBaseUrl = environment.apiBaseUrl + 'agency'

    create(createEntityDto: AgencyDataAccessDTO): Observable<BaseResponse<AgencyDataAccess>> {
        return this.httpClient.post<BaseResponse<AgencyDataAccess>>(this._apiBaseUrl, createEntityDto)
    }
    findAll(): Observable<BaseResponse<AgencyDataAccess[]>> {
        return this.httpClient.get<BaseResponse<AgencyDataAccess[]>>(this._apiBaseUrl)
    }
    findById(id: string): Observable<BaseResponse<AgencyDataAccess>> {
        return this.httpClient.get<BaseResponse<AgencyDataAccess>>(this._apiBaseUrl + '/' + id)
    }
    findByIdAndUpdate(id: string, createEntity: AgencyDataAccessDTO): Observable<BaseResponse<AgencyDataAccess>> {
        return this.httpClient.patch<BaseResponse<AgencyDataAccess>>(this._apiBaseUrl + '/' + id, createEntity)
    }
    findByIdAndDelete(id: string): Observable<BaseResponse<AgencyDataAccess>> {
        return this.httpClient.delete<BaseResponse<AgencyDataAccess>>(this._apiBaseUrl + '/' + id)
    }
}