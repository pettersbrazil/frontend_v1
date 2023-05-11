import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

const routes: Routes = [
  { path: "", redirectTo: "/inicio", pathMatch: "full" },
  { path: "inicio", component: HomeComponent, data: { isHome: true, isMenu: false } },
  { path: "nao-encontrado", component: NotFoundComponent, data: { isHome: true, isMenu: false } },
  { path: "acesso-negado", component: ForbiddenComponent, data: { isHome: true, isMenu: false } },
  { path: "", loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule) },
  { path: "**", redirectTo: "/nao-encontrado", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
