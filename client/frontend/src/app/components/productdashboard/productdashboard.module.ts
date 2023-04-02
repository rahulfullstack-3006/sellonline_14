import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductdashboardComponent } from './productdashboard.component';



const routes:Routes=[
  {path:'',component:ProductdashboardComponent}
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductdashboardModule { }
