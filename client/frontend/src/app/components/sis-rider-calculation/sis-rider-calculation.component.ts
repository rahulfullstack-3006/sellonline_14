import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash,faIndianRupee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sis-rider-calculation',
  templateUrl: './sis-rider-calculation.component.html',
  styleUrls: ['./sis-rider-calculation.component.css']
})
export class SisRiderCalculationComponent implements OnInit {

  faTrash=faTrash;
  faEdit=faEdit;
  faIndianRupee=faIndianRupee;
  tabs = [
    { label: 'Hospicare', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/hospicare.svg?v=1677931786189' },
    { label: 'Accidental Death(AD)', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/accidental-death.svg?v=1677931786189' },
    { label: 'Criticare Plus(CCP) ', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/criticare.svg?v=1677931786189' },
    { label: 'Term Booster(TB)', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/tti.svg?v=1677931786189' },
    { label: 'Accidental Total(ATPD)', icon: 'https://sellonlineuat.tataaia.com/wps/PA_TATAAIA_SO/assets/images/riders/atpd.svg?v=1677931786189' }
  ];

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onContinue(){
  this.router.navigate(['/sisSummary'])
  }

}
