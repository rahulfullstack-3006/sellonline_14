import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any=FormGroup;
  loginSubmitData:any;
  loading:boolean=false
  constructor(private fb:FormBuilder,private mainService:MainService,private router:Router,private spinner: NgxSpinnerService) { }

  
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:'',
      password:''

    })


    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    // this.loaderService.loading$.subscribe(loading=>{
    //  this.loading=loading;
    //  console.log("this.loading",this.loading);
     
    // })
  }

  onSubmit(){
    console.log("this.loginForm.value",this.loginForm.value);
    // this.loaderService.show();
    this.spinner.show();
    this.mainService.login(this.loginForm.value).subscribe({
    next:(result:any)=>{
    console.log("result for login",result['data']['token']);//local storage and captcha(google catcha)
    // this.loginSubmitData=result['data']['token'];
    //   localStorage.setItem('token',this.loginSubmitData)
    //   this.router.navigate(['/leadDashboard'])
    if(result['data']['token'] == undefined){
      alert('Please register')
    }else{ 
      this.loginSubmitData=result['data']['token'];
      localStorage.setItem('token',this.loginSubmitData)
      // this.loaderService.hide();
      this.spinner.hide();
      this.router.navigate(['/leadDashboard'])
    }

    
    },
    error:(err)=>{
      console.log("err in login",err);
      // this.loaderService.hide();
      this.spinner.hide();

      
    }
    })

  }


}
