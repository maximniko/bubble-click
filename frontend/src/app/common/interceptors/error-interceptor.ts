import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {Injectable} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    return handler.handle(req).pipe(
      retry(3),
      catchError((err: any, caught: Observable<HttpEvent<any>>) => {
        if (err) {
          switch (err.status) {
            case 400:
              break;
            case 401:
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: err.error}};
              this.router.navigateByUrl("/server-error", navigationExtras);
              break;
            default:
              break;
          }
          throw err;
        }

        return caught
      })
    )
  }
}
