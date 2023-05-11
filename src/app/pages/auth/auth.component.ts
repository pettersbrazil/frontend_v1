import { Component, OnInit, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Output() dataLogin = { isLogin: true };
  @Output() dataRegister = { isModal: true };

  isRegister: boolean = false;

  constructor(public modalAuth: MdbModalRef<AuthComponent>) { }

  ngOnInit(): void {
  }

  login(event: any) {
    this.dataLogin.isLogin = event;
    this.isRegister = false;
  }

  register(): void {
    this.dataLogin.isLogin = false;
    this.isRegister = true;
  }

}
