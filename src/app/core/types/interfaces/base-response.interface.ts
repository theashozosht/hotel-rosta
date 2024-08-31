export interface  BaseResponse<T> {
    result: T,
    error: any,
    timestamp: number | string
}