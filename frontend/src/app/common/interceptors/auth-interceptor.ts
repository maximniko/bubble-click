import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {TwaService} from "../services/twa.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const initData = inject(TwaService).getInitData();

    return handler.handle(req.clone({
      headers: req.headers
        .append('Content-Type', 'application/json')
        .append('Authorization', `twa ${initData}`),
    }));
  }
}
