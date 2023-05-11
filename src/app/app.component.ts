import { Component, OnInit, Output } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { RoleService } from "./core/services/role.service";

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Output() breadcrumb: any;

  isTutor: boolean = false;
  isHome: boolean | undefined;
  isMenu: boolean | undefined;

  data: any;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      const childTitle = this.getChild(this.activateRoute);
      childTitle.data.subscribe((data: { isHome: boolean, isMenu: boolean, title: string, routers: any }) => {
        this.isHome = data.isHome;
        this.isMenu = data.isMenu;
        this.data = {
          title: data.title,
          routers: data.routers
        };
      })
      this.getRole();
    })
  }

  getChild(activateRoute: ActivatedRoute): any {
    if (activateRoute.firstChild) {
      return this.getChild(activateRoute.firstChild);
    } else {
      return activateRoute;
    }
  }

  private getRole() {
    const role = this.roleService.getRole()?.role;

    this.isTutor = role === 'tutor' ? true : false;
  }
}
