import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { Status } from 'src/app/core/utils/status';

import { TagCreateComponent } from './tag-create/tag-create.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Output() changed = new EventEmitter<any>();

  statusParams: string = 'todos';

  isAlert: boolean = false;
  isReload: boolean = false;
  isLoading: boolean = true;

  status!: string;
  message!: string;

  constructor(
    private modalService: MdbModalService,
    private adminGuard: AdminGuard,
    private route: ActivatedRoute,
    private utilStatus: Status
    ) { }

  ngOnInit(): void {
    this.adminGuard.validRole('tag', 'read', 'redirect');

    this.route.queryParamMap.subscribe(
      (params: any) => {
        this.isLoading = true;
        this.statusParams = params.get('status');
      }
    );
  }

  openModalCreate() {
    this.modalService.open(TagCreateComponent, {
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
