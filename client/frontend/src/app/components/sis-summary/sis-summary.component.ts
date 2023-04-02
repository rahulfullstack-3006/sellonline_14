import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sis-summary',
  templateUrl: './sis-summary.component.html',
  styleUrls: ['./sis-summary.component.css']
})
export class SisSummaryComponent implements OnInit {
  faIndianRupee=faIndianRupee;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onBack(){
  this.router.navigate(['/sisRiderCalculation'])
  }


}
