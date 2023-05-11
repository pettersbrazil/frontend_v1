import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PetComponent } from "../pet/pet.component";

const routes: Routes = [
  {
    path: "",
    component: PetComponent,
    data: {
      isHome: false,
      isMenu: true,
      title: "Pets",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Painel", route: "/painel", active: false },
        { title: "Pets", active: true }
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetRoutingModule {}
