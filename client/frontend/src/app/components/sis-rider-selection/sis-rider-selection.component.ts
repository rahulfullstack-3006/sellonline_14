import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-sis-rider-selection',
  templateUrl: './sis-rider-selection.component.html',
  styleUrls: ['./sis-rider-selection.component.css']
})
export class SisRiderSelectionComponent implements OnInit {

  sisRiderSelectionForm:any=FormGroup;
  localData:any;
  localSISStorage:any;
  sisIDLocalStorage:any;
  uinNumberFromLocal:any;
  leadIdFromLocal:any;
  sisIdFromLocal:any;
  isChecked: boolean = true;
  isHosiptalRiderFlag:boolean=true;
  isDeathRiderFlag:boolean=false;
  deathChecked:boolean=true;
  hosiptalChecked:boolean=false;
  hospiCareRiderFlag:boolean=true;
  uncheckCitriCareRiderOption:boolean=true;
  uncheckATPDRiderOption:boolean=true;
  uncheckTBRiderOption:boolean=true;
  uncheckADRiderOption:boolean=true;
  uncheckHospiCareRiderOption:boolean=true;
  isNewCheck:any;

  constructor(private fb:FormBuilder,private mainService:MainService,private router:Router) { }

  ngOnInit(): void {

    this.sisRiderSelectionForm=this.fb.group({
      // wellnessFlag:['wellnessFlag'],
      wellnessFlag:['Y'],
      death_radio:['death_radio'],
      hosiptal_radio:[''],
      criticare_plus:['criticare_plus'],
      atpd_rider:['atpd_rider'],
      tb_rider:['tb_rider'],
      ad_rider:['ad_rider'],
      hospicare_rider:['hospicare_rider']

    })
    this.localSISStorage=localStorage.getItem('sisCalculationAllDetailsToken')
    this.sisIDLocalStorage=JSON.parse(this.localSISStorage);    
    this.uinNumberFromLocal=this.sisIDLocalStorage['UIN'];    
    this.leadIdFromLocal=this.sisIDLocalStorage['leadId'];
    this.sisIdFromLocal=this.sisIDLocalStorage['valueSISPersonal']['sisId'];   
  }

  wellnessProgramChange(event:any){
    console.log("eveeeeeeeee",event);
    
    // this.isChecked = !this.isChecked;
    this.hospiCareRiderFlag=true;
    if(event === 'Y'){
      this.isChecked=true;
      console.log("wellness check",this.isChecked);
      this.sisRiderSelectionForm.value.criticare_plus=this.sisRiderSelectionForm.get('criticare_plus').value == 'criticare_plus'?'Y':'N';
      this.sisRiderSelectionForm.value.atpd_rider=this.sisRiderSelectionForm.get('atpd_rider').value == 'atpd_rider'?'Y':'N';
      this.sisRiderSelectionForm.value.tb_rider=this.sisRiderSelectionForm.get('tb_rider').value == 'tb_rider' ?'Y':'N';
      this.sisRiderSelectionForm.value.ad_rider=this.sisRiderSelectionForm.get('ad_rider').value == 'ad_rider' ?'Y':'N';
      this.sisRiderSelectionForm.value.hospicare_rider=this.sisRiderSelectionForm.get('hospicare_rider').value == 'hospicare_rider'?'Y':'N';
    console.log("all rider already selected",this.sisRiderSelectionForm.value.criticare_plus,this.sisRiderSelectionForm.value.atpd_rider,this.sisRiderSelectionForm.value.tb_rider,this.sisRiderSelectionForm.value.ad_rider,this.sisRiderSelectionForm.value.hospicare_rider);

    }else{
      console.log("wellness else",this.isChecked);
      this.isChecked=false;
    console.log("wellness else check",this.isChecked);
    console.log("all rider not selected",this.sisRiderSelectionForm.value.criticare_plus,this.sisRiderSelectionForm.value.atpd_rider,this.sisRiderSelectionForm.value.tb_rider,this.sisRiderSelectionForm.value.ad_rider,this.sisRiderSelectionForm.value.hospicare_rider);
    this.sisRiderSelectionForm.value.criticare_plus=this.sisRiderSelectionForm.get('criticare_plus').value == 'criticare_plus'?'N':'Y';
    this.sisRiderSelectionForm.value.atpd_rider=this.sisRiderSelectionForm.get('atpd_rider').value == 'atpd_rider'?'N':'Y';
    this.sisRiderSelectionForm.value.tb_rider=this.sisRiderSelectionForm.get('tb_rider').value == 'tb_rider' ?'N':'Y';
    this.sisRiderSelectionForm.value.ad_rider=this.sisRiderSelectionForm.get('ad_rider').value == 'ad_rider' ?'N':'Y';
    this.sisRiderSelectionForm.value.hospicare_rider=this.sisRiderSelectionForm.get('hospicare_rider').value == 'hospicare_rider'?'N':'Y';
    console.log("all rider",this.sisRiderSelectionForm.value.criticare_plus,this.sisRiderSelectionForm.value.atpd_rider,this.sisRiderSelectionForm.value.tb_rider,this.sisRiderSelectionForm.value.ad_rider,this.sisRiderSelectionForm.value.hospicare_rider);
    
    }

    // if(event.target.value === 'wellnessFlag'){
    //   console.log("wellness if");
      
    // this.isChecked=false;
    // console.log("wellness check",this.isChecked);
    
    // }else{
    //   console.log("wellness else");
    //   this.isChecked=true;
    // console.log("wellness else check",this.isChecked);

    // }



  // console.log("event",event.target.value);
  // this.sisRiderSelectionForm.value.criticare_plus=this.sisRiderSelectionForm.get('criticare_plus').value?'N':'Y';
  // console.log("this.sisRiderSelectionForm.value.criticare_plus",this.sisRiderSelectionForm.value.criticare_plus); 
  }

