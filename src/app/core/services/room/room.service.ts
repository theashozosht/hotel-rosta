import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseDataAccess, BaseResponse, RoomDataAccess } from '@core/types';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class RoomDataAccessService implements BaseDataAccess<RoomDataAccess> {
    private httpClient = inject(HttpClient)
    private _apiBaseUrl = environment.apiBaseUrl + 'rooms';

    create(createEntityDto: RoomDataAccess): Observable<BaseResponse<RoomDataAccess>> {
        throw new Error('')
    }
    findAll(): Observable<BaseResponse<RoomDataAccess[]>> {
        return this.httpClient.get<BaseResponse<RoomDataAccess[]>>(this._apiBaseUrl)
    }
    findById(id: string): Observable<BaseResponse<RoomDataAccess>> {
        return this.httpClient.get<BaseResponse<RoomDataAccess>>(this._apiBaseUrl + '/' + id)
    }
    findByIdAndUpdate(id: string, createEntity: RoomDataAccess): Observable<BaseResponse<RoomDataAccess>> {
        return this.httpClient.patch<BaseResponse<RoomDataAccess>>(this._apiBaseUrl + '/' + id, createEntity)
    }
    findByIdAndDelete(id: string): Observable<BaseResponse<RoomDataAccess>> {
        return this.httpClient.delete<BaseResponse<RoomDataAccess>>(this._apiBaseUrl + '/' + id)
    }

}