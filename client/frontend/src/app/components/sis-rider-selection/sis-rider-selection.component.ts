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
  selectedTab:Number=1;
  unCheckCriticareFlag:boolean=true;
  unCheckedATPDFlag:boolean=true;
  unCheckedTBRFlag:boolean=true;
  unCheckedADRFlag:boolean=true;
  unCheckedHospiCareFlag:boolean=true;
  isWellnessChecked:boolean=true;
  isCriticareChecked:boolean=true;
  isATPDChecked:boolean=true;
  isTBChecked:boolean=true;
  isADChecked:boolean=true;
  isHospiCareChecked:boolean=true;
  deathOrHospital:boolean=true;
  hospitalOrDeath:boolean=false;
  riderCount:any=5;

  constructor(private fb:FormBuilder,private mainService:MainService,private router:Router) { }

  ngOnInit(): void {
    this.sisRiderSelectionForm=this.fb.group({
      wellnessFlag:['Y'],
      death_radio:['death_radio'],
      hosiptal_radio:[''],
      criticare_plus:['criticare_plus'],
      atpd_rider:['atpd_rider'],
      tb_rider:['tb_rider'],
      ad_rider:['ad_rider'],
      hospicare_rider:['hospicare_rider'],
    })
    this.localSISStorage=localStorage.getItem('sisCalculationAllDetailsToken')
    this.sisIDLocalStorage=JSON.parse(this.localSISStorage);    
    this.uinNumberFromLocal=this.sisIDLocalStorage['UIN'];    
    this.leadIdFromLocal=this.sisIDLocalStorage['leadId'];
    this.sisIdFromLocal=this.sisIDLocalStorage['valueSISPersonal']['sisId'];   
  }

  selectTab(tab:any,event:any){
    console.log("tabbbbbb",tab);
    this.selectedTab=tab;
    if(this.selectedTab === 2 && event.target.checked === true){
       this.deathOrHospital=false;
       this.hospitalOrDeath=true
       console.log("death selected",this.deathOrHospital,this.hospitalOrDeath,this.selectedTab);     
    }else{
      this.deathOrHospital=true;
      this.hospitalOrDeath=false
      console.log("death selected",this.deathOrHospital,this.hospitalOrDeath,this.selectedTab);  
    }
  }

 
 wellnessProgramChange(event:any){
    console.log("eveeeeeeeee",event.target.checked);
    if(event.target.checked === false){
    this.isWellnessChecked=false;
    this.isCriticareChecked=false;
    this.isATPDChecked=false;
    this.isTBChecked=false;
    this.isADChecked=false;
    this.isHospiCareChecked=false;
    const checkWellnesFalse=event.target.checked === false ?'N':'Y';
    console.log("checkWellnesFalse for check",checkWellnesFalse);  
    this.sisRiderSelectionForm.patchValue({ hospicare_rider: checkWellnesFalse }); 
    console.log("this.sisRiderSelectionForm.value.hospicare_rider",this.sisRiderSelectionForm.value.hospicare_rider);
    console.log("this.isWellnessChecked not checked",
    this.isWellnessChecked,this.isCriticareChecked,this.isATPDChecked,this.isTBChecked,this.isADChecked,this.isHospiCareChecked);
    this.riderCount=0;
    console.log("this.riderCount",this.riderCount);
    }else{
      this.isWellnessChecked=true;
      this.isCriticareChecked=true;
      this.isATPDChecked=true;
      this.isTBChecked=true;
      this.isADChecked=true;
      this.isHospiCareChecked=true;      
      const checkWellnesTrue=event.target.checked === true ?'Y':'N';
      console.log("checkWellnesTrue for check",checkWellnesTrue);  
      this.sisRiderSelectionForm.patchValue({ hospicare_rider: checkWellnesTrue }); 
      console.log("this.sisRiderSelectionForm.value.hospicare_rider",this.sisRiderSelectionForm.value.hospicare_rider);
      this.riderCount=this.riderCount + 5;
      console.log("this.riderCount",this.riderCount);
    }
  }

  unCheckedCriticarePlusRider(event:any){
    console.log("event for unCheckedCriticarePlusRider",event.target.value,event.target.checked);
    if(event.target.checked === false){
      const uncheckCriticare=event.target.checked === false ?'N':'Y';
      console.log("uncheckCriticare for uncheck",uncheckCriticare);  
      this.sisRiderSelectionForm.patchValue({ criticare_plus: uncheckCriticare });
      this.unCheckCriticareFlag=false;
      console.log("criticare plus rider",this.sisRiderSelectionForm.value.criticare_plus); 
      this.riderCount=this.riderCount-1;
      console.log("this.riderCount",this.riderCount);
    }else{
      const uncheckCriticare=event.target.checked === true ?'Y':'N';
      console.log("uncheckCriticare for check",uncheckCriticare);  
      this.sisRiderSelectionForm.patchValue({ criticare_plus: uncheckCriticare });
      console.log("criticare plus rider else",this.sisRiderSelectionForm.value.criticare_plus);
      this.unCheckCriticareFlag=true;
      this.riderCount=this.riderCount+1;
      console.log("this.riderCount",this.riderCount);
      
      
    }
  }

  unCheckedATPDRider(event:any){
    console.log("event for unCheckedATPDRider",event.target.value,event.target.checked);
    if(event.target.checked === false){
      const uncheckATPD=event.target.checked === false ?'N':'Y';
      console.log("uncheckATPD for uncheck",uncheckATPD);  
      this.sisRiderSelectionForm.patchValue({ atpd_rider: uncheckATPD });
      this.unCheckedATPDFlag=false;
      console.log("atpd  rider",this.sisRiderSelectionForm.value.atpd_rider); 
      this.riderCount=this.riderCount-1;
      console.log("this.riderCount",this.riderCount);
    }else{
      const uncheckATPD=event.target.checked === true ?'Y':'N';
      console.log("uncheckATPD for check",uncheckATPD);  
      this.sisRiderSelectionForm.patchValue({ atpd_rider: uncheckATPD });
      this.unCheckedATPDFlag=true;
      console.log("uncheckATPD else",this.sisRiderSelectionForm.value.atpd_rider);
      this.riderCount=this.riderCount+1;
      console.log("this.riderCount",this.riderCount);
      

    }
  }

  unCheckedTBRRider(event:any){
    console.log("event for unCheckedTBRRider",event.target.value,event.target.checked);
    if(event.target.checked === false){
      const uncheckTB=event.target.checked === false ?'N':'Y';
      console.log("uncheckTB for uncheck",uncheckTB);  
      this.sisRiderSelectionForm.patchValue({ tb_rider: uncheckTB });
      this.unCheckedTBRFlag=false;
      console.log("criticare plus rider",this.sisRiderSelectionForm.value.tb_rider); 
      this.riderCount=this.riderCount-1;
      console.log("this.riderCount",this.riderCount);
    }else{
      const uncheckTB=event.target.checked === true ?'Y':'N';
      console.log("uncheckTB for check",uncheckTB);  
      this.sisRiderSelectionForm.patchValue({ tb_rider: uncheckTB });
      this.unCheckedTBRFlag=true;
      console.log("criticare plus rider else",this.sisRiderSelectionForm.value.tb_rider);
      this.riderCount=this.riderCount+1;
      console.log("this.riderCount",this.riderCount);
    }
  }

  unCheckedADRRider(event:any){
    console.log("event for unCheckedADRRider",event.target.value,event.target.checked);
    if(event.target.checked === false){
      const uncheckADR=event.target.checked === false ?'N':'Y';
      console.log("uncheckADR for uncheck",uncheckADR);  
      this.sisRiderSelectionForm.patchValue({ ad_rider: uncheckADR });
      this.unCheckedADRFlag=false;
      console.log("criticare plus rider",this.sisRiderSelectionForm.value.ad_rider); 
      this.riderCount=this.riderCount-1;
      console.log("this.riderCount",this.riderCount);
    }else{
      const uncheckADR=event.target.checked === true ?'Y':'N';
      console.log("uncheckADR for check",uncheckADR);  
      this.sisRiderSelectionForm.patchValue({ ad_rider: uncheckADR });
      this.unCheckedADRFlag=true;
      console.log("criticare plus rider else",this.sisRiderSelectionForm.value.ad_rider);
      this.riderCount=this.riderCount+1;
      console.log("this.riderCount",this.riderCount);

    }
  }

  unCheckedHospicareRider(event:any){
    console.log("event for unCheckedHospiCareRider",event.target.value,event.target.checked);
    if(event.target.checked === false){
      const uncheckHospiRider=event.target.checked === false ?'N':'Y';
      console.log("uncheckHospiRider for uncheck",uncheckHospiRider);  
      this.sisRiderSelectionForm.patchValue({ hospicare_rider: uncheckHospiRider });
      this.unCheckedHospiCareFlag=false;
      console.log("criticare plus rider",this.sisRiderSelectionForm.value.hospicare_rider); 
      this.riderCount=this.riderCount-1;
      console.log("this.riderCount",this.riderCount);
    }else{
      const uncheckHospiRider=event.target.checked === true ?'Y':'N';
      console.log("uncheckHospiRider for check",uncheckHospiRider);  
      this.sisRiderSelectionForm.patchValue({ hospicare_rider: uncheckHospiRider });
      this.unCheckedHospiCareFlag=true;
      console.log("criticare plus rider else",this.sisRiderSelectionForm.value.hospicare_rider);
      this.riderCount=this.riderCount+1;
      console.log("this.riderCount",this.riderCount);

    }
  }

  onSubmit(){
    this.sisRiderSelectionForm.value.wellnessFlag=this.sisRiderSelectionForm.get('wellnessFlag').value === true?'Y':'N';
    this.sisRiderSelectionForm.value.death_radio=this.sisRiderSelectionForm.get('death_radio').value === true?'Y':'N';
    this.sisRiderSelectionForm.value.hosiptal_radio=this.sisRiderSelectionForm.get('hosiptal_radio').value === true?'Y':'N';
    this.sisRiderSelectionForm.value.criticare_plus=this.sisRiderSelectionForm.get('criticare_plus').value === true?'Y':'N';
    this.sisRiderSelectionForm.value.atpd_rider=this.sisRiderSelectionForm.get('atpd_rider').value === true?'Y':'N';
    this.sisRiderSelectionForm.value.tb_rider=this.sisRiderSelectionForm.get('tb_rider').value === true?'Y':'N';
    this.sisRiderSelectionForm.value.ad_rider=this.sisRiderSelectionForm.get('ad_rider').value === true ?'Y':'N';
    this.sisRiderSelectionForm.value.hospicare_rider=this.sisRiderSelectionForm.get('hospicare_rider').value == 'hospicare_rider'?'Y':'N';
    console.log("this.sisRiderSelectionForm.value",this.sisRiderSelectionForm.value);
    this.mainService.saveSISRiderSelected(this.sisRiderSelectionForm.value).subscribe({
    next:(result:any)=>{
      console.log("result",result['data']);  
      const sisRiderData=JSON.stringify(result['data']);
      console.log("sisRiderData",sisRiderData);
      const parseSISRiderData=JSON.parse(sisRiderData)
      this.sisIDLocalStorage['sisRiderData']=parseSISRiderData;
      console.log("this.sisIDLocalStorage",this.sisIDLocalStorage);    
      let sisAllRiderData=this.sisIDLocalStorage;
      console.log("sisAllRiderData",sisAllRiderData); 
      localStorage.setItem('sisAllRiderData',JSON.stringify(sisAllRiderData))
         
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
