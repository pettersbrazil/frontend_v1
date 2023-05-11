import { Component, Input, OnInit } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { ScannedPetComponent } from 'src/app/pages/scan-pet/scanned-pet/scanned-pet.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() status!: string;
  @Input() message!: string;
  @Input() linkAuth!: boolean;
  @Input() petScan!: boolean;

  constructor(
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    if (this.status === '404' && !this.message) {
      this.message = 'Conteúdo não encontrado.'
    }
  }

  openModalSuccess() {
    this.modalService.open(AuthComponent, {
      modalClass: 'modal-dialog-centered'
    })
  }

  openModalInfo() {
    this.modalService.open(ScannedPetComponent, {
      modalClass: 'modal-dialog-centered'
    })
  }
}
