import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { MainService } from 'src/app/services/main.service';
import numWords from 'num-words';


@Component({
  selector: 'app-sis-calculation',
  templateUrl: './sis-calculation.component.html',
  styleUrls: ['./sis-calculation.component.css']
})
export class SisCalculationComponent implements OnInit {
  sisCalculationInvestForm:any=FormGroup;
  faIndianRupee=faIndianRupee;
  sisIDLocalStorage:any;
  localSISStorage:any;
  sisIdFromLocal:any;
  leadIdFromLocal:any;
  uinNumberFromLocal:any;
  radioInvestAmount:any;
  radioInvestFlag:boolean=false;
  annualTextToRadio:boolean=false;
  receiveGuaranteeOnLoad:any;
  premiumAnnualDisplay:any;
  premiumAnnualDisplayIntoTen:any;
  numberInWords:any;
  numberInWordsForInvestText: any;
  investAmountIntoWords:any;

  constructor(private router:Router,private fb:FormBuilder,private mainService:MainService) { }

  ngOnInit(): void {
     this.sisCalculationInvestForm=this.fb.group({
      annual_invest_amount:['24000'],
      annual_invest_text:['24000',[Validators.maxLength(9)]],
      regular:['regular_option1'],
      pay_mode:['annual'],
      period_of:['5'],
      ppt_select:['regular'],
      income_period:['20'],
      income_mode:['annual'],
      rider_package:['base_package'],
      receive_amount:['']
    })
    this.localSISStorage=localStorage.getItem('leadwithSISdetails')
    this.sisIDLocalStorage=JSON.parse(this.localSISStorage);
    this.uinNumberFromLocal=this.sisIDLocalStorage.UIN;
    this.leadIdFromLocal=this.sisIDLocalStorage.leadId;
    this.sisIdFromLocal=this.sisIDLocalStorage.valueSISPersonal.sisId;
    console.log("localstorageData",this.uinNumberFromLocal,this.leadIdFromLocal,this.sisIdFromLocal);    
    this.onLoadSisCalculation();
    this.premiumAnnualDisplay=this.sisCalculationInvestForm.value.annual_invest_amount;
    this.premiumAnnualDisplayIntoTen=this.premiumAnnualDisplay * 10;
    this.sisCalculationInvestForm.controls['annual_invest_amount'].valueChanges.subscribe((value:any)=>{
      this.premiumAnnualDisplay=value;
      console.log("this.premiumAnnualDisplay",this.premiumAnnualDisplay);
      this.premiumAnnualDisplayIntoTen=this.premiumAnnualDisplay * 10;
      console.log("this.premiumAnnualDisplayIntoTen",this.premiumAnnualDisplayIntoTen);

      // const storedData = this.getStoredData();
      // if (storedData) {
      //   // populate the form fields with the stored data
      //   let localstoredData=this.sisCalculationInvestForm.setValue(storedData);
      //   console.log("localstoredData",localstoredData);
        
      // }
      
    })
  }

  // getStoredData(): any {
  //   const storedData = localStorage.getItem('sisCalculationAllDetailsToken');
  //   console.log("storedData",storedData);
    
  //   return storedData ? JSON.parse(storedData) : null;
  // }

  onLoadSisCalculation(){
    var investText=this.sisCalculationInvestForm.value.annual_invest_text;
    console.log("investText",investText);
    
    this.investAmountIntoWords=numWords(investText);
    console.log("investAmountIntoWordsonload",this.investAmountIntoWords);
    
    let bodyObj={
      annual_invest_amount:this.sisCalculationInvestForm.value.annual_invest_amount,
      period_of:this.sisCalculationInvestForm.value.period_of,
      income_period:this.sisCalculationInvestForm.value.income_period,
      // annual_invest_text:this.sisCalculationInvestForm.value.annual_invest_text
    }
    console.log("bodyObj on load",bodyObj);
    // this.sisIDLocalStorage['sisCalculation']=this.sisCalculationInvestForm.value;
    // console.log("this.sisIDLocalStorage",this.sisIDLocalStorage);  
    // let sisCalculationAllDetailsToken=JSON.stringify(this.sisIDLocalStorage);
    // console.log("sisCalculationAllDetailsToken",sisCalculationAllDetailsToken);
    // localStorage.setItem('sisCalculationAllDetailsToken',sisCalculationAllDetailsToken);
    
  this.mainService.createSISCalculation(bodyObj).subscribe({
    next:(result:any)=>{
      console.log("result",result); 
      this.receiveGuaranteeOnLoad=result['data'];
      console.log("this.receiveGuaranteeOnLoad",this.receiveGuaranteeOnLoad);
      let receiveAmountLength=this.receiveGuaranteeOnLoad.toString();
      console.log("receiveAmountLength",receiveAmountLength.length);  
      if(receiveAmountLength.length <= 9){
        this.numberInWords=numWords(result['data']);
        console.log("this.numberInWords",this.numberInWords);
      }
        
    },
    error:(err)=>{
      console.log("err",err);
      
    }
  })
  }

