import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ScannerService } from 'src/app/core/services/scanner.service';
import { IScanner } from 'src/app/shared/interfaces/IScanner.interface';

@Component({
  selector: 'app-scanned-pet-list',
  templateUrl: './scanned-pet-list.component.html',
  styleUrls: ['./scanned-pet-list.component.scss']
})
export class ScannedPetListComponent implements OnInit {

  @Output() changed = new EventEmitter<any>();

  scanners!: IScanner[];

  constructor(
    private scannerService: ScannerService
  ) { }

  ngOnInit(): void {
    this.scanners = this.scannerService.getScanner();
  }

  detail(scanner: any) {
    this.changed.emit(scanner);
  }
}
