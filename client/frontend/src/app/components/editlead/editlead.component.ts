import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editlead',
  templateUrl: './editlead.component.html',
  styleUrls: ['./editlead.component.css']
})
export class EditleadComponent implements OnInit {
  editLeadForm!:FormGroup;
  leadId:any;
  leadEditData:any;
  editToProduct:any;
  submitted = false;
  countryChangeData: any;
  countryDropDownData:any=[];
  stateDataFromCountry: any=[];
  cityDataFromState:any=[];
  getStatesDropFromIndia:any=[];
  datePickerConfig = {
    dateInputFormat: 'DD/MM/YYYY',
    maxDate: new Date(),
    containerClass: 'theme-blue',
  };
  @ViewChild('#mySelect')
  mySelect!: ElementRef;
  country:any='';
  state:any='';
  city:any='';
  countryEditBind:any;
  stateEditBind:any;
  cityEditBind: any;
  stateChangeData:any='';
  firstNameLastNameDuplicate:any=false;
  firstNameMiddleNameDuplicate:any=false;
  middleLastNameDuplicate:any=false;


  constructor(private fb:FormBuilder,private route:ActivatedRoute,private mainService:MainService,private router:Router) { }

  ngOnInit(): void {
    this.editLeadForm=this.fb.group({
      insurance_type: [''],
      first_name:['',[Validators.required,Validators.maxLength(20),Validators.pattern(/^([a-zA-Z]){1}([a-zA-Z&/ '-]*)$/)]],
      middle_name: ['',[Validators.pattern(/^([a-zA-Z]){1}([a-zA-Z&/ '-]*)$/)]],
      last_name: ['',[Validators.required,Validators.maxLength(20),Validators.pattern(/^([a-zA-Z]){1}([a-zA-Z&/ '-]*)$/)]],
      gender:['',Validators.required],
      dob:['',Validators.required],
      marital_status:['',[Validators.required]],
      resident_status:['resident_indian'],
      disposition:['new_status_dispsition'],
      sub_disposition:['new_status_sub_disposition'],
      address:['',[Validators.required]],
      landmark:['',[Validators.required]],
      country:['India'],
      // country:[{ value: 'India', disabled: true }],
      state:['',[Validators.required]],
      city:['',[Validators.required]],
      pincode:['',[Validators.required]],
      email:['',[Validators.required,Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      mobile: ['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
      agent_servicing_state:['',[Validators.required]],
     })

     this.getCountryDropDown();
     this.getAgentServicingState();
    this.getLeadId();
    this.createForm();
    this.firstMiddleLastNameDuplicateCheck()
    // this.getDataEdit()
  }

  firstMiddleLastNameDuplicateCheck(){
    this.editLeadForm.valueChanges.subscribe((values:any)=>{
      const first_name=values.first_name;
      const middle_name=values.middle_name;
      const last_name=values.last_name;
      console.log("valueChanges",first_name,middle_name,last_name);
        if(first_name === last_name && first_name !== '' && last_name !== '' ){
        console.log("first_name === last_name",first_name === last_name,middle_name === last_name);
        this.firstNameLastNameDuplicate=true;
      } else {
        this.firstNameLastNameDuplicate=false;
      }

      if(first_name === middle_name && first_name !== '' && middle_name !== '' ){
        console.log("first_name === middle_name",first_name === middle_name);
        this.firstNameMiddleNameDuplicate=true;
      } else {
        this.firstNameMiddleNameDuplicate=false;
      }

      if(middle_name === last_name && middle_name !== '' && last_name !== '' ){
        console.log("middle_name === last_name",middle_name === last_name);
        this.middleLastNameDuplicate=true;
      } else {
        this.middleLastNameDuplicate=false;
      } 
    })
  }

  // getDataEdit(){
  
  //   this.stateEditBind=this.editLeadForm
  //   console.log("stateEdit",this.stateEditBind);
  //   this.getStateDropDownField(this.stateEditBind)

  // }



  createForm() {
    this.editLeadForm.controls['first_name'].valueChanges.subscribe((value:any) => {
    this.editLeadForm.controls['first_name'].setValue(value.toUpperCase(), { emitEvent: false });
    });

    this.editLeadForm.controls['middle_name'].valueChanges.subscribe((value:any) => {
      this.editLeadForm.controls['middle_name'].setValue(value.toUpperCase(), { emitEvent: false });
      });

    this.editLeadForm.controls['last_name'].valueChanges.subscribe((value:any) => {
        this.editLeadForm.controls['last_name'].setValue(value.toUpperCase(), { emitEvent: false });
        });
  }
  

  getLeadId(){
     this.route.paramMap.subscribe((data:any)=>{
      // this.leadId=data.get('id');
      this.leadId=parseInt(data.get('id'));
      console.log("this.leadId",this.leadId); 
      // console.log("this.leadIddd",parseInt(this.leadId)); 
      console.log("number lead id",typeof(this.leadId));    

     })
  this.mainService.getEachLeadDetails(this.leadId).subscribe({
    next:(result:any)=>{
    this.leadEditData=result.data;
    console.log("this.leadEditData",this.leadEditData);
    console.log("this.leadEditData['country']",this.leadEditData['country']);

    const date = this.leadEditData['dob']; // replace with your date
    const datePipe = new DatePipe('en-US');
    // const formattedDate = datePipe.transform(date, 'MM/dd/yyyy');
    const formattedDate = datePipe.transform(date, 'dd-MM-yyyy');
    console.log("formattedDate",formattedDate);
    

    this.editLeadForm.patchValue({
      insurance_type:this.leadEditData['insurance_type'],
      first_name:this.leadEditData['first_name'],
      middle_name:this.leadEditData['middle_name'],
      last_name:this.leadEditData['last_name'],
      gender:this.leadEditData['gender'],
      // dob:this.leadEditData['dob'],
      dob:formattedDate,
      marital_status:this.leadEditData['marital_status'],
      resident_status:this.leadEditData['resident_status'],
      disposition:this.leadEditData['disposition'],
      sub_disposition:this.leadEditData['sub_disposition'],
      address:this.leadEditData['address'],
      landmark:this.leadEditData['landmark'],
      country:this.leadEditData['country'],
      state:this.leadEditData['state'],
      city:this.leadEditData['city'],
      pincode:this.leadEditData['pincode'],
      email:this.leadEditData['email'],
      mobile:this.leadEditData['mobile'],
      agent_servicing_state:this.leadEditData['agent_servicing_state']
    })   

   this.countryEditBind=this.leadEditData['country']
    console.log("countryEdit",this.countryEditBind);
    // this.getStateDropDownField(this.countryEditBind);
    this.getStateDropDownField('IN');
    },
    error:(err:any)=>{
      console.log("error",err);     
    }
  })
  }

  // bindIdtoState(){
  //   console.log("this.leadEditData['country']",this.leadEditData['country']);
    
  //   // if(this.leadEditData['country']){
  //     // let countryId=document.getElementById('id');
  //     // console.log("countryId",countryId);
      
  //   //   }
  // }

  getCountryDropDown(){
    this.mainService.getCountrydropDown().subscribe({
      next:(result:any)=>{
        let resultData=result.data
        console.log("resultData for getCountry",resultData);
         this.countryDropDownData=Object.keys(resultData).map(key=>resultData[key]); 
        console.log("this.countryDropDownData",this.countryDropDownData);   
      },
      error:(err)=>{
        console.log("error in country dropdown",err);    
      }
    })
  }

  onCountryChange(event:any){
    console.log("idddd",event.target.value);
    // const selectedId = event.target.options[event.target.selectedIndex].id;
    // console.log("selectedId",selectedId);
    this.countryChangeData=event.target.value
    console.log("this.countryChangeData",this.countryChangeData);
  //  this.getStateDropDownField(selectedId,this.countryChangeData) 
  this.getStateDropDownField(this.countryChangeData)     
    }

    onStateChange(event:any){
      console.log("event for states",event.target.value);
      this.stateChangeData=event.target.value;
      // const selectedStateId = event.target.options[event.target.selectedIndex].id;
      // console.log("selectedStateId",selectedStateId);
      this.getCityDropDown(this.stateChangeData)
      
      // const statId=this.leadCreateForm.get('state').value;
      // this.getStateDropDown(statId)
    }

    
    getStateDropDownField(countryID:any){
      console.log("countryID",countryID); 
      // let objState={countryID}   
      this.mainService.getStatedropDown(countryID).subscribe({
        next:(result:any)=>{
          let resultData=result.data
          console.log("resultData",resultData);
          this.stateDataFromCountry=Object.keys(resultData).map(key=>resultData[key])
          console.log("this.stateDataFromCountry",this.stateDataFromCountry);
          if(this.stateDataFromCountry){
            this.cityEditBind=this.leadEditData['state']
            console.log("cityEditBind",this.cityEditBind);
            this.getCityDropDown(this.cityEditBind)
          }
        },
        error:(err)=>{
          console.log("error in country dropdown",err);
          
        }
      })
    }

    getCityDropDown(cityId:any){
      console.log("cityId",cityId);  
     this.mainService.getCitydropDown(cityId).subscribe({
        next:(result:any)=>{
          let resultData=result.data;
          console.log("resultData",resultData);
          this.cityDataFromState=Object.keys(resultData).map(key=>resultData[key]);
          console.log("this.cityDataFromState",this.cityDataFromState);
        },
        error:(err)=>{
          console.log("error in country dropdown",err);
  
        }
      })
  
    }

    

    getAgentServicingState(){
      this.mainService.getIndiaStates().subscribe({
        next:(resultStateOnly:any)=>{
      console.log("resultStateOnly",resultStateOnly);
      this.getStatesDropFromIndia=resultStateOnly.data
        }
      })
    }


    get f(): { [key: string]: AbstractControl } {
      return this.editLeadForm.controls;
    }

  onSubmit(){
    this.submitted = true;
    if (this.editLeadForm.invalid) {
      console.log("invalid form");  
      return;
    }
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
