import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SisRiderSelectionComponent } from './sis-rider-selection.component';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes=[
  {path:'',component:SisRiderSelectionComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SisRiderSelectionModule { }
