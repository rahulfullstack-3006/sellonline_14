import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { MainService } from 'src/app/services/main.service';
// const numWords = require('num-words');
import numWords from 'num-words';

@Component({
  selector: 'app-sispersonal',
  templateUrl: './sispersonal.component.html',
  styleUrls: ['./sispersonal.component.css']
})
export class SispersonalComponent implements OnInit {

  faPencil=faPencil;
  leadDetailsGet:any;
  leadwithProduct:any;
  dateModify:any;
  sisPersonalForm:any=FormGroup;
  editFlagActive:boolean=false;
  purchaseChangeValue:any='Single Life';
  selfChangeValue:any='Self';
  occupChangeValue:any='Salaried';
  numberInWords:any;
  constructor(private router:Router,private fb:FormBuilder,private mainService:MainService) { }

  ngOnInit(): void {

   this.sisPersonalForm=this.fb.group({
    purchasing_for:[''],
    buying_for:[''],
    occupation:[''],
    age_proof:[''],
    education_qualification:[''],
    annual_income:['',[Validators.required]],
    pan_number:[''],
    tobacco_radio:[''],
    nominee_name:[''],
    nominee_relationship:[''],
    gst_check:[''],
    existing_check:['']


   })

    this.leadDetailsGet=localStorage.getItem('leadDetails');
    this.leadwithProduct=JSON.parse(this.leadDetailsGet);
    console.log("this.leadwithProduct",this.leadwithProduct);

    this.sisPersonalForm.get('annual_income').valueChanges.subscribe((value:any) => {
      console.log("annual value change",value);
      
      // this.numberInWords = this.numberToWords(value)?.['numberToWords'] || '';
      // console.log("this.numberInWords",this.numberInWords);
      this.numberInWords = numWords(value);
      console.log("this.numberInWords",this.numberInWords);  
    });
    
  }



  onSubmit(){
  console.log("sisPersonalForm",this.sisPersonalForm.value);
  this.leadwithProduct['valueSISPersonal']=this.sisPersonalForm.value;
  console.log("this.leadwithProduct",this.leadwithProduct);
  let sisPersonalValue=JSON.stringify(this.leadwithProduct);
  console.log("sisPersonalValue",sisPersonalValue);
  localStorage.setItem('leadwithSISdetails',sisPersonalValue)
  this.router.navigate(['/sisCalculation'])
  
  }

  editIconClick(){
  this.editFlagActive=!this.editFlagActive;
  }

  onPurchaseChange(event:any){
  this.purchaseChangeValue=event.target.value;
  console.log("this.purchaseChangeValue",this.purchaseChangeValue);
  
  }

  onSelfChange(event:any){
  this.selfChangeValue=event.target.value;
  console.log("this.selfChangeValue",this.selfChangeValue);
  }

  onOccupChange(event:any){
    this.occupChangeValue=event.target.value;
  console.log("this.occupChangeValue",this.occupChangeValue);

  }

}
