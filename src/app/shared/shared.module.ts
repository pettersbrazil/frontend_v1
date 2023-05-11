import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddressComponent } from './components/address/address.component';

import { LoadingComponent } from './components/loading/loading.component';
import { AlertComponent } from '../core/helpers/alert/alert.component';

const MdbModule = [
  MdbAccordionModule,
  MdbCarouselModule,
  MdbCheckboxModule,
  MdbCollapseModule,
  MdbDropdownModule,
  MdbFormsModule,
  MdbModalModule,
  MdbPopoverModule,
  MdbRadioModule,
  MdbRangeModule,
  MdbRippleModule,
  MdbScrollspyModule,
  MdbTabsModule,
  MdbTooltipModule,
  MdbValidationModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule,
    MdbModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    AddressComponent,
    LoadingComponent,
    AlertComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    AddressComponent,
    LoadingComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgxMaskModule,
    MdbModule
  ]
})
export class SharedModule { }
