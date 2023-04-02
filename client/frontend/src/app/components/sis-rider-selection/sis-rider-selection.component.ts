import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sis-rider-selection',
  templateUrl: './sis-rider-selection.component.html',
  styleUrls: ['./sis-rider-selection.component.css']
})
export class SisRiderSelectionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onContinue(){
    this.router.navigate(['/sisRiderCalculation'])
  }

}
