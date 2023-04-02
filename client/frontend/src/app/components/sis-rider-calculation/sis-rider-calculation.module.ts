import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SisRiderCalculationComponent } from './sis-rider-calculation.component';
import { RouterModule, Routes } from '@angular/router';



const routes:Routes=[
  {path:'',component:SisRiderCalculationComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SisRiderCalculationModule { }