  // onCheckboxChange(value: boolean) {
  //   console.log("value checkbox",value); 
  //   this.sisRiderSelectionForm.patchValue({
  //     myCheckbox: value ? true : false,
  //   });
  // }

//   checkValue(event: any){
//     console.log("new event",event);
//  }


  unCheckedCriticarePlusRider(event:any){
    this.uncheckCitriCareRiderOption=false;
    // this.sisRiderSelectionForm.value.criticare_plus=this.sisRiderSelectionForm.get('criticare_plus').value?'N':'Y';
    if(event.target.value == 'criticare_plus'){
      this.sisRiderSelectionForm.value.criticare_plus='N';
    }else{
    this.sisRiderSelectionForm.value.criticare_plus='Y';

    }
    // this.sisRiderSelectionForm.valueChanges.subscribe((value:any) => {
    //   console.log("value",value);
    //   this.sisRiderSelectionForm.controls.setValue(value.criticare_plus='N', { emitEvent: false });
    // });
    console.log("this.sisRiderSelectionForm.value.criticare_plus",this.sisRiderSelectionForm.value.criticare_plus);

    
  }

  unCheckedATPDRider(event:any){
    this.uncheckATPDRiderOption=false;
    // this.sisRiderSelectionForm.value.atpd_rider=this.sisRiderSelectionForm.get('atpd_rider').value?'N':'Y';
    if(event.target.value == 'atpd_rider'){
      this.sisRiderSelectionForm.value.atpd_rider='N';
    }else{
    this.sisRiderSelectionForm.value.atpd_rider='Y';

    }
    // this.sisRiderSelectionForm.value.atpd_rider='N';
    console.log("this.sisRiderSelectionForm.value.atpd_rider",this.sisRiderSelectionForm.value.atpd_rider);

    

  }

  unCheckedTBRRider(event:any){
    this.uncheckTBRiderOption=false;
    // this.sisRiderSelectionForm.value.tb_rider=this.sisRiderSelectionForm.get('tb_rider').value?'N':'Y';
    if(event.target.value == 'tb_rider'){
      this.sisRiderSelectionForm.value.tb_rider='N';
    }else{
    this.sisRiderSelectionForm.value.tb_rider='Y';

    }
    // this.sisRiderSelectionForm.value.tb_rider='N';
    console.log("this.sisRiderSelectionForm.value.tb_rider",this.sisRiderSelectionForm.value.tb_rider);


  }

