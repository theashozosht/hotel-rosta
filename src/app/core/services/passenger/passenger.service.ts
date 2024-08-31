import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDataAccess, BaseResponse, PassengerDataAccess } from '@core/types';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class PassengerDataAccessService implements BaseDataAccess<PassengerDataAccess> {
    private httpClient = inject(HttpClient)
    private _apiBaseUrl = environment.apiBaseUrl + 'passengers'
    create(createEntityDto: PassengerDataAccess): Observable<BaseResponse<PassengerDataAccess>> {
        return this.httpClient.post<BaseResponse<PassengerDataAccess>>(this._apiBaseUrl, createEntityDto)
    }
    findAll(): Observable<BaseResponse<PassengerDataAccess[]>> {
        return this.httpClient.get<BaseResponse<PassengerDataAccess[]>>(this._apiBaseUrl)
    }
    findById(id: string): Observable<BaseResponse<PassengerDataAccess>> {
        return this.httpClient.get<BaseResponse<PassengerDataAccess>>(this._apiBaseUrl + '/' + id)
    }
    findByIdAndUpdate(id: string, createEntity: PassengerDataAccess): Observable<BaseResponse<PassengerDataAccess>> {
        return this.httpClient.patch<BaseResponse<PassengerDataAccess>>(this._apiBaseUrl + '/' + id, createEntity)
    }
    findByIdAndDelete(id: string): Observable<BaseResponse<PassengerDataAccess>> {
        return this.httpClient.delete<BaseResponse<PassengerDataAccess>>(this._apiBaseUrl + '/' + id)
    }

}