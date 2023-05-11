import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TagService } from 'src/app/core/services/tag.service';
import { Status } from 'src/app/core/utils/status';

import { TagDetailComponent } from '../tag-detail/tag-detail.component';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  @Output() changed = new EventEmitter<any>();

  tags: any;

  status: any = {
    // params
    'todos': 'all',
    'vinculados': 'active',
    'nao-vinculados': 'waiting',
    'inativos': 'inactive',
    // badge
    'active': 'vinculado',
    'waiting': 'não vinculado',
    'inactive': 'inativo'
  };

  filter!: string;
  currentPage: number = 1;
  key: string = 'lote';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(
    private modalService: MdbModalService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private utilStatus: Status
    ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params: any) => {
        const s = params.get('status');
        this.all(this.status[s]);
        this.currentPage = 1;
      }
    );
  }

  openModalDetail(tag: any) {
    this.tagService.setTag(tag);
    this.modalService.open(TagDetailComponent, {
      modalClass: 'modal-dialog-centered',
    }).onClose.subscribe(() => {
      const s = this.utilStatus.get();
      this.changed.emit(s);
    })
  }

  viewStatus(s: string) {
    return this.status[s];
  }

  private all(status: string) {
    this.tagService.getAll(status)
    .subscribe(
      (t: any) => {
        this.tags = t.data;
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