  unCheckedADRRider(event:any){
    this.uncheckADRiderOption=false;
    if(event.target.value == 'ad_rider'){
      this.sisRiderSelectionForm.value.ad_rider='N';
    }else{
    this.sisRiderSelectionForm.value.ad_rider='Y';

    }
    // this.sisRiderSelectionForm.value.ad_rider=this.sisRiderSelectionForm.get('ad_rider').value?'N':'Y';
    // this.sisRiderSelectionForm.value.ad_rider='N';
    console.log("this.sisRiderSelectionForm.value.ad_rider",this.sisRiderSelectionForm.value.ad_rider);


  }

  unCheckedHospicareRider(event:any){
    this.uncheckHospiCareRiderOption=false;
    if(event.target.value == 'hospicare_rider'){
      this.sisRiderSelectionForm.value.hospicare_rider='N';
    }else{
    this.sisRiderSelectionForm.value.hospicare_rider='Y';

    }
    // this.sisRiderSelectionForm.value.hospicare_rider=this.sisRiderSelectionForm.get('hospicare_rider').value?'N':'Y';
    // this.sisRiderSelectionForm.value.hospicare_rider='N';
    console.log("this.sisRiderSelectionForm.value.hospicare_rider",this.sisRiderSelectionForm.value.hospicare_rider);


  }


  riderSelectionHospital(event:any){
    this.deathChecked=false;
    this.hosiptalChecked=true;
    console.log("'hosiptal_radio'",event.target.value);
    let riderCheck=event.target.value
    if(riderCheck == 'hosiptal_radio'){
      this.isDeathRiderFlag=true;
      this.isHosiptalRiderFlag=false;
      console.log("this.isDeathRiderFlag",this.isDeathRiderFlag,this.isHosiptalRiderFlag); 
      this.sisRiderSelectionForm.value.hosiptal_radio=this.sisRiderSelectionForm.get('hosiptal_radio').value == 'hosiptal_radio'?'Y':'N';
      console.log("this.sisRiderSelectionForm.value.hospicare_rider",this.sisRiderSelectionForm.value.hospicare_rider);
      
  
    }else{
      console.log("hosiptal is not click");   
      this.sisRiderSelectionForm.value.hosiptal_radio=this.sisRiderSelectionForm.value.hosiptal_radio.value == ''?'N':'Y';
      console.log("this.sisRiderSelectionForm.value.hosiptal_radio",this.sisRiderSelectionForm.value.hosiptal_radio);
      
    }
  }

  riderSelectionDeath(event:any){
    this.deathChecked=true;
    this.hosiptalChecked=false;
    console.log("'death_radio'",event.target.value);
    let riderCheck=event.target.value
    if(riderCheck == 'death_radio'){
      this.isDeathRiderFlag=false;
      this.isHosiptalRiderFlag=true;
      console.log("this.isDeathRiderFlag",this.isDeathRiderFlag,this.isHosiptalRiderFlag);    
    }
  }

