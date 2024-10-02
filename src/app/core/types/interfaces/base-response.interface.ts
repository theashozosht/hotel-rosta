export interface BaseResponse<T> {
  status: boolean;
  statusCode: number;
  path: string;
  result: T;
  timestamp: string;
  message: any,
  error: any;
}