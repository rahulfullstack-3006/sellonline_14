import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faPhone, faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-leaddashboard',
  templateUrl: './leaddashboard.component.html',
  styleUrls: ['./leaddashboard.component.css']
})
export class LeaddashboardComponent implements OnInit {

  faEnvelope=faEnvelope;
  faPhone=faPhone;
  faSearch=faSearch;
  faWindowClose=faWindowClose;
  allLeadCardDetails:any;
  eachItemId:any
  searchText:any=''
  // leadCardDetails:any=[
  // {"id":1,"lead_name":"ABC","lead_id":"5993323137605","created_on":"23 February 2023","mobile_no":"9874561236","email":"abc12@gmail.com"},
  // {"id":2,"lead_name":"ABCD","lead_id":"5993323137606","created_on":"23 February 2023","mobile_no":"9823561236","email":"cd12@gmail.com"},
  // {"id":3,"lead_name":"ABCE","lead_id":"5993323137607","created_on":"24 February 2023","mobile_no":"9896561236","email":"ef6@gmail.com"},
  // {"id":4,"lead_name":"ABF","lead_id":"5993323137608","created_on":"24 February 2023","mobile_no":"9884561236","email":"a55@gmail.com"},
  // {"id":5,"lead_name":"ABCG","lead_id":"5993323137609","created_on":"25 February 2023","mobile_no":"9984561236","email":"a8c@gmail.com"},
  // {"id":6,"lead_name":"ABCI","lead_id":"5993323137600","created_on":"25 February 2023","mobile_no":"9814561236","email":"apl58@gmail.com"},
  // {"id":6,"lead_name":"ABCI","lead_id":"5993323137600","created_on":"25 February 2023","mobile_no":"9814561236","email":"apl58@gmail.com"},
  // {"id":6,"lead_name":"ABCI","lead_id":"5993323137600","created_on":"25 February 2023","mobile_no":"9814561236","email":"apl58@gmail.com"},
  // {"id":6,"lead_name":"ABCI","lead_id":"5993323137600","created_on":"25 February 2023","mobile_no":"9814561236","email":"apl58@gmail.com"},

  // ];
  leadCardDetails:any={}
  backtoSearchIcon: boolean=false;
  searchtoBackIcon:boolean=true;
  search:boolean=false
  constructor(private router:Router,private mainService:MainService) { }

  ngOnInit(): void {
    // console.log("this.leadCardDetails",this.leadCardDetails);
    // this.allLeadCardDetails=this.leadCardDetails;
    // console.log("allLeadCardDetails",this.allLeadCardDetails);
    this.mainService.leadDashboard().subscribe({
      next:(result:any)=>{
        console.log("result",result.data);
        this.leadCardDetails=result.data
        console.log("data for leadDashborad",this.leadCardDetails);  

      },
      error:(error)=>{
        console.log("error while fetching leadDashboard",error);
        
      }
    })
    
  }

  onSearch(){
    this.mainService.searchLeadDetails(this.searchText).subscribe({
      next:(searchResult)=>{
        console.log("searchResult",searchResult);   
      },
      error:(err)=>{
        console.log("err",err);
        
      }
    })
  }

  createNewLead(){
   this.router.navigate(['/leadCreation'])
  }

  onEdit(item:any){
    console.log("item for edit",item);
    this.eachItemId=item.leadId;
    console.log("this.eachItemId",this.eachItemId);   
    this.router.navigate(['/updateLead',this.eachItemId])
  }

  onViewDetails(item:any){
    // this.router.navigate(['/productDashboard'])
    console.log("itemmmmm",item);    
    localStorage.setItem('leadDetails',JSON.stringify(item))
    
    this.router.navigate(['/productDashboard'])

  }

  clearText(event:MouseEvent,myText:HTMLInputElement){
  console.log("event",myText.value);
  myText.value='';
    this.mainService.leadDashboard().subscribe({
      next:(result:any)=>{
        console.log("result",result.data);
        this.leadCardDetails=result.data
        console.log("data for leadDashborad",this.leadCardDetails);  

      },
      error:(error)=>{
        console.log("error while fetching leadDashboard",error);
        
      }
    })
  
  this.backtoSearchIcon=true
  
  }

  searchIcon(){
  this.backtoSearchIcon=true
  }

  closeIcon(){
 this.searchtoBackIcon=false
  }




}
