import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { MainService } from 'src/app/services/main.service';
import numWords from 'num-words';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';

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
  faIndianRupee=faIndianRupee;
  constructor(private router:Router,private fb:FormBuilder,private mainService:MainService) { }

  ngOnInit(): void {

   this.sisPersonalForm=this.fb.group({
    purchasing_for:[''],
    buying_for:[''],
    occupation:[''],
    age_proof:['',[Validators.required]],
    education_qualification:['graduate'],
    annual_income:['',[Validators.required,Validators.maxLength(9)]],
    pan_number:['',[Validators.pattern(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/)]],
    autopay:[''],
    nominee_name:['',[Validators.required]],
    nominee_relationship:['',[Validators.required]],
    gst_check:[false],
    existing_check:[false]
   })

    this.leadDetailsGet=localStorage.getItem('leadDetails');
    this.leadwithProduct=JSON.parse(this.leadDetailsGet);
    console.log("this.leadwithProduct",this.leadwithProduct);

    this.sisPersonalForm.get('annual_income').valueChanges.subscribe((value:any) => {
    console.log("annual value change",value,typeof(value));
    if(value.length <= 9){
      console.log("this.numberInWords",this.numberInWords); 
      this.numberInWords = numWords(value);
    }else{
      console.log("values is greater than 9"); 

    }
    });

    this.sisPersonalForm.controls['pan_number'].valueChanges.subscribe((pan:any)=>{
      this.sisPersonalForm.controls['pan_number'].setValue(pan.toUpperCase(),{emitEvent: false})

    })
        
  }



  onSubmit(){
  if(this.sisPersonalForm.valid){
    this.sisPersonalForm.gst_check = this.sisPersonalForm.get('gst_check').value ? 'Y' : 'N';
    this.sisPersonalForm.existing_check = this.sisPersonalForm.get('existing_check').value ? 'Y' : 'N';
    console.log("this.sisPersonalForm.existing_check",this.sisPersonalForm.existing_check);
    
    this.mainService.createSISPersonal(this.sisPersonalForm.value).subscribe({
      next:(result:any)=>{
      console.log("result to create SIS ID",result);
      
      },
      error:(error)=>{
        console.log("error",error);
        
      }
    })
    console.log("sisPersonalForm",this.sisPersonalForm.value);
    this.leadwithProduct['valueSISPersonal']=this.sisPersonalForm.value;
    console.log("this.leadwithProduct",this.leadwithProduct);
    let sisPersonalValue=JSON.stringify(this.leadwithProduct);
    console.log("sisPersonalValue",sisPersonalValue);
    localStorage.setItem('leadwithSISdetails',sisPersonalValue)
    this.router.navigate(['/sisCalculation'])
  }else{
    console.log("Form is not valid");
    this.validateAllFormFields(this.sisPersonalForm);
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
