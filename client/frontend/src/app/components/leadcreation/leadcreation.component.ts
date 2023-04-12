import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
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
  constructor(private fb:FormBuilder,private router:Router,private mainService:MainService,private ngxService: NgxUiLoaderService) {
    // this.minDate = new Date();
    // this.maxDate = new Date();
    // this.minDate.setDate(this.minDate.getDate() - 4);
    // this.maxDate.setDate(this.maxDate.getDate() + 10);
   }

  ngOnInit(): void {
    this.leadForm=this.fb.group({
      insurance_type: ['individual'],
      // first_name: ['',Validators.required],
      first_name:['',[Validators.required,Validators.maxLength(20),Validators.pattern(/^([a-zA-Z]){1}([a-zA-Z&/ '-]*)$/)]],
      middle_name: ['',Validators.pattern(/^([a-zA-Z]){1}([a-zA-Z&/ '-]*)$/)],
      last_name: ['',[Validators.required,Validators.maxLength(20),Validators.pattern(/^([a-zA-Z]){1}([a-zA-Z&/ '-]*)$/)]],
      gender:['',Validators.required],
      dob:['',Validators.required],
      marital_status:['',[Validators.required]],
      resident_status:['resident_indian'],
      disposition:['new_status_dispsition'],
      sub_disposition:['new_status_sub_disposition'],
      address:['',[Validators.required]],
      landmark:['',[Validators.required]],
      country:['',[Validators.required]],
      state:['',[Validators.required]],
      city:['',[Validators.required]],
      pincode:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      mobile: ['',[Validators.required]],
      agent_servicing_state:['',[Validators.required]],
     })
  
     this.createForm()

    this.getCountryDropDown();
    this.getAgentServicingState();
  }

  // checkNameValidity(group: FormGroup) {
  //   const firstName=group.get('first_name')?.value
  //   const middleName = group.get('middle_name')?.value;
  //   const lastName = group.get('last_name')?.value;

  //   if (!firstName) {
  //     group.get('first_name')?.setErrors({ 'required': true });
  //   }
  //   if (!middleName) {
  //     group.get('middle_name')?.setErrors({ 'required': true });
  //   }
  
  //   if (!lastName) {
  //     group.get('last_name')?.setErrors({ 'required': true });
  //   }

  //   if (firstName && middleName && firstName === middleName) {
  //     group.get('middle_name')?.setErrors({ 'sameName': true });
  //   }

  //   if (firstName && lastName && firstName === lastName) {
  //     group.get('last_name')?.setErrors({ 'sameName': true });
  //   }
  // }
  
  // hasFirstNameMiddleNameError() {
  //   const middleNameControl = this.leadForm.get('middle_name');
  //   const firstNameControl=this.leadForm.get('first_name')
  //   return middleNameControl.hasError('sameName') ||  (firstNameControl.hasError('required') && (firstNameControl.touched && middleNameControl.touched));
  // }

  // hasFirstNameLastNameError() {
  //   const lastNameControl = this.leadForm.get('last_name');
  //   return lastNameControl.hasError('sameName') && lastNameControl.touched;
  // }


  createForm() {
    this.leadForm.controls['first_name'].valueChanges.subscribe((value:any) => {
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
    console.log("idddd",event.target);
    const selectedId = event.target.options[event.target.selectedIndex].id;
    console.log("selectedId",selectedId);
    this.countryChangeData=event.target.value
    console.log("this.countryChangeData",this.countryChangeData);
  //  this.getStateDropDownField(selectedId,this.countryChangeData) 
  this.getStateDropDownField(selectedId) 

    
    }

  onStateChange(event:any){
    // console.log("event for states",event.target.value);
    // this.stateChangeData=event.target.value;
    const selectedStateId = event.target.options[event.target.selectedIndex].id;
    console.log("selectedStateId",selectedStateId);
    this.getCityDropDown(selectedStateId)
    
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
    this.submitted = true;
    if (this.leadForm.invalid) {
      return;
    }
      console.log("leadCreation",this.leadForm.value);
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