  onSubmit(){
    if(this.isChecked === false){
      console.log("rider is selected",this.isChecked);
      
    console.log("all rider in form submit if",this.sisRiderSelectionForm.value.criticare_plus,this.sisRiderSelectionForm.value.atpd_rider,this.sisRiderSelectionForm.value.tb_rider,this.sisRiderSelectionForm.value.ad_rider,this.sisRiderSelectionForm.value.hospicare_rider,this.sisRiderSelectionForm.value.hospicare_rider);

      this.sisRiderSelectionForm.value.wellnessFlag=this.sisRiderSelectionForm.get('wellnessFlag').value === true?'Y':'N';
      this.sisRiderSelectionForm.value.death_radio=this.sisRiderSelectionForm.get('death_radio').value == 'death_radio'?'Y':'N';
      this.sisRiderSelectionForm.value.hosiptal_radio=this.sisRiderSelectionForm.get('hosiptal_radio').value == 'hosiptal_radio'?'Y':'N';
      this.sisRiderSelectionForm.value.criticare_plus=this.sisRiderSelectionForm.get('criticare_plus').value == 'criticare_plus'?'Y':'N';
      this.sisRiderSelectionForm.value.atpd_rider=this.sisRiderSelectionForm.get('atpd_rider').value == 'atpd_rider'?'Y':'N';
      this.sisRiderSelectionForm.value.tb_rider=this.sisRiderSelectionForm.get('tb_rider').value == 'tb_rider' ?'Y':'N';
      this.sisRiderSelectionForm.value.ad_rider=this.sisRiderSelectionForm.get('ad_rider').value == 'ad_rider' ?'Y':'N';
      this.sisRiderSelectionForm.value.hospicare_rider=this.sisRiderSelectionForm.get('hospicare_rider').value == 'hospicare_rider'?'Y':'N';  
    console.log("all rider in form submit if",this.sisRiderSelectionForm.value.criticare_plus,this.sisRiderSelectionForm.value.atpd_rider,this.sisRiderSelectionForm.value.tb_rider,this.sisRiderSelectionForm.value.ad_rider,this.sisRiderSelectionForm.value.hospicare_rider,this.sisRiderSelectionForm.value.hospicare_rider);

    }
    else{
      console.log("rider is not selected",this.isChecked);
      // this.sisRiderSelectionForm.value.wellnessFlag=this.sisRiderSelectionForm.get('wellnessFlag').value?'Y':'N';
      // this.sisRiderSelectionForm.value.death_radio=this.sisRiderSelectionForm.get('death_radio').value?'N':'Y';
      // this.sisRiderSelectionForm.value.hosiptal_radio=this.sisRiderSelectionForm.get('hosiptal_radio').value == ''?'N':'Y';
      // this.sisRiderSelectionForm.value.criticare_plus=this.sisRiderSelectionForm.get('criticare_plus').value?'N':'Y';
      // this.sisRiderSelectionForm.value.atpd_rider=this.sisRiderSelectionForm.get('atpd_rider').value?'N':'Y';
      // this.sisRiderSelectionForm.value.tb_rider=this.sisRiderSelectionForm.get('tb_rider').value?'N':'Y';
      // this.sisRiderSelectionForm.value.ad_rider=this.sisRiderSelectionForm.get('ad_rider').value?'N':'Y';
      // this.sisRiderSelectionForm.value.hospicare_rider=this.sisRiderSelectionForm.get('hospicare_rider').value?'N':'Y';
    console.log("all rider in form submit else",this.sisRiderSelectionForm.value.criticare_plus,this.sisRiderSelectionForm.value.atpd_rider,this.sisRiderSelectionForm.value.tb_rider,this.sisRiderSelectionForm.value.ad_rider,this.sisRiderSelectionForm.value.hospicare_rider,this.sisRiderSelectionForm.value.hosiptal_radio);
      this.sisRiderSelectionForm.value.wellnessFlag=this.sisRiderSelectionForm.get('wellnessFlag').value  =='' ?'N':'Y';
      this.sisRiderSelectionForm.value.death_radio=this.sisRiderSelectionForm.get('death_radio').value == '' ?'N':'Y';
      this.sisRiderSelectionForm.value.hosiptal_radio=this.sisRiderSelectionForm.get('hosiptal_radio').value == 'hosiptal_radio'?'Y':'N';
      this.sisRiderSelectionForm.value.criticare_plus=this.sisRiderSelectionForm.get('criticare_plus').value == 'criticare_plus' ?'Y':'N';
      this.sisRiderSelectionForm.value.atpd_rider=this.sisRiderSelectionForm.get('atpd_rider').value == 'atpd_rider' ?'Y':'N';
      this.sisRiderSelectionForm.value.tb_rider=this.sisRiderSelectionForm.get('tb_rider').value == 'tb_rider' ?'Y':'N';
      this.sisRiderSelectionForm.value.ad_rider=this.sisRiderSelectionForm.get('ad_rider').value == 'ad_rider' ?'Y':'N';
      // this.sisRiderSelectionForm.value.hospicare_rider=this.sisRiderSelectionForm.get('hospicare_rider').value == 'hospicare_rider'?'Y':'N';
    console.log("all rider in form submit else",this.sisRiderSelectionForm.value.criticare_plus,this.sisRiderSelectionForm.value.atpd_rider,this.sisRiderSelectionForm.value.tb_rider,this.sisRiderSelectionForm.value.ad_rider,this.sisRiderSelectionForm.value.hospicare_rider);


    }
   
   console.log("this.sisRiderSelectionForm.value",this.sisRiderSelectionForm.value);
   this.mainService.saveSISRiderSelected(this.sisRiderSelectionForm.value).subscribe({
    next:(result:any)=>{
      console.log("result",result);
      
    },
    error:(error)=>{
      console.log("Error",error);
      
    }
   })
    
  }

  onContinue(){
    this.router.navigate(['/sisRiderCalculation'])
  }

}
