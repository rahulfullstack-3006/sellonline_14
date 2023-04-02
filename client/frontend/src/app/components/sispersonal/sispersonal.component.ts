import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { MainService } from 'src/app/services/main.service';

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
  constructor(private router:Router,private fb:FormBuilder,private mainService:MainService) { }

  ngOnInit(): void {

   this.sisPersonalForm=this.fb.group({
    buying_for:[''],
    occupation:[''],
    age_proof:[''],
    education_qualification:[''],
    annual_income:[''],
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



}
