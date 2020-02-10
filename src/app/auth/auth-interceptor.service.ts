import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.user.pipe(take(1),exhaustMap(user => {
            if(user){
                const modifyRequest = req.clone({
                    params: new HttpParams().set('auth',user.Token)
                })
                return next.handle(modifyRequest)
            }
            return next.handle(req)
        }))
    }
}