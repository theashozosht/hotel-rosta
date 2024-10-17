import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { BaseResponse } from "../types/interfaces";
import { MessageService } from "primeng/api";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private _messageService = inject(MessageService)
    intercept(httpRequest: HttpRequest<BaseResponse<any>>, httpHandle: HttpHandler): Observable<HttpEvent<BaseResponse<any>>> {
        if (httpRequest.body?.error) {
            this._messageService.add({ severity: 'error', summary: ' خطا', detail: httpRequest.body.message, life: 3000 });
        }

        return httpHandle.handle(httpRequest);
    }
}