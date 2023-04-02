import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SispersonalComponent } from './sispersonal.component';
import { RouterModule, Routes } from '@angular/router'

const routes:Routes=[
  {path:'',component:SispersonalComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SispersonalModule { }
