import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private mainService:MainService,private router:Router) { }

  canActivate(route:ActivatedRoute,state:RouterStateSnapshot):boolean | Promise<boolean>{
   var isAuthenticated=this.mainService.getAuthStatus();
   console.log("isAuthenticated",isAuthenticated);
   
   if(!isAuthenticated){
     this.router.navigate(['/login'])
   }
   return isAuthenticated
 
  }
}
