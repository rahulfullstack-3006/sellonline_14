import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-editlead',
  templateUrl: './editlead.component.html',
  styleUrls: ['./editlead.component.css']
})
export class EditleadComponent implements OnInit {
  editLeadForm!:FormGroup;
  leadId:any;
  leadEditData:any;
  editToProduct:any
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private mainService:MainService,private router:Router) { }

  ngOnInit(): void {
    this.editLeadForm=this.fb.group({
      insurance_type:['individual'],
      first_name:[''],
      middle_name:[''],
      last_name:[''],
      dob:[''],
      email:[''],
      mobile:[''],
      address:[''],
      state:[''],
      city:['']
    })

    this.getLeadId()
  }
  

  getLeadId(){
     this.route.paramMap.subscribe((data:any)=>{
      this.leadId=data.get('id');
      console.log("this.leadId",this.leadId);    
     })
  this.mainService.getEachLeadDetails(this.leadId).subscribe({
    next:(result:any)=>{
    this.leadEditData=result.data;
    console.log("this.leadEditData",this.leadEditData);

    this.editLeadForm.patchValue({
      insurance_type:this.leadEditData['insurance_type'],
      first_name:this.leadEditData['first_name'],
      middle_name:this.leadEditData['middle_name'],
      last_name:this.leadEditData['last_name'],
      dob:this.leadEditData['dob'],
      email:this.leadEditData['email'],
      mobile:this.leadEditData['mobile'],
      address:this.leadEditData['address'],
      state:this.leadEditData['state'],
      city:this.leadEditData['city']
    })   
    },
    error:(err:any)=>{
      console.log("error",err);     
    }
  })
  }

  onSubmit(){
    console.log("leadCreation",this.editLeadForm.value);
    this.mainService.updateLead(this.leadId,this.editLeadForm.value).subscribe({
      next:(data:any)=>{
        console.log("update data succesfully",data);
        // this.editToProduct=data.data;
        // console.log("this.editToProduct",JSON.stringify(this.editToProduct));
        
        // localStorage.setItem('leadDetails',JSON.stringify(this.editToProduct))
        this.router.navigate(['/leadDashboard']);     
      },
      error:(error:any)=>{
        console.log("error in edit data",error);
        
      }
    })
    
  }


}
