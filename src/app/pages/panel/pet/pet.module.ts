import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PetRoutingModule } from './pet-routing.module';

import { PetListComponent } from './pet-list/pet-list.component';
import { PetComponent } from './pet.component';

@NgModule({
  imports: [
    CommonModule,
    PetRoutingModule,
    SharedModule
  ],
  declarations: [
    PetComponent,
    PetListComponent
  ]
})
export class PetModule { }
