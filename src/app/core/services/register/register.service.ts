import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDataAccess, BaseResponse, RegisterDataAccess } from '@core/types';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterDataAccessService implements BaseDataAccess<RegisterDataAccess> {
    private httpClient = inject(HttpClient)
    private _apiBaseUrl = environment.apiBaseUrl + 'register'
    create(createEntityDto: RegisterDataAccess): Observable<BaseResponse<RegisterDataAccess>> {
        return this.httpClient.post<BaseResponse<RegisterDataAccess>>(this._apiBaseUrl + '/create', createEntityDto)
    }
    findAll(): Observable<BaseResponse<RegisterDataAccess[]>> {
        return this.httpClient.get<BaseResponse<RegisterDataAccess[]>>(this._apiBaseUrl + '/all')
    }
    findById(id: string): Observable<BaseResponse<RegisterDataAccess>> {
        return this.httpClient.get<BaseResponse<RegisterDataAccess>>(this._apiBaseUrl + '/' + id)
    }
    findByIdAndUpdate(id: string, createEntity: RegisterDataAccess): Observable<BaseResponse<RegisterDataAccess>> {
        return this.httpClient.patch<BaseResponse<RegisterDataAccess>>(this._apiBaseUrl + '/update/' + id, createEntity)
    }
    findByIdAndDelete(id: string): Observable<BaseResponse<RegisterDataAccess>> {
        return this.httpClient.delete<BaseResponse<RegisterDataAccess>>(this._apiBaseUrl + '/delete/' + id)
    }

}