import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TagRoutingModule } from './tag-routing.module';

import { TagDetailComponent } from './tag-detail/tag-detail.component';
import { TagCreateComponent } from './tag-create/tag-create.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagComponent } from './tag.component';

@NgModule({
  imports: [
    CommonModule,
    TagRoutingModule,
    SharedModule
  ],
  declarations: [
    TagComponent,
    TagDetailComponent,
    TagCreateComponent,
    TagListComponent
  ]
})
export class TagModule { }
