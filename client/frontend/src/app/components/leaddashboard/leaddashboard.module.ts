import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LeaddashboardComponent } from './leaddashboard.component';
import {MatTabsModule} from '@angular/material/tabs';


const routes:Routes=[
  {path:'',component:LeaddashboardComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ]
})
export class LeaddashboardModule { }
