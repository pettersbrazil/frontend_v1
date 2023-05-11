import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/core/guards/admin.guard";

import { ChartComponent } from "./chart/chart.component";

const routes: Routes = [
  {
    path: "",
    component: ChartComponent,
    canActivateChild: [AdminGuard],
    data: {
      isHome: false,
      isMenu: true,
      title: "Painel",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Painel", active: true }
      ]
    }
  },
  {
    path: "pingentes",
    canActivateChild: [AdminGuard],
    loadChildren: () => import('./tag/tag.module').then((m) => m.TagModule)
  },
  {
    path: "usuarios",
    canActivateChild: [AdminGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  { path: "pets", loadChildren: () => import('./pet/pet.module').then((m) => m.PetModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
