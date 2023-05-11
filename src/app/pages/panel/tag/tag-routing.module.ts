import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TagComponent } from "../tag/tag.component";

const routes: Routes = [
  {
    path: "",
    component: TagComponent,
    data: { 
      isHome: false,
      isMenu: true,
      title: "Pingentes",
      routers: [
        { title: "Início", route: "/inicio", active: false },
        { title: "Painel", route: "/painel", active: false },
        { title: "Pingentes", active: true }
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagRoutingModule {}
