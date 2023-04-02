import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-productdashboard',
  templateUrl: './productdashboard.component.html',
  styleUrls: ['./productdashboard.component.css']
})
export class ProductdashboardComponent implements OnInit {
  title = 'ng-carousel-demo';
  leadDetailsParse:any;
  allLeadDetails:any;

   
  images = [
    {title: '', short: 'Protecting those who care unconditionally', src: "https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/images/revamp/product-banner.jpg?v=1676638150423"},
    {title: '', short: 'Protecting those who care unconditionally', src: "https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/images/revamp/product-banner.jpg?v=1676638150423"},
    {title: '', short: 'Protecting those who care unconditionally', src: "https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/images/revamp/product-banner.jpg?v=1676638150423"}
  ];
   
  constructor(config: NgbCarouselConfig,private router:Router) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
   }
   

  ngOnInit(): void {
  this.leadDetailsParse=localStorage.getItem('leadDetails');
  this.allLeadDetails=JSON.parse(this.leadDetailsParse);
  console.log("this.allLeadDetails",this.allLeadDetails);     
  }

  onSisPersonal(){
   this.router.navigate(['/sisPersonal'])
  }


  onBuyNow(){

    this.allLeadDetails['pgl_id']=357;
    this.allLeadDetails['productName']="Tata AIA Life Insurance Saral Jeevan Bima";
    this.allLeadDetails['UIN']='110N160V04';
    console.log("this.allLeadDetails",JSON.stringify(this.allLeadDetails));    
    localStorage.setItem('leadDetails',JSON.stringify(this.allLeadDetails))
    this.router.navigate(['/sisPersonal'])
  }


}
