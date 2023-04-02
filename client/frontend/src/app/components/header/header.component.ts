import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showLogoutButton:boolean=false;
  constructor(private ngxService: NgxUiLoaderService,private router:Router) { }

  ngOnInit(): void {
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
  

}
