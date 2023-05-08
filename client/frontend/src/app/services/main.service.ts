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
  countryURL='/getCountrydropDown';
  stateURL='/getStatedropDown';
  cityURL='/getCitydropDown';
  getStateOnly='/india/getIndiaStateOnlyDrop';
  sisPersonal='/sisPersonal';
  saveSISCalculationURL='/saveSISCalculation';
  sisCalculation='/sisCalculation';
  sisCalculationInvestTextAmount='/sisCalculation/InvestTextAmount';
  sisRiderSelectionUrl='/saveSISRiderSelection';



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

  public getCountrydropDown(){
    return this.http.get(this.APIURL + this.countryURL,{headers:this.headerObj()});
  }

  public getStatedropDown(key:any){
    return this.http.get(this.APIURL + this.stateURL + '/' +key,{headers:this.headerObj()});
  }

  public getCitydropDown(key:any){
    return this.http.get(this.APIURL + this.cityURL + '/' +key,{headers:this.headerObj()});
  }

  public getIndiaStates(){ 
    return this.http.get(this.APIURL + this.getStateOnly,{headers:this.headerObj()});
  }

  public createSISPersonal(body:any){ 
    return this.http.post(this.APIURL + this.sisPersonal,body,{headers:this.headerObj()});
  }

  public saveSISCalculation(body:any){ 
    return this.http.post(this.APIURL + this.saveSISCalculationURL,body,{headers:this.headerObj()});
  }

  public createSISCalculation(body:any){ 
    return this.http.post(this.APIURL + this.sisCalculation,body,{headers:this.headerObj()});
  }

  public createSISCalculationInvestTextAmount(body:any){ 
    return this.http.post(this.APIURL + this.sisCalculationInvestTextAmount,body,{headers:this.headerObj()});
  }

  public saveSISRiderSelected(body:any){ 
    return this.http.post(this.APIURL + this.sisRiderSelectionUrl,body,{headers:this.headerObj()});
  }

}
