import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SisSummaryComponent } from './sis-summary.component';
import { RouterModule, Routes } from '@angular/router';



const routes:Routes=[
  {path:'',component:SisSummaryComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SisSummaryModule { }
