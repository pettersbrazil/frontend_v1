import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { TagService } from 'src/app/core/services/tag.service';
import { Status } from 'src/app/core/utils/status';

@Component({
  selector: 'app-tag-create',
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.scss']
})
export class TagCreateComponent implements OnInit {

  tagCreateForm!: FormGroup;

  isLoading: boolean = false;

  constructor(
    public modalCreate: MdbModalRef<TagCreateComponent>,
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private utilStatus: Status
  ) { }

  ngOnInit(): void {
    this.utilStatus.set({});
    this.createForm();
  }

  createForm(): void {
    this.tagCreateForm = this.formBuilder.group({
      quantity: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    const data = {
      quantity: this.tagCreateForm.value.quantity,
    };
    this.isLoading = true;
    this.tagService.create(data)
    .subscribe(
      () => {
        this.isLoading = true;
        this.alert({
          status: 'success',
          message: 'Pingentes cadastrados com sucesso!'
        });
      },
      e => {
        this.isLoading = true;
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private alert(data: any) {
    this.utilStatus.set({
      isReload: true,
      isLoading: true,
      isAlert: true,
      status: data.status,
      message:  data.message
    });
    this.modalCreate.close();
  }

}
