import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UserService } from 'src/app/core/services/user.service';
import { Status } from 'src/app/core/utils/status';

import { UserDetailComponent } from './../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Output() changed = new EventEmitter<any>();

  typeUser: any;
  users: any;

  filter!: string;
  currentPage!: number;
  key: string = 'nome';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(
    private modalService: MdbModalService,
    private userService: UserService,
    private route: ActivatedRoute,
    private utilStatus: Status
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params: any) => {
        this.typeUser = params.get('tipo') === 'administrador' ? 'admin' : 'tutor';

        this.currentPage = 1;
        this.getUsers();
      }
    );
  }

  openModalDetail(user: any) {
    this.userService.setUser(user);
    this.modalService.open(UserDetailComponent, {
      modalClass: 'modal-dialog-centered',
    }).onClose.subscribe(() => {
      const s = this.utilStatus.get();
      this.changed.emit(s);
    })
  }

  private getUsers() {
    this.userService.all(this.typeUser)
    .subscribe(
      (u: any) => {
        this.users = u.data;
        this.changed.emit({ isReload: false });
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private alert(data: any) {
    this.utilStatus.set({
      isLoading: true,
      isAlert: true,
      status: data.status,
      message:  data.message
    });
  }
}
