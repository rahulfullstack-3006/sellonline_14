import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebook,faLinkedin,faTwitter,faYoutube } from '@fortawesome/free-brands-svg-icons';
import { MainService } from 'src/app/services/main.service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-leadcreation',
  templateUrl: './leadcreation.component.html',
  styleUrls: ['./leadcreation.component.css']
})
export class LeadcreationComponent implements OnInit {
  leadForm!:FormGroup;
  faFacebook=faFacebook;
  faYoutube=faYoutube;
  faLinkedin=faLinkedin;
  faTwitter=faTwitter;
  leadCreateForm:any=FormGroup;
  showLogoutButton:boolean=false;
  constructor(private fb:FormBuilder,private router:Router,private mainService:MainService,private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.leadForm=this.fb.group({
      insurance_type:['individual'],
      first_name:[''],
      middle_name:[''],
      last_name:[''],
      dob:[''].toString,
      email:[''],
      mobile:[''],
      address:[''],
      state:[''],
      city:['']

    })
  }

  onSubmit(){
    console.log("leadCreation",this.leadForm.value);
    // const dateModify=this.leadForm.value.dob;
    // console.log("datemodify",dateModify.toString());
    

    this.mainService.leadCreate(this.leadForm.value).subscribe({
      next:(result)=>{
        console.log("result",result);
        alert('Lead save successfully');
        this.router.navigate(['/leadDashboard']);
        
      },
      error:(error)=>{
        console.log("error",error);
        
      }

    })
    
    
  }

  onLogout(){
  console.log("logout");
  this.ngxService.start();
  localStorage.removeItem('token');
  localStorage.removeItem('valueSISPersonal');
  localStorage.removeItem('leadwithSISdetails');
  localStorage.removeItem('leadDetails');

  setTimeout(() => {
    this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
  }, 1000);
  this.router.navigate(['/login'])

  
  }

  // onSaveProcced(){
  //  this.router.navigate(['/leadDashboard'])
  // }


}
