import { Routes } from "@angular/router";
import { NotFoundComponent } from "@pages/not-found/not-found.component";
import { ForbiddenComponent } from "@pages/forbidden/forbidden.component";
import { UserComponent } from "@pages/user/user.component";
import { UsersComponent } from "@pages/users/users.component";
import { AppRoutes } from "@utils/constant";

export const routes: Routes = [
  { path: AppRoutes.Main, redirectTo: AppRoutes.Users, pathMatch: "full" },
  { path: AppRoutes.Users, component: UsersComponent },
  { path: AppRoutes.User, component: UserComponent },

  { path: AppRoutes.Forbidden, component: ForbiddenComponent },
  { path: AppRoutes.NotFound, component: NotFoundComponent },

  { path: "**", redirectTo: AppRoutes.NotFound },
];
