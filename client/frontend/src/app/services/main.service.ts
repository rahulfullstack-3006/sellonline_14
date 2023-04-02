import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  APIURL=`${environment.apiUrl}`;
  loginURL='/loginusingMongo';
  registerURL='/registerusingMongo';
  leadDashboardURL='/leadDashboard';
  leadCreateUrl='/leadCreate';
  eachLeadDetailsURL='/getEachLeadDetails';
  updateLeadURL='/updateLead';
  searchURL='/search';


  // headers=header || {};
  isLoggedIn:boolean=false;
  token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjQ0NDQ0NDQiLCJlbWFpbCI6InNlbGxvbmxpbmUxMjNAdGF0YWFpYS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRaM2V5V3I0TDRkbmk0MDVMU1QwZFFPOEZxLzdKTi93UG5vTkg1NlhYU3daSHlJbUUxdHVyTyIsImlhdCI6MTY3OTU1MDQ0MywiZXhwIjoxNjc5NjM2ODQzfQ.PZOXj_ajVYqqXh64mnLS3mLUvwrSZ1e3rcRrqKCsQGY'
  constructor(private http:HttpClient) { }

  getAuthStatus(){
    return this.isLoggedIn=true;
  }

  headerObj(){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });
    return headers
  }

  public login(body:any){ 
    return this.http.post(this.APIURL + this.loginURL,body,{headers:this.headerObj()});
    }

  public register(body:any){ 
      return this.http.post(this.APIURL + this.registerURL,body,{headers:this.headerObj()});
    }
  
  public leadDashboard(){
    return this.http.get(this.APIURL+ this.leadDashboardURL,{headers:this.headerObj()});
  }

  public leadCreate(body:any){ 
    return this.http.post(this.APIURL + this.leadCreateUrl,body,{headers:this.headerObj()});
  }

  public getEachLeadDetails(id:any){
    return this.http.get(this.APIURL + this.eachLeadDetailsURL + '/' +id,{headers:this.headerObj()});
  }

  public updateLead(id:any,body:any){ 
    return this.http.put(this.APIURL + this.updateLeadURL + '/' +id,body,{headers:this.headerObj()});
  }

  public searchLeadDetails(key:any){
    return this.http.get(this.APIURL + this.searchURL + '/' +key,{headers:this.headerObj()});
  }

  // public login(url:any,body:any,header:any){
  // var headers=header || {};
  // return this.http.post(this.APIURL + url,body,{headers:headers});
  // }

}
