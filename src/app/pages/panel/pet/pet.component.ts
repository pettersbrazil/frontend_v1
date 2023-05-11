import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  @Output() changed = new EventEmitter<any>();

  isAlert: boolean = false;
  isReload: boolean = false;
  isLoading: boolean = true;

  status!: string;
  message!: string;

  constructor() { }

  ngOnInit(): void {
  }

  warning(s: any) {
    if (s.isReload && s.isAlert) {
      this.isAlert = s.isAlert;
      this.isLoading = s.isLoading;
      this.status = s.status;
      this.message = s.message;

      this.isReload = true;
      setTimeout(() => {
        this.isReload = false;
        this.isLoading = false;
      }, 500);
    } else {
      this.isLoading = false;
    }
  }
}
