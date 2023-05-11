import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserComponent } from "../user/user.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    data: {
      isHome: false,
      isMenu: true,
      title: "Usuários",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Painel", route: "/painel", active: false },
        { title: "Usuários", active: true }
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
