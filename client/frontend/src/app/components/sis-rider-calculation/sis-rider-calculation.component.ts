import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faTrash,faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-sis-rider-calculation',
  templateUrl: './sis-rider-calculation.component.html',
  styleUrls: ['./sis-rider-calculation.component.css']
})
export class SisRiderCalculationComponent implements OnInit {

  faTrash=faTrash;
  faEdit=faEdit;
  faIndianRupee=faIndianRupee;
  tabs = [
    { label: 'Hospicare', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/hospicare.svg?v=1677931786189' },
    { label: 'Accidental Death(AD)', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/accidental-death.svg?v=1677931786189' },
    { label: 'Criticare Plus(CCP) ', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/criticare.svg?v=1677931786189' },
    { label: 'Term Booster(TB)', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/tti.svg?v=1677931786189' },
    { label: 'Accidental Total(ATPD)', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/atpd.svg?v=1677931786189' }
  ];
  sisRiderCalculationForm:any=FormGroup
  sisRiderLocalStorageData:any;
  sisRiderData:any;
  atpdRiderFlag:any;
  criticarePlusFlag:any;
  adRiderFlag:any;
  hospicareRiderFlag:any;
  tbRiderFlag:any;
  wellnessFlag:any;
  sisCalculationData:any;
  sisCalculationLocalStorageData:any;
  sisCalculationInvestAmountOrText:any;
  sisAnnualAmount:any;
  sisAnnualText:any;
  hospicareRiderPremium:any;
  hospicareWellnessProgram:any;
  hospicareRiderUpdateFlag:boolean=false;
  atpdRiderUpdateFlag:boolean=false;
  adRiderUpdateFlag:boolean=false;
  tbRiderUpdateFlag:boolean=false;
  criticareRiderUpdateFlag:boolean=false;
  riderObjFlag:any=Object;
  riderArrFlag:any;

  currentFlagIndex = 0;
  updateButtonEnabled: boolean = true;
  continueButtonEnabled: boolean = false;
  apiCallInProgress: boolean = false;


 constructor(private router:Router,private fb:FormBuilder,private mainService:MainService,private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.sisRiderCalculationForm=this.fb.group({
      // get_lumpsum_radio:['get_lumpsum_radio'],
      // benefit_radio:['lumpsum'],
      // lumpsum_amount:[''],
      rop_radio:[''],
      rider_duration:['5'],
      rider_payment_term:['5'],

    })
 
    this.sisRiderData=localStorage.getItem('sisAllRiderData');
    console.log("sisRiderData",this.sisRiderData);
    let parseRider=JSON.parse(this.sisRiderData)
    console.log("parseRider",parseRider);
    let extractSISRider=parseRider['sisRiderData'];
    console.log("extractSISRider",extractSISRider);  
    this.sisRiderLocalStorageData=extractSISRider;
    console.log("this.sisRiderLocalStorageData",this.sisRiderLocalStorageData);
    this.atpdRiderFlag=this.sisRiderLocalStorageData['atpd_rider'] ? this.sisRiderLocalStorageData['atpd_rider'] : null;
    this.criticarePlusFlag=this.sisRiderLocalStorageData['criticare_plus'] ? this.sisRiderLocalStorageData['criticare_plus'] : null;
    this.adRiderFlag=this.sisRiderLocalStorageData['ad_rider'] ? this.sisRiderLocalStorageData['ad_rider'] : null;
    this.hospicareRiderFlag=this.sisRiderLocalStorageData['hospicare_rider'] ? this.sisRiderLocalStorageData['hospicare_rider'] : null;
    this.tbRiderFlag=this.sisRiderLocalStorageData['tb_rider'] ? this.sisRiderLocalStorageData['tb_rider'] : null;
    this.wellnessFlag=this.sisRiderLocalStorageData['wellnessFlag'] ? this.sisRiderLocalStorageData['wellnessFlag'] : null;
    console.log("localStorageData",this.atpdRiderFlag,this.criticarePlusFlag,this.adRiderFlag,this.hospicareRiderFlag,this.tbRiderFlag,this.wellnessFlag);
    this.riderObjFlag={
      hospicareRiderFlag:this.hospicareRiderFlag,
      adRiderFlag:this.adRiderFlag,
      criticarePlusFlag:this.criticarePlusFlag,
      tbRiderFlag:this.tbRiderFlag,
      atpdRiderFlag:this.atpdRiderFlag  
    }
    console.log("riderObjFlag",this.riderObjFlag);
    // this.riderArrFlag=Object.values(this.riderObjFlag);
    // console.log("riderArrFlag",this.riderArrFlag);

    //dynamic starts
    this.riderArrFlag=Object.keys(this.riderObjFlag).map(key=>this.riderObjFlag[key]);
    console.log("riderArrFlag",this.riderArrFlag);


  
    //dynamic end
    
    
    this.sisCalculationData=localStorage.getItem('sisCalculationAllDetailsToken');
    console.log("sisCalculationData",this.sisCalculationData);
    this.sisCalculationLocalStorageData=JSON.parse(this.sisCalculationData);
    console.log("this.sisCalculationLocalStorageData",this.sisCalculationLocalStorageData);
    this.sisCalculationInvestAmountOrText= this.sisCalculationLocalStorageData['sisCalculation'];
    console.log("this.sisCalculationInvestAmountOrText",this.sisCalculationInvestAmountOrText);
    this.sisAnnualAmount=this.sisCalculationInvestAmountOrText['annual_invest_amount'];
    console.log("this.sisAnnualAmount",this.sisAnnualAmount);
    this.sisAnnualText=this.sisCalculationInvestAmountOrText['annual_invest_text'];
    console.log("this.sisAnnualText",this.sisAnnualText);
    this.onUpdateHospicare();


  // this.mainService.getHospicareRiderPremium().subscribe({
  //   next:(data:any)=>{
  //     console.log("data for hospicare",data['data']);    
  //     this.hospicareRiderPremium=data['data']['hospicareRiderPremium'];
  //     this.hospicareWellnessProgram=data['data']['hospicareWellnessProgram']
  //     console.log("HospicarePremium",this.hospicareRiderPremium,this.hospicareWellnessProgram);
  //     this.hospicareRiderUpdateFlag=true;
  //     this.atpdRiderUpdateFlag=false;
  //     this.adRiderUpdateFlag=false;
  //     this.tbRiderUpdateFlag=false;
  //     this.criticareRiderUpdateFlag=false;
      
  //   },error:(error)=>{
  //     console.log("error",error);
      
  //   }
  // })
    
    
  }

  onUpdateHospicare(){
    this.mainService.getHospicareRiderPremium().subscribe({
      next:(data:any)=>{
        console.log("data for hospicare",data['data']);    
        this.hospicareRiderPremium=data['data']['hospicareRiderPremium'];
        this.hospicareWellnessProgram=data['data']['hospicareWellnessProgram']
        console.log("HospicarePremium",this.hospicareRiderPremium,this.hospicareWellnessProgram);
        this.hospicareRiderUpdateFlag=true;
        this.atpdRiderUpdateFlag=false;
        this.adRiderUpdateFlag=false;
        this.tbRiderUpdateFlag=false;
        this.criticareRiderUpdateFlag=false;
        
      },error:(error)=>{
        console.log("error",error);
        
      }
    })
  }

  

  atpdRiderPremium:any;
  atpdWellnessProgram:any;
  onUpdateHospiLoaderChanges(){
    console.log("flag valuesss",this.hospicareRiderUpdateFlag);
    this.ngxService.start();
    this.hospicareRiderPremium=this.hospicareRiderPremium;
    this.hospicareWellnessProgram=this.hospicareWellnessProgram;
    console.log("updattee",this.hospicareRiderPremium,this.hospicareWellnessProgram);
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 1000);    
  }

  onUpdateADLoaderChanges(){
    console.log("onUpdateADLoaderChanges",this.adRiderPremium,this.adWellnessProgram);
   this.ngxService.start(); 
   this.adRiderPremium=this.adRiderPremium;
   this.adWellnessProgram=this.adWellnessProgram;
   this.adRiderUpdateFlag=true; 
   setTimeout(()=>{
    this.ngxService.stop();
   },1000)
  }

  onUpdateATPDLoaderChanges(){
    console.log("onUpdateATPDLoaderChanges",this.aTPDRiderPremium,this.adWellnessProgram);
   this.ngxService.start(); 
   this.aTPDRiderPremium=this.aTPDRiderPremium;
   this.adWellnessProgram=this.adWellnessProgram;
   this.atpdRiderUpdateFlag=true; 
   setTimeout(()=>{
    this.ngxService.stop();
   },1000)

  }

  onUpdateTBLoaderChanges(){
    console.log("onUpdateTBLoaderChanges",this.tbRiderPremium,this.tbWellnessProgram);
   this.ngxService.start(); 
   this.tbRiderPremium=this.tbRiderPremium;
   this.tbWellnessProgram=this.tbWellnessProgram;
   this.tbRiderUpdateFlag=true; 
   setTimeout(()=>{
    this.ngxService.stop();
   },1000)
  }

  onUpdateCritiLoaderChanges(){
    console.log("onUpdateCritiCareLoaderChanges",this.criticarePlusRiderPremium,this.criticarePlusWellnessProgram);
    this.ngxService.start(); 
    this.criticarePlusRiderPremium=this.criticarePlusRiderPremium;
    this.criticarePlusWellnessProgram=this.criticarePlusWellnessProgram;
    this.criticareRiderUpdateFlag=true; 
    setTimeout(()=>{
     this.ngxService.stop();
    },1000)

  }
  // onUpdateChanges(){
  //   console.log("allUpdate Changes",this.hospicareRiderFlag,typeof(this.atpdRiderFlag),this.adRiderFlag,this.tbRiderFlag,this.criticarePlusFlag);    
  //    if(this.atpdRiderFlag === 'Y'){
  //    console.log("atpdRiderFlag on UpdateChanges",this.atpdRiderFlag);
  //    this.mainService.getATPDRiderPremium().subscribe({
  //     next:(atpd:any)=>{
  //     console.log("atpdd",atpd);
  //     this.atpdRiderPremium=atpd['data']['atpdRiderPremium'];
  //     this.atpdWellnessProgram=atpd['data']['atpdWellnessProgram'];
  //    this.atpdRiderUpdateFlag=false;
  //    this.hospicareRiderUpdateFlag=true;//changes to true
  //     this.adRiderUpdateFlag=false;
  //     this.tbRiderUpdateFlag=false;
  //     this.criticareRiderUpdateFlag=false;
  //     console.log("allFlags",this.adRiderFlag,this.tbRiderFlag,this.criticarePlusFlag);
  //     // this.onUpdateADRIDERChanges();
  //     console.log("allFlags",this.adRiderFlag,this.tbRiderFlag,this.criticarePlusFlag);
  //     },
  //     error:(error:any)=>{
  //       console.log("error",error);
        
  //     }
  //    })
     
  //   } 
    
  //   // if(this.adRiderFlag === 'Y'){
  //   //  console.log("adRiderFlag on UpdateChanges",this.adRiderFlag);
  //   //  this.adRiderUpdateFlag=true;

  //   // } if(this.tbRiderFlag === 'Y'){
  //   //  console.log("tbRiderFlag on UpdateChanges",this.tbRiderFlag);
  //   //  this.tbRiderUpdateFlag=true;

      
  //   // } if(this.criticarePlusFlag === 'Y'){
  //   //  console.log("criticarePlusFlag on UpdateChanges",this.criticarePlusFlag);
  //   //  this.criticareRiderUpdateFlag=true

      
  //   // }
  
  // }

  riderCount=0;
  onContinue(){
    console.log("this.riderArrFlag",this.riderArrFlag);
    // const selectedCheckboxes = this.riderArrFlag.filter((checkbox:any) => checkbox === 'Y');
    // console.log("selectedCheckboxes",selectedCheckboxes);

    // selectedCheckboxes.forEach((checkboxSelected:any)=>{
    //   console.log("checkboxSelected",checkboxSelected);
    //   for(let riderObjKey in this.riderObjFlag){
    //     console.log("riderObjKey",this.riderObjFlag[riderObjKey]);
    //     // console.log("selectedCheckboxes",selectedCheckboxes);
        
    //     if(riderObjKey === checkboxSelected){
    //       console.log("riderObjKey",riderObjKey === checkboxSelected);
    //       this.riderCount=this.riderCount + 1;
    //     }
    //     console.log("this.riderCount",this.riderCount);
        
        
    //    }
      
    // })
   for(let riderObjKey in this.riderObjFlag){
    console.log("riderObjKey",this.riderObjFlag[riderObjKey]);
    for(let riderArray of this.riderArrFlag){
      console.log("riderArray",riderArray);
      console.log("rider matches",riderObjKey,riderArray);

      if(this.riderObjFlag[riderObjKey] === this.riderArrFlag[riderArray] ){
        console.log("rider matches",riderObjKey,riderArray);
        
      }
      
    }
    
    // if(riderObjKey === 'selectedCheckboxes'){
    //   console.log("riderObjKey");
      
    // }
    
   }
    
  }


  onSubmit(){
  //  if(this.onContinueHospicare() || this.onContinueADRider() || this.onContinueCriticarePlusRider() || this.onContinueCriticarePlusRider()){

  //  }
  }

  onContinueHospicare(){
    if(this.hospicareRiderUpdateFlag === true){
      console.log("this.hospicareRiderUpdateFlag === true",this.hospicareRiderUpdateFlag === true);
      
      this.onUpdateADRIDERChanges();
      this.adRiderUpdateFlag=true;
    }else{
      return ;
    }
  // this.router.navigate(['/sisSummary'])
  }

  onContinueADRider(){
    if(this.adRiderUpdateFlag === true){
      console.log("this.adRiderUpdateFlag === true",this.adRiderUpdateFlag === true);
      
      // this.onUpdateATPDRIDERChanges()
      this.onUpdateCriticarePlusRIDERChanges()
    }else{
      return
    }
  }


  onContinueCriticarePlusRider(){
    if(this.criticareRiderUpdateFlag === true){
      console.log("this.criticareRiderUpdateFlag === true",this.criticareRiderUpdateFlag === true);
      
      this.onUpdateTBRIDERChanges()
    }else{
      return
    }
  }

  onContinueTBRider(){
    if(this.tbRiderUpdateFlag === true){
      console.log("this.tbRiderUpdateFlag === true",this.tbRiderUpdateFlag === true);
      
      this.onUpdateATPDRIDERChanges()
    }else{
      return ;
    }

  }

  // onContinueATPDRider(){
  //   if(this.atpdRiderUpdateFlag === true){
  //     console.log("this.atpdRiderUpdateFlag === true",this.atpdRiderUpdateFlag === true);
      
  //     // this.onUpdateATPDRIDERChanges()
  //   }
  // }

  

  adRiderPremium:any;
  adWellnessProgram:any;
  continueADRiderFlag:boolean=false;
  onUpdateADRIDERChanges(){
     if(this.adRiderFlag === 'Y'){
     console.log("adRiderFlag on UpdateChanges",this.adRiderFlag);
     this.mainService.getAccidentalDeathRiderPremium().subscribe({
      next:(adRider:any)=>{
      this.adRiderUpdateFlag=true;
      this.hospicareRiderUpdateFlag=false;//changes to false
      this.atpdRiderUpdateFlag=false;
      this.tbRiderUpdateFlag=false;
      this.criticareRiderUpdateFlag=false;
      console.log("adRider",adRider['data']);
      this.adRiderPremium=adRider['data']['accidentalDeathRiderPremium'];
      this.adWellnessProgram=adRider['data']['accidentalDeathWellnessProgram'];

      console.log("allFlags",this.adRiderFlag,this.tbRiderFlag,this.criticarePlusFlag);
      },
      error:(error:any)=>{
        console.log("error",error);
        
      }
     })

    } 
  }

  aTPDRiderPremium:boolean=false;
  aTPDWellnessProgram:boolean=false;
  onUpdateATPDRIDERChanges(){
    console.log("atpdbutton");
    if(this.atpdRiderFlag === 'Y'){
      console.log("atpdRiderFlag on UpdateChanges",this.atpdRiderFlag);
      this.mainService.getATPDRiderPremium().subscribe({
       next:(aTPDRider:any)=>{
       this.atpdRiderUpdateFlag=true;
       this.adRiderUpdateFlag=false;
       this.hospicareRiderUpdateFlag=false;//changes to false
       this.tbRiderUpdateFlag=false;
       this.criticareRiderUpdateFlag=false;
       console.log("aTPDRider",aTPDRider['data']);
       this.aTPDRiderPremium=aTPDRider['data']['atpdRiderPremium'];
       this.aTPDWellnessProgram=aTPDRider['data']['atpdWellnessProgram'];
 
       console.log("allFlags",this.adRiderFlag,this.tbRiderFlag,this.criticarePlusFlag);
       },
       error:(error:any)=>{
         console.log("error",error);
         
       }
      })
 
     } 
    
  }


  tbRiderPremium:boolean=false;
  tbWellnessProgram:boolean=false;
  onUpdateTBRIDERChanges(){
    console.log("tbbutton");
    if(this.tbRiderFlag === 'Y'){
      console.log("tbRiderFlag on UpdateChanges",this.tbRiderFlag);
      this.mainService.getTermBoosterRiderPremium().subscribe({
       next:(tbRider:any)=>{
       this.tbRiderUpdateFlag=true;
       this.atpdRiderUpdateFlag=false;
       this.adRiderUpdateFlag=false;
       this.hospicareRiderUpdateFlag=false;//changes to false
       this.criticareRiderUpdateFlag=false;
       console.log("tbRider",tbRider['data']);
       this.tbRiderPremium=tbRider['data']['termBoosterRiderPremium'];
       this.tbWellnessProgram=tbRider['data']['termBoosterWellnessProgram'];
 
       console.log("allFlags",this.adRiderFlag,this.tbRiderFlag,this.criticarePlusFlag);
       },
       error:(error:any)=>{
         console.log("error",error);
         
       }
      }) 
 
     } 
    
  }

  criticarePlusRiderPremium:boolean=false;
  criticarePlusWellnessProgram:boolean=false;
  onUpdateCriticarePlusRIDERChanges(){
    console.log("tbbutton");
    if(this.criticarePlusFlag === 'Y'){
      console.log("criticarePlusFlag on UpdateChanges",this.criticarePlusFlag);
      this.mainService.getCriticareeRiderPremium().subscribe({
       next:(criticarePlusRider:any)=>{
       this.criticareRiderUpdateFlag=true;
       this.tbRiderUpdateFlag=false;
       this.atpdRiderUpdateFlag=false;
       this.adRiderUpdateFlag=false;
       this.hospicareRiderUpdateFlag=false;//changes to false
       console.log("criticarePlusRider",criticarePlusRider['data']);
       this.criticarePlusRiderPremium=criticarePlusRider['data']['criticareRiderPremium'];
       this.criticarePlusWellnessProgram=criticarePlusRider['data']['criticareWellnessProgram'];
 
       console.log("allFlags",this.adRiderFlag,this.tbRiderFlag,this.criticarePlusFlag);
       },
       error:(error:any)=>{
         console.log("error",error);
         
       }
      }) 
 
     } 
    
  }


  riderObjectFlag = {
  hospicareRiderFlag: 'Y',
  adRiderFlag: 'Y',
  criticarePlusFlag: 'Y',
  tbRiderFlag: 'Y',
  atpdRiderFlag: 'Y'
};

testArray=['hospicareRiderFlag','adRiderFlag','criticarePlusFlag'];
// testArray = ['Y', 'N', 'Y', 'N','N'];

continueAdRider(){
  for (var i = 0; i < this.testArray.length; i++) {
    console.log("testArray",this.testArray[i]);
    console.log("this.testArray[i]",this.testArray[i]+1);
    
    // this.adRiderUpdateFlag=true;
    this.contiueAdAPI(this.testArray[i + 1]);
    // this.criticareRiderUpdateFlag=true;
  }
}

contiueAdAPI(params:any){
  console.log("params",params);
  
  if(params == 'adRiderFlag'){
    //api call
    console.log("adRider is called");
    this.onUpdateATPDRIDERChanges();
    // this.criticareRiderUpdateFlag=true;
    console.log("adRider is end");

    
  }
  else if(params == 'criticarePlusFlag'){
    console.log("criticarePlus rider call",params);
    console.log("criticare rider called"); 
    // console.log("criticare rider after ad rider",this.criticareRiderUpdateFlag);
   this.onUpdateCriticarePlusRIDERChanges()
   console.log("criticare rider end");

  }

}






// count=0;
// continueNew(){
//     // let count = 0;
//   this.hospicareRiderUpdateFlag=true;
    
//  for (var i = 0; i < this.testArray.length; i++) {
//   let riderFlagKey = Object.keys(this.riderObjectFlag)[i];
//   console.log("riderFlagKey",riderFlagKey);
//   let riderFlagValues=Object.values(this.riderObjectFlag)[i];
// if(riderFlagKey === 'hospicareRiderFlag' && riderFlagValues === 'Y' && this.hospicareRiderUpdateFlag === true){
//      this.count=this.count + 1;
//      this.welcome(this.count);
//      break;
//   }
//   if(riderFlagKey === 'adRiderFlag' && riderFlagValues === 'Y'){
//       this.count=this.count + 1;
//      this.welcomeTwo(this.count);
//   }
//     if(riderFlagKey === 'criticarePlusFlag' && riderFlagValues === 'Y'){
//         this.count=this.count + 1;
//         this.welcomeThree(this.count);
//   }
  
// if(riderFlagKey === 'tbRiderFlag' && riderFlagValues === 'Y'){
//     this.count=this.count + 1;
//      this.welcomeFour(this.count);
//   }
//   if(riderFlagKey === 'atpdRiderFlag' && riderFlagValues === 'Y'){
//       this.count=this.count + 1;
//      this.welcomeFive(this.count);
//   }
// }  
//   }

//   continueAdRider(){
//     this.adRiderUpdateFlag=true;
    
//  for (var i = 0; i < this.testArray.length; i++) {
//   let riderFlagKey = Object.keys(this.riderObjectFlag)[i];
//   console.log("riderFlagKey",riderFlagKey);
//   let riderFlagValues=Object.values(this.riderObjectFlag)[i];
// if(riderFlagKey === 'hospicareRiderFlag' && riderFlagValues === 'Y' && this.adRiderUpdateFlag === true){
//      this.count=this.count + 1;
//      this.welcome(this.count);
//     //  break;
//   }
//   if(riderFlagKey === 'adRiderFlag' && riderFlagValues === 'Y'){
//       this.count=this.count + 1;
//      this.welcomeTwo(this.count);
//      break;
//   }
//     if(riderFlagKey === 'criticarePlusFlag' && riderFlagValues === 'Y'){
//         this.count=this.count + 1;
//         this.welcomeThree(this.count);
//   }
  
// if(riderFlagKey === 'tbRiderFlag' && riderFlagValues === 'Y'){
//     this.count=this.count + 1;
//      this.welcomeFour(this.count);
//   }
//   if(riderFlagKey === 'atpdRiderFlag' && riderFlagValues === 'Y'){
//       this.count=this.count + 1;
//      this.welcomeFive(this.count);
//   }
// } 
//   }

  welcome(count:any){
    console.log('first api will call',count)
}

 welcomeTwo(count:any){
    console.log('second api will call',count)
}
 welcomeThree(count:any){
    console.log('third api will call',count)
}
 welcomeFour(count:any){
    console.log('fourth api will call',count)
}
 welcomeFive(count:any){
    console.log('five api will call',count)
}

}
