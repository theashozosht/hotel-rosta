import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(httpRequest: HttpRequest<any>, httpHandle: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("_session") as string;

        if (httpRequest.url.toLocaleLowerCase().indexOf('sign-in'.toLocaleLowerCase()) === -1) {
            httpRequest = httpRequest.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + token
                }
            });
        }

        if (!httpRequest.headers.has('Content-Type') && !(httpRequest.body instanceof FormData)) {
            httpRequest = httpRequest.clone({
                headers: httpRequest.headers.set('Content-Type', 'application/json')
            });
        }

        httpRequest = httpRequest.clone({
            headers: httpRequest.headers.set('Accept', 'application/json')
        });


        return httpHandle.handle(httpRequest).pipe(
            map<HttpEvent<any>, any>(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                    }
                    return event;
                }
            )
        ).pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    if ([401, 403].indexOf(error.status) !== -1) {
                        localStorage.removeItem("_session")
                    }

                    return throwError(error);
                }
            )
        );
    }
}