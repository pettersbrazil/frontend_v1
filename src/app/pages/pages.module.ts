import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from '../pages/auth/auth.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ScanPetComponent } from './scan-pet/scan-pet.component';
import { BindPetComponent } from './bind-pet/bind-pet.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ScannedPetComponent } from './scan-pet/scanned-pet/scanned-pet.component';
import { ScannedPetListComponent } from './scan-pet/scanned-pet/scanned-pet-list/scanned-pet-list.component';
import { ScannedPetViewComponent } from './scan-pet/scanned-pet/scanned-pet-view/scanned-pet-view.component';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    PagesRoutingModule,
    SharedModule
  ],
  declarations: [
    PagesComponent,
    ProfileComponent,
    ScanPetComponent,
    BindPetComponent,
    MyaccountComponent,
    ProfileEditComponent,
    ScannedPetComponent,
    ScannedPetListComponent,
    ScannedPetViewComponent,
    NotFoundComponent,
    ForbiddenComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    ContactUsComponent
  ]
})
export class PagesModule { }
