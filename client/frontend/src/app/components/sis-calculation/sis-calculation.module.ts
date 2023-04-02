import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SisCalculationComponent } from './sis-calculation.component';


const routes:Routes=[
  {path:'',component:SisCalculationComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SisCalculationModule { }
