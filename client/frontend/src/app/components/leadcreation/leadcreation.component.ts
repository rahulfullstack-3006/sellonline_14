import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebook,faLinkedin,faTwitter,faYoutube } from '@fortawesome/free-brands-svg-icons';
import { MainService } from 'src/app/services/main.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
// import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-leadcreation',
  templateUrl: './leadcreation.component.html',
  styleUrls: ['./leadcreation.component.css']
})

export class LeadcreationComponent implements OnInit {
  leadForm:any=FormGroup;
  faFacebook=faFacebook;
  faYoutube=faYoutube;
  faLinkedin=faLinkedin;
  faTwitter=faTwitter;
  leadCreateForm:any=FormGroup;
  showLogoutButton:boolean=false;
  countryDropDownData:any=[];
  countryChangeData: any;
  stateDataFromCountry: any=[];
  stateChangeData: any=[];
  cityDataFromState:any=[];
  datePickerConfig = {
    dateInputFormat: 'DD/MM/YYYY',
    maxDate: new Date(),
    containerClass: 'theme-blue',
  };
  getStatesDropFromIndia:any=[];
  submitted = false;
  country='';
  state='';
  city='';
  isDisabled:boolean=true;
  firstNameMiddleNameDuplicate:boolean=false;
  firstNameLastNameDuplicate:boolean=false;
  middleLastNameDuplicate:boolean=false;


  constructor(private fb:FormBuilder,private router:Router,private mainService:MainService,private ngxService: NgxUiLoaderService) { }
  ngOnInit(): void {
    this.leadForm=this.fb.group({
      insurance_type: ['individual'],
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
      // mobile: ['',[Validators.required,this.mobileNumberValidator]],
      agent_servicing_state:['',[Validators.required]],
     })
    this.createForm()
    this.getCountryDropDown();
    this.getAgentServicingState();
    this.getStateDropDownField('IN');
    this.firstMiddleLastNameDuplicateCheck();
  }

  firstMiddleLastNameDuplicateCheck(){
    this.leadForm.valueChanges.subscribe((values:any)=>{
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


  createForm() {
    this.leadForm.controls['first_name'].valueChanges.subscribe((value:any) => {
      console.log("value",value);
      this.leadForm.controls['first_name'].setValue(value.toUpperCase(), { emitEvent: false });
    });

    this.leadForm.controls['middle_name'].valueChanges.subscribe((value:any) => {
      this.leadForm.controls['middle_name'].setValue(value.toUpperCase(), { emitEvent: false });
      });

    this.leadForm.controls['last_name'].valueChanges.subscribe((value:any) => {
        this.leadForm.controls['last_name'].setValue(value.toUpperCase(), { emitEvent: false });
        });
  }

   getAgentServicingState(){
    this.mainService.getIndiaStates().subscribe({
      next:(resultStateOnly:any)=>{
    console.log("resultStateOnly",resultStateOnly);
    this.getStatesDropFromIndia=resultStateOnly.data
      }
    })
  }

  getCountryDropDown(){
    this.mainService.getCountrydropDown().subscribe({
      next:(result:any)=>{
        let resultData=result.data
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
    const selectedId = event.target.options[event.target.selectedIndex].id;
    console.log("selectedId",selectedId);
    this.countryChangeData=event.target.value
    console.log("this.countryChangeData",this.countryChangeData);
    // this.getStateDropDownField(this.countryChangeData);
    // this.getStateDropDownField('IN');


    
    }

  onStateChange(event:any){
    // console.log("event for states",event.target.value);
    this.stateChangeData=event.target.value;
    console.log("this.stateChangeData",this.stateChangeData); 
    // const selectedStateId = event.target.options[event.target.selectedIndex].id;
    // console.log("selectedStateId",selectedStateId);
    this.getCityDropDown(this.stateChangeData)
    
    // const statId=this.leadCreateForm.get('state').value;
    // this.getStateDropDown(statId)
  }
   getStateDropDownField(statId:any){
    console.log("statId",statId); 
    // let objState={statId}   
    this.mainService.getStatedropDown(statId).subscribe({
      next:(result:any)=>{
        let resultData=result.data
        console.log("resultData",resultData);
        this.stateDataFromCountry=Object.keys(resultData).map(key=>resultData[key])
        console.log("this.stateDataFromCountry",this.stateDataFromCountry);
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


  get f(): { [key: string]: AbstractControl } {
    return this.leadForm.controls;
  }

  onSubmit(){
  if(this.leadForm.valid){
    console.log("this.leadForm.valid",this.leadForm.valid);
    console.log("leadCreation",this.leadForm.value);
    this.mainService.leadCreate(this.leadForm.value).subscribe({
      next:(result)=>{
        console.log("result",result);
        alert('Lead save successfully');
        this.router.navigate(['/leadDashboard']);
       },
      error:(error)=>{
        console.log("error",error)    
      }
    })   
  }else{
    console.log("Form is not valid");
    this.validateAllFormFields(this.leadForm);
    alert('Please fill all the fields with valid data.');
  }  
  }

  private validateAllFormFields(formGroup:FormGroup){
  Object.keys(formGroup.controls).forEach(field=>{
    const control=formGroup.get(field);
    if(control instanceof FormControl){
      control.markAsDirty({onlySelf:true});
    }else if(control instanceof FormGroup){
      this.validateAllFormFields(control)
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



}
