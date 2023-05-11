import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { Status } from 'src/app/core/utils/status';

import { UserCreateComponent } from './user-create/user-create.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Output() changed = new EventEmitter<any>();

  isAlert: boolean = false;
  isReload: boolean = false;
  isLoading: boolean = true;

  status!: string;
  message!: string;

  admin: boolean = false;
  typeUser!: string | null;

  constructor(
    private utilStatus: Status,
    private route: ActivatedRoute,
    private adminGuard: AdminGuard,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params: any) => {
        this.isLoading = true;
        this.typeUser = params.get('tipo');
        this.admin = this.typeUser === 'administrador' ? true : false;

        if (this.admin) {
          this.adminGuard.validRole('admin', 'read', 'redirect');
        }
      }
    );
  }

  openModalCreate() {
    this.modalService.open(UserCreateComponent, {
      modalClass: 'modal-dialog-centered'
    }).onClose.subscribe(() => {
      const s = this.utilStatus.get();
      this.warning(s);
    })
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

  validRole(role: string, crud: string): boolean {
    return this.adminGuard.validRole(role, crud);
  }
}
