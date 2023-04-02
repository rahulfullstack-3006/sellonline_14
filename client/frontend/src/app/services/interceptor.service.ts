import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable,NEVER, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjMzMzMzMzMiLCJlbWFpbCI6InNlbGxvbmxpbmUxMjM0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDJVbm5zRk4vY0tMUk9pZ3FaYWo4VHV6emFET2lUcjFiT3puWFU4M2l3NzNPbjhwd2JnL2dtIiwiaWF0IjoxNjgwMzM2NDkxLCJleHAiOjE2ODA0MjI4OTF9.iDQwk2M_lTRjaF2JoGt1uTEtjoZpd7AoMS134LXCjrw';
    let token=localStorage.getItem('token');
    console.log("token",token);
    
    if(token){
      req=req.clone({headers:req.headers.set('Authorization', 'Bearer ' + token)})
    }
    
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if(event.status == 401) {
              alert('Unauthorized access!')
            }
          }
          return event;
        },
        error: (error) => {
          if(error.status === 401) {
            alert('Unauthorized access!')
          }
          else if(error.status === 404) {
            alert('Page Not Found!')
          }
        }
      }));
    // return next.handle(req).pipe(
    //   map((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {

    //     }
    //     return event;
    //   }),
    //   error:(err)=>{
    //            if(err instanceof HttpErrorResponse){
    //     if(err.status === 401){
    //       return NEVER
    //     }else{
    //       return err;
    //     }
    //    }
    //   }
    //   catchError((err:any)=>{
    //    console.log("err",err);
    //    if(err instanceof HttpErrorResponse){
    //     if(err.status === 401){
    //       return NEVER
    //     }else{
    //       return err;
    //     }
    //    }
       
    //   })
    // )
  }
}