  inputValueFromAnnualText:any;
  investTextIntoWords:any
  radioDataChange(event:any){
    // this.sisIDLocalStorage['sisCalculation']=this.sisCalculationInvestForm.value;
    // console.log("this.sisIDLocalStorage",this.sisIDLocalStorage);  
    // let sisCalculationAllDetailsToken=JSON.stringify(this.sisIDLocalStorage);
    // console.log("sisCalculationAllDetailsToken",sisCalculationAllDetailsToken);
    // localStorage.setItem('sisCalculationAllDetailsToken',sisCalculationAllDetailsToken);
    if(event){
      this.radioInvestAmount=event.target.value;
      console.log("this.radioInvestAmount",this.radioInvestAmount);
     this.sisCalculationInvestForm.patchValue({ annual_invest_amount: this.radioInvestAmount }); 
     console.log("radio amount change",this.sisCalculationInvestForm.value.annual_invest_amount);
     this.sisCalculationInvestForm.patchValue({ annual_invest_text: '' }); 
     console.log("reset annual_invest_text",this.sisCalculationInvestForm.value.annual_invest_text);
     
      this.investTextIntoWords=numWords(this.radioInvestAmount);
      console.log("this.investTextIntoWords",this.investTextIntoWords);
    }
 
  }
  // radioDataChange(event:any){
  //   this.sisIDLocalStorage['sisCalculation']=this.sisCalculationInvestForm.value;
  //   console.log("this.sisIDLocalStorage",this.sisIDLocalStorage);  
  //   let sisCalculationAllDetailsToken=JSON.stringify(this.sisIDLocalStorage);
  //   console.log("sisCalculationAllDetailsToken",sisCalculationAllDetailsToken);
  //   localStorage.setItem('sisCalculationAllDetailsToken',sisCalculationAllDetailsToken);
  //   if(event){
  //     this.radioInvestAmount=event.target.value;
  //     console.log("this.radioInvestAmount",this.radioInvestAmount);
  //     this.investTextIntoWords=numWords(this.radioInvestAmount);
  //     console.log("this.investTextIntoWords",this.investTextIntoWords);


  //     // this.sisCalculationInvestForm.valueChanges.subscribe((value:any)=>{
  //     // this.inputValueFromAnnualText=value.annual_invest_text;
  //     // console.log("value.annual_invest_text",value.annual_invest_text);
  //     // if(this.radioInvestAmount !== this.inputValueFromAnnualText){
  //     //   this.radioInvestFlag=true;
  //     //   console.log("this.radioInvestFlag",this.radioInvestFlag);     
  //     // }else{
  //     //   this.radioInvestFlag=false;
  //     //   console.log("this.radioInvestFlag",this.radioInvestFlag);     
  //     // }
            
  //     // });

  //   }
 
  // }

