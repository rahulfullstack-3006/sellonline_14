import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadcreationComponent } from './leadcreation.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes=[
  {path:'',component:LeadcreationComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LeadcreationModule { }
