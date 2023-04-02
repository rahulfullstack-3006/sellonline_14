import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private fb:FormBuilder,private mainService:MainService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      username:[''],
      email:[''],
      password:['']
    })
  }

  onSubmit(){
    console.log("register page",this.registerForm.value);
    this.mainService.register(this.registerForm.value).subscribe({
      next:(data)=>{
        console.log("data for register",data);   
        this.router.navigate(['/login'])
      },
      error:(error)=>{
        console.log("err in register",error);
        
      }
    })
    

  }

}
