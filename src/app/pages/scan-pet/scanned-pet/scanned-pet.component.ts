import { Component, OnInit, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-scanned-pet',
  templateUrl: './scanned-pet.component.html',
  styleUrls: ['./scanned-pet.component.scss']
})
export class ScannedPetComponent implements OnInit {

  scanner: any;

  scannedList: boolean = true;
  scannedView: boolean = false;

  constructor(public modalScanned: MdbModalRef<ScannedPetComponent>) { }

  ngOnInit(): void { }

  scannerSelected(scanner: any) {
    this.scannedList = false;
    this.scannedView = true;

    this.scanner = scanner;
  }

}
