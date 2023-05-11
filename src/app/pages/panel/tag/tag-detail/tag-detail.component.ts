import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { PetService } from 'src/app/core/services/pet.service';
import { TagService } from 'src/app/core/services/tag.service';
import { Status } from 'src/app/core/utils/status';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent implements OnInit {

  tagDetailForm!: FormGroup;

  tag: any;
  pet: any;

  isDelete: boolean = false;

  status: any = {
    'active': 'vinculado',
    'waiting': 'não vinculado',
    'inactive': 'inativo'
  };

  constructor(
    public modalDetail: MdbModalRef<TagDetailComponent>,
    private formBuilder: FormBuilder,
    private adminGuard: AdminGuard,
    private petService: PetService,
    private tagService: TagService,
    private utilStatus: Status
  ) { }

  ngOnInit(): void {
    this.utilStatus.set({});
    this.createForm();
    this.getTag();
  }

  createForm(): void {
    this.tagDetailForm = this.formBuilder.group({
      code: [null, [Validators.required]]
    })
  }

  deleteTag(): void {
    if (this.validRole('tag', 'delete')) {
      this.tagService.delete(this.tag._id)
      .subscribe(
        () => {
          this.alert({
            status: 'success',
            message: 'Pingente excluído com sucesso!'
          });
        },
        e => {
          this.alert({
            status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
            message: e.error.message
          });
        }
      )
    }
  }

  private getTag() {
    this.tag = this.tagService.getTag();
    this.tagDetailForm.controls['code'].disable();

    this.tagDetailForm.patchValue({
      code: this.tag.code
    });

    if (this.tag.status === 'active') {
      this.getPet();
    }
  }

  private getPet() {
    this.petService.show(this.tag.petId)
    .subscribe(
      (p: any) => {
        this.pet = p.data;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  validRole(role: string, crud: string): boolean {
    return this.adminGuard.validRole(role, crud);
  }

  private alert(data: any) {
    this.utilStatus.set({
      isReload: true,
      isLoading: true,
      isAlert: true,
      status: data.status,
      message:  data.message
    });
    this.modalDetail.close();
  }

}
