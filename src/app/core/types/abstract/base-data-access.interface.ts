import { BaseResponse } from '@core/types'
import { Observable } from 'rxjs';

export interface BaseDataAccess<T> {
    create(createEntityDto: T): Observable<BaseResponse<T>>;
    findAll(): Observable<BaseResponse<Array<T>>>;
    findById(id: string): Observable<BaseResponse<T>>;
    findByIdAndUpdate(id: string, createEntity: T): Observable<BaseResponse<T>>;
    findByIdAndDelete(id: string): Observable<BaseResponse<T>>;
}