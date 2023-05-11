import { UserService } from 'src/app/core/services/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PetService } from 'src/app/core/services/pet.service';
import { RoleService } from 'src/app/core/services/role.service';
import { Status } from 'src/app/core/utils/status';
import { IPet } from 'src/app/shared/interfaces/IPet.interface';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {

  @Output() changed = new EventEmitter<any>();

  pets!: IPet[];

  filter!: string;
  currentPage: number = 1;
  key: string = 'nome';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private petService: PetService,
    private utilStatus: Status
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    const userId: any = this.roleService.getRole()?.role === 'tutor' ? this.userService.getUserId() : null;
    this.petService.getAll(userId)
    .subscribe(
      (p: any) => {
        this.pets = p.data;
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
