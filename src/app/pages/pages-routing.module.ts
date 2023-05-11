import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../core/guards/auth.guard";

import { MyaccountComponent } from "./myaccount/myaccount.component";
import { ProfileComponent } from "./profile/profile.component";
import { BindPetComponent } from "./bind-pet/bind-pet.component";
import { ScanPetComponent } from "./scan-pet/scan-pet.component";
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

const routes: Routes = [
  {
    path: "politica-de-privacidade",
    component: PrivacyPolicyComponent,
    data: {
      isHome: false,
      isMenu: false,
      title: "Política de Privacidade",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Política de Privacidade", active: true }
      ]
    }
  },
  {
    path: "termos-de-uso",
    component: TermsOfUseComponent,
    data: {
      isHome: false,
      isMenu: false,
      title: "Termos de Uso",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Termos de Uso", active: true }
      ]
    }
  },
  {
    path: "fale-conosco",
    component: ContactUsComponent,
    data: {
      isHome: false,
      isMenu: false,
      title: "Fale Conosco",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Fale Conosco", active: true }
      ]
    }
  },
  {
    path: "meus-dados",
    component: MyaccountComponent,
    canActivateChild: [AuthGuard],
    data: {
      isHome: false,
      isMenu: false,
      title: "Meus Dados",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Meus Dados", active: true }
      ]
    }
  },
  {
    path: "perfil/:id",
    component: ProfileComponent,
    data: {
      isHome: false,
      isMenu: false,
      title: "Perfil",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Perfil", active: true }
      ]
    }
  },
  {
    path: "vincular/:id",
    component: BindPetComponent,
    data: {
      isHome: false,
      isMenu: false,
      title: "Vincular Pingente",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Vincular Pingente", active: true }
      ]
    }
  },
  {
    path: "escanear/:id",
    component: ScanPetComponent,
    data: {
      isHome: false,
      isMenu: false,
      title: "Escanear Pingente",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Escanear Pingente", active: true }
      ]
    }
  },
  {
    path: "painel",
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./panel/panel.module').then((m) => m.PanelModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