  receiveGuaranteeInvestTest:any;
  sisCalculationInvestTextAmount(event:any){
    // this.premiumAnnualDisplay=this.sisCalculationInvestForm.value.annual_invest_text;
    this.premiumAnnualDisplay=event.target.value;
    console.log("this.premiumAnnualDisplay Invest",this.premiumAnnualDisplay);
    this.premiumAnnualDisplayIntoTen=this.premiumAnnualDisplay * 10;
    console.log("this.premiumAnnualDisplayIntoTen Invest",this.premiumAnnualDisplayIntoTen);
    console.log("premiumAnnualDisplay",this.premiumAnnualDisplay);
    
    this.numberInWordsForInvestText=numWords(this.premiumAnnualDisplay);
    console.log("this.numberInWordsForInvestText",this.numberInWordsForInvestText);
    
    this.sisCalculationInvestForm.patchValue({ annual_invest_text: this.premiumAnnualDisplay }); 
     console.log("radio amount change",this.sisCalculationInvestForm.value.annual_invest_amount);
    
    this.sisCalculationInvestForm.patchValue({ annual_invest_amount: '' }); 
     console.log("reset annual_invest_amount",this.sisCalculationInvestForm.value.annual_invest_amount);
     
    
    let bodyObj={
      // annual_invest_amount:this.sisCalculationInvestForm.value.annual_invest_amount,
      period_of:this.sisCalculationInvestForm.value.period_of,
      income_period:this.sisCalculationInvestForm.value.income_period,
      annual_invest_text:this.sisCalculationInvestForm.value.annual_invest_text
    }
    console.log("bodyObj on text",bodyObj);
    this.sisIDLocalStorage['sisCalculation']=this.sisCalculationInvestForm.value;
    console.log("this.sisIDLocalStorage",this.sisIDLocalStorage);  
    let sisCalculationAllDetailsToken=JSON.stringify(this.sisIDLocalStorage);
    console.log("sisCalculationAllDetailsToken",sisCalculationAllDetailsToken);
    localStorage.setItem('sisCalculationAllDetailsToken',sisCalculationAllDetailsToken);
    this.mainService.createSISCalculationInvestTextAmount(bodyObj).subscribe({
      next:(result:any)=>{
        console.log("result",result); 
        this.receiveGuaranteeOnLoad=result['data'];
        console.log("this.receiveGuaranteeOnLoad",this.receiveGuaranteeOnLoad);
        let receiveAmountLength=this.receiveGuaranteeOnLoad.toString().length;
        console.log("receiveAmountLength",receiveAmountLength);  
        if(receiveAmountLength <= 9){
          this.numberInWords=numWords(result['data']);
          console.log("this.numberInWords",this.numberInWords);
        }
          
      },
      error:(err)=>{
        console.log("err",err);
        
      }
    })
  }
  
  sisAllData:any;
  onSubmit(){
    if(this.sisCalculationInvestForm.valid){
      console.log("onSubmit",this.sisCalculationInvestForm.value);  
      // this.sisCalculationInvestForm.value.annual_invest_amount=this.sisCalculationInvestForm.get('annual_invest_amount').value =='annual_invest_amount'?'':''
    this.mainService.saveSISCalculation(this.sisCalculationInvestForm.value).subscribe({
      next:(sisCalData:any)=>{
        console.log("sisCalData",sisCalData);     
        this.sisAllData=sisCalData['data'];


        // this.allSisData=result['data'];
        // console.log("this.allSisData",this.allSisData);
        // this.leadwithProduct['valueSISPersonal']=this.allSisData;
        // console.log("this.leadwithProduct",this.leadwithProduct);
        
        // let sisPersonalValue=JSON.stringify(this.leadwithProduct);
        // console.log("sisPersonalValue",sisPersonalValue);
        // localStorage.setItem('leadwithSISdetails',sisPersonalValue)
        // this.router.navigate(['/sisCalculation'])

        console.log("sisAllData",this.sisAllData);     
        this.sisIDLocalStorage['sisCalculation']=this.sisAllData;
        console.log("this.sisIDLocalStorage",this.sisIDLocalStorage);
        
        let sisCalculationAllDetailsToken=JSON.stringify(this.sisIDLocalStorage);
        console.log("sisCalculationAllDetailsToken",sisCalculationAllDetailsToken);
        localStorage.setItem('sisCalculationAllDetailsToken',sisCalculationAllDetailsToken);
     
        

      },
      error:(err)=>{
        console.log("err",err);
        
      }
    })
  
    }else{
      alert('Please fill all details')
      console.log("Form is not valid");
      this.validateAllFormFields(this.sisCalculationInvestForm);
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

  

  originalRadioPosition:boolean=false;
  radioData:any;
  inputData:any;
  radioAnnualInvestChange(){
    this.sisCalculationInvestForm.valueChanges.subscribe((value:any)=>{
      const input = value.annual_invest_text;
      const radioButton =value.annual_invest_amount;
      console.log("input,radioButton",input,radioButton);
      if (input.value === '') {
        this.originalRadioPosition = radioButton;
        this.radioData=radioButton;
        console.log("this.radioData",this.radioData);
      } else {
        this.originalRadioPosition = input;
        this.inputData=input;
      }
      
    });
  }

  onNext(){
  this.router.navigate(['/sisRiderSelection']);
  }

  onBack(){
  this.router.navigate(['/sisPersonal']);
  }

}
