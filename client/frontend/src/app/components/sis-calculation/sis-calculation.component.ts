import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sis-calculation',
  templateUrl: './sis-calculation.component.html',
  styleUrls: ['./sis-calculation.component.css']
})
export class SisCalculationComponent implements OnInit {
  faIndianRupee=faIndianRupee;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onNext(){
  this.router.navigate(['/sisRiderSelection']);
  }

  onBack(){
  this.router.navigate(['/sisPersonal']);
  }

}
